var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RngAbstract_seed, _RngAbstract_randFunc, _RngAbstract_shouldThrowOnMaxRecursionsReached, _RngAbstract_distributions;
import validate from './number.js';
import Pool from './pool.js';
import { NonRandomDetector } from './queue.js';
import { CURRENT_VERSION } from './constants/libver.js';
import Version from './version.js';
/**
 * Safeguard against huge loops. If loops unintentionally grow beyond this
 * arbitrary limit, bail out..
 */
const LOOP_MAX = 10000000;
/**
 * Safeguard against too much recursion - if a function recurses more than this,
 * we know we have a problem.
 *
 * Max recursion limit is around ~1000 anyway, so would get picked up by interpreter.
 */
const MAX_RECURSIONS = 500;
const THROW_ON_MAX_RECURSIONS_REACHED = true;
const PREDICTABLE_SEED = 5789938451;
const SAMERANDOM_MAX = 10;
const diceRe = /^ *([+-]? *[0-9_]*) *[dD] *([0-9_]+) *([+-]? *[0-9_.]*) *$/;
const strToNumberCache = {};
const diceCache = {};
let monotonic = 0;
let lastuniqid = 0;
function uniqid(prefix = '') {
    const now = Date.now() * 1000;
    if (lastuniqid === now) {
        monotonic++;
    }
    else {
        monotonic = 0;
    }
    const sec = now + monotonic;
    const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
    lastuniqid = now;
    return `${prefix}${id}`;
}
let lastSeed = Date.now();
let mono = 0;
const randomSeed = () => {
    const now = Date.now();
    if (lastSeed === now) {
        mono += (1297357) % 1000000;
    }
    else {
        mono = 0;
    }
    lastSeed = now;
    return (now * 1000000) + mono;
};
export class MaxRecursionsError extends Error {
}
export class NonRandomRandomError extends Error {
}
function sum(numbersFirstArg, ...numbers) {
    if (Array.isArray(numbersFirstArg)) {
        return numbersFirstArg.reduce((a, b) => a + b, 0);
    }
    return numbers.reduce((a, b) => a + b, 0);
}
function isNumeric(input) {
    return (typeof input === 'number') || (!isNaN(parseFloat(input)) && isFinite(input));
}
/**
 * This abstract class implements most concrete implementations of
 * functions, as the only underlying changes are likely to be to the
 * uniform random number generation, and how that is handled.
 *
 * All the typedoc documentation for this has been sharded out to RngInterface
 * in a separate file.
 */
export class RngAbstract {
    constructor(seed) {
        this.version = CURRENT_VERSION;
        _RngAbstract_seed.set(this, 0);
        _RngAbstract_randFunc.set(this, void 0);
        _RngAbstract_shouldThrowOnMaxRecursionsReached.set(this, void 0);
        _RngAbstract_distributions.set(this, [
            'normal',
            'gaussian',
            'boxMuller',
            'irwinHall',
            'bates',
            'batesgaussian',
            'bernoulli',
            'exponential',
            'pareto',
            'poisson',
            'hypergeometric',
            'rademacher',
            'binomial',
            'betaBinomial',
            'beta',
            'gamma',
            'studentsT',
            'wignerSemicircle',
            'kumaraswamy',
            'hermite',
            'chiSquared',
            'rayleigh',
            'logNormal',
            'cauchy',
            'laplace',
            'logistic',
        ]);
        this.setSeed(seed);
    }
    getSeed() {
        return __classPrivateFieldGet(this, _RngAbstract_seed, "f");
    }
    sameAs(other) {
        if (other instanceof RngAbstract) {
            return this.getSeed() === other.getSeed() && this.getRandomSource() === other.getRandomSource();
        }
        return false;
    }
    randomSource(source) {
        __classPrivateFieldSet(this, _RngAbstract_randFunc, source, "f");
        return this;
    }
    getRandomSource() {
        return __classPrivateFieldGet(this, _RngAbstract_randFunc, "f");
    }
    setSeed(seed) {
        if (typeof seed !== 'undefined' && seed !== null) {
            if (typeof seed === 'string') {
                seed = this.convertStringToNumber(seed);
            }
            __classPrivateFieldSet(this, _RngAbstract_seed, seed, "f");
        }
        else {
            return this.setSeed(randomSeed());
        }
        return this;
    }
    seed(seed) {
        this.setSeed(seed);
        return this;
    }
    serialize() {
        return {
            seed: __classPrivateFieldGet(this, _RngAbstract_seed, "f"),
            version: CURRENT_VERSION
        };
    }
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized, force = false) {
        var _a;
        const otherVer = new Version((_a = serialized.version) !== null && _a !== void 0 ? _a : '0.1.0');
        const minver = '0.2.0';
        if (otherVer.lt(minver) && !force) {
            throw new Error(`Trying to unserialize old RNG (v${serialized.version}) can lead to unexpected behaviour - minimum supported version for this iteration is ${minver}.
  If you want to unserialize anyway, use the 'force' argument:

  GameRng.unserialize(serialized, true);`);
        }
        const rng = new this(serialized.seed);
        rng.seed(serialized.seed);
        return rng;
    }
    predictable(seed) {
        const { constructor } = Object.getPrototypeOf(this);
        const newSelf = new constructor(seed !== null && seed !== void 0 ? seed : PREDICTABLE_SEED);
        return newSelf;
    }
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable(seed) {
        return new this(seed !== null && seed !== void 0 ? seed : PREDICTABLE_SEED);
    }
    hashStr(str) {
        let hash = 0;
        let i;
        let chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    convertStringToNumber(str) {
        if (strToNumberCache[str]) {
            return strToNumberCache[str];
        }
        const num = this.hashStr(str);
        strToNumberCache[str] = num;
        return num;
    }
    _random() {
        if (typeof __classPrivateFieldGet(this, _RngAbstract_randFunc, "f") === 'function') {
            return __classPrivateFieldGet(this, _RngAbstract_randFunc, "f").call(this);
        }
        return this._next();
    }
    percentage() {
        return this.randBetween(0, 100);
    }
    probability() {
        return this.randBetween(0, 1);
    }
    random(from = 0, to = 1, skew = 0) {
        return this.randBetween(from, to, skew);
    }
    chance(n, chanceIn = 1) {
        validate({ chanceIn }).positive();
        validate({ n }).positive();
        const chance = n / chanceIn;
        return this._random() <= chance;
    }
    // 500 to 1 chance, for example
    chanceTo(from, to) {
        return this.chance(from, from + to);
    }
    randInt(from = 0, to = 1, skew = 0) {
        validate({ from }).int();
        validate({ to }).int();
        if (from === to) {
            return from;
        }
        [from, to] = [Math.min(from, to), Math.max(from, to)];
        let rand = this._random();
        if (skew < 0) {
            rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
        }
        else {
            rand = Math.pow(rand, Math.pow(2, -skew));
        }
        return Math.floor(rand * ((to + 1) - from)) + from;
    }
    uniqid(prefix = '') {
        return uniqid(prefix);
    }
    static uniqid(prefix = '') {
        return uniqid(prefix);
    }
    randomString(len = 6) {
        validate({ len }).gt(0);
        const str = [];
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const alen = 61;
        for (let i = 0; i < len; i++) {
            str.push(alphabet[this.randInt(0, alen)]);
        }
        return str.join('');
    }
    randBetween(from = 0, to, skew = 0) {
        if (typeof to === 'undefined') {
            to = from + 1;
        }
        [from, to] = [Math.min(from, to), Math.max(from, to)];
        let rand = this._random();
        if (skew < 0) {
            rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
        }
        else if (skew > 0) {
            rand = Math.pow(rand, Math.pow(2, -skew));
        }
        return this.scaleNorm(rand, from, to);
    }
    scale(number, from, to, min = 0, max = 1) {
        validate({ number }).lteq(max);
        validate({ number }).gteq(min);
        // First we scale the number in the range [0-1)
        number = (number - min) / (max - min);
        return this.scaleNorm(number, from, to);
    }
    scaleNorm(number, from, to) {
        validate({ number }).betweenEq(0, 1);
        return (number * (to - from)) + from;
    }
    shouldThrowOnMaxRecursionsReached(val) {
        if (typeof val === 'boolean') {
            __classPrivateFieldSet(this, _RngAbstract_shouldThrowOnMaxRecursionsReached, val, "f");
            return this;
        }
        if (typeof __classPrivateFieldGet(this, _RngAbstract_shouldThrowOnMaxRecursionsReached, "f") !== 'undefined') {
            return __classPrivateFieldGet(this, _RngAbstract_shouldThrowOnMaxRecursionsReached, "f");
        }
        return THROW_ON_MAX_RECURSIONS_REACHED;
    }
    /**
     * Generates a normally distributed number, but with a special clamping and skewing procedure
     * that is sometimes useful.
     *
     * Note that the results of this aren't strictly gaussian normal when min/max are present,
     * but for our puposes they should suffice.
     *
     * Otherwise, without min and max and skew, the results are gaussian normal.
     *
     * @example
     *
     * rng.normal({ min: 0, max: 1, stddev: 0.1 });
     * rng.normal({ mean: 0.5, stddev: 0.5 });
     *
     * @see [Normal Distribution - Wikipedia](https://en.wikipedia.org/wiki/Normal_distribution)
     * @group Random Number Generation
     * @param [options]
     * @param [options.mean] - The mean value of the distribution
     * @param [options.stddev] - Must be > 0 if present
     * @param [options.skew] - The skew to apply. -ve = left, +ve = right
     * @param [options.min] - Minimum value allowed for the output
     * @param [options.max] - Maximum value allowed for the output
     * @param [depth] - used internally to track the recursion depth
     * @return A normally distributed number
     * @throws {@link NumberValidationError} If the input parameters are not valid.
     * @throws {@link MaxRecursionsError} If the function recurses too many times in trying to generate in bounds numbers
     */
    normal({ mean, stddev, max, min, skew = 0 } = {}, depth = 0) {
        if (typeof min === 'undefined' && typeof max === 'undefined') {
            return this.gaussian({ mean, stddev, skew });
        }
        if (depth > MAX_RECURSIONS && this.shouldThrowOnMaxRecursionsReached()) {
            throw new MaxRecursionsError(`Max recursive calls to rng normal function. This might be as a result of using predictable random numbers, or inappropriate arguments? Args: ${JSON.stringify({ mean, stddev, max, min, skew })}`);
        }
        let num = this.bates(7);
        if (skew < 0) {
            num = 1 - (Math.pow(num, Math.pow(2, skew)));
        }
        else {
            num = Math.pow(num, Math.pow(2, -skew));
        }
        if (typeof mean === 'undefined' &&
            typeof stddev === 'undefined' &&
            typeof max !== 'undefined' &&
            typeof min !== 'undefined') {
            // This is a simple scaling of the bates distribution.
            return this.scaleNorm(num, min, max);
        }
        num = (num * 10) - 5;
        if (typeof mean === 'undefined') {
            mean = 0;
            if (typeof max !== 'undefined' && typeof min !== 'undefined') {
                mean = (max + min) / 2;
                if (typeof stddev === 'undefined') {
                    stddev = Math.abs(max - min) / 10;
                }
            }
            if (typeof stddev === 'undefined') {
                stddev = 0.1;
            }
            num = num * stddev + mean;
        }
        else {
            if (typeof stddev === 'undefined') {
                if (typeof max !== 'undefined' && typeof min !== 'undefined') {
                    stddev = Math.abs(max - min) / 10;
                }
                else {
                    stddev = 0.1;
                }
            }
            num = num * stddev + mean;
        }
        if (depth <= MAX_RECURSIONS && ((typeof max !== 'undefined' && num > max) || (typeof min !== 'undefined' && num < min))) {
            return this.normal({ mean, stddev, max, min, skew }, depth + 1);
        }
        // In the case where we are above the max recursion limit, we just clamp the number...
        // this can happen in extreme cases where parameters are very marginal, but we do not
        // want to return any out of bounds numbers in the case that max and min are given, even
        // if they are not strictly normally distributed - i.e. there will be a very marginal bias
        // to the bounds numbers in certain cases, but it's largely a non-issue.
        if (typeof max !== 'undefined') {
            num = Math.min(num, max);
        }
        if (typeof min !== 'undefined') {
            num = Math.max(num, min);
        }
        return num;
    }
    gaussian({ mean = 0, stddev = 1, skew = 0 } = {}) {
        validate({ stddev }).positive();
        if (skew === 0) {
            return this.boxMuller({ mean, stddev });
        }
        let num = this.boxMuller({ mean: 0, stddev: 1 });
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (skew < 0) {
            num = 1 - (Math.pow(num, Math.pow(2, skew)));
        }
        else {
            num = Math.pow(num, Math.pow(2, -skew));
        }
        num = num * 10;
        num = num - 5;
        num = num * stddev + mean;
        return num;
    }
    boxMuller(mean = 0, stddev = 1) {
        if (typeof mean === 'object') {
            ({ mean = 0, stddev = 1 } = mean);
        }
        validate({ stddev }).gteq(0);
        const u = 1 - this._random(); // Converting [0,1) to (0,1]
        const v = this._random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // Transform to the desired mean and standard deviation:
        return z * stddev + mean;
    }
    irwinHall(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        validate({ n }).int().positive();
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += this._random();
        }
        return sum;
    }
    bates(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        validate({ n }).int().positive();
        return this.irwinHall({ n }) / n;
    }
    batesgaussian(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        validate({ n }).int().gt(1);
        return (this.irwinHall({ n }) / Math.sqrt(n)) - ((1 / Math.sqrt(1 / n)) / 2);
    }
    bernoulli(p = 0.5) {
        if (typeof p === 'object') {
            ({ p = 0.5 } = p);
        }
        validate({ p }).lteq(1).gteq(0);
        return this._random() < p ? 1 : 0;
    }
    exponential(rate = 1) {
        if (typeof rate === 'object') {
            ({ rate = 1 } = rate);
        }
        validate({ rate }).gt(0);
        return -Math.log(1 - this._random()) / rate;
    }
    pareto({ shape = 0.5, scale = 1, location = 0 } = {}) {
        validate({ shape }).gteq(0);
        validate({ scale }).positive();
        const u = this._random();
        if (shape !== 0) {
            return location + (scale / shape) * (Math.pow(u, -shape) - 1);
        }
        else {
            return location - scale * Math.log(u);
        }
    }
    poisson(lambda = 1) {
        if (typeof lambda === 'object') {
            ({ lambda = 1 } = lambda);
        }
        validate({ lambda }).positive();
        const L = Math.exp(-lambda);
        let k = 0;
        let p = 1;
        let i = 0;
        const nq = new NonRandomDetector(SAMERANDOM_MAX, 2);
        do {
            k++;
            const r = this._random();
            nq.push(r);
            p *= r;
            nq.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the poisson distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul of the looped way of generating. Last random number was ${r}`);
        } while (p > L && i++ < LOOP_MAX);
        if ((i + 1) >= LOOP_MAX) {
            throw new Error('LOOP_MAX reached in poisson - bailing out - possible parameter error, or using non-random source?');
        }
        return k - 1;
    }
    hypergeometric({ N = 50, K = 10, n = 5, k } = {}) {
        validate({ N }).int().positive();
        validate({ K }).int().positive().lteq(N);
        validate({ n }).int().positive().lteq(N);
        if (typeof k === 'undefined') {
            k = this.randInt(0, Math.min(K, n));
        }
        validate({ k }).int().betweenEq(0, Math.min(K, n));
        function logFactorial(x) {
            let res = 0;
            for (let i = 2; i <= x; i++) {
                res += Math.log(i);
            }
            return res;
        }
        function logCombination(a, b) {
            return logFactorial(a) - logFactorial(b) - logFactorial(a - b);
        }
        const logProb = logCombination(K, k) + logCombination(N - K, n - k) - logCombination(N, n);
        return Math.exp(logProb);
    }
    rademacher() {
        return this._random() < 0.5 ? -1 : 1;
    }
    binomial({ n = 1, p = 0.5 } = {}) {
        validate({ n }).int().positive();
        validate({ p }).betweenEq(0, 1);
        let successes = 0;
        for (let i = 0; i < n; i++) {
            if (this._random() < p) {
                successes++;
            }
        }
        return successes;
    }
    betaBinomial({ alpha = 1, beta = 1, n = 1 } = {}) {
        validate({ alpha }).positive();
        validate({ beta }).positive();
        validate({ n }).int().positive();
        const bd = (alpha, beta) => {
            let x = this._random();
            let y = this._random();
            x = Math.pow(x, 1 / alpha);
            y = Math.pow(y, 1 / beta);
            return x / (x + y);
        };
        const p = bd(alpha, beta);
        let k = 0;
        for (let i = 0; i < n; i++) {
            if (this._random() < p) {
                k++;
            }
        }
        return k;
    }
    beta({ alpha = 0.5, beta = 0.5 } = {}) {
        validate({ alpha }).positive();
        validate({ beta }).positive();
        const gamma = (alpha) => {
            let x = 0;
            for (let i = 0; i < alpha; i++) {
                const r = this._random();
                x += -Math.log(r);
                if ((i + 1) >= LOOP_MAX) {
                    throw new Error('LOOP_MAX reached in beta - bailing out - possible parameter error, or using non-random source?');
                }
            }
            return x;
        };
        const x = gamma(alpha);
        const y = gamma(beta);
        return x / (x + y);
    }
    gamma({ shape = 1, rate, scale } = {}) {
        validate({ shape }).positive();
        if (typeof scale !== 'undefined' && typeof rate !== 'undefined' && rate !== 1 / scale) {
            throw new Error('Cannot supply rate and scale');
        }
        if (typeof scale !== 'undefined') {
            validate({ scale }).positive();
            rate = 1 / scale;
        }
        if (typeof rate === 'undefined') {
            rate = 1;
        }
        if (rate) {
            validate({ rate }).positive();
        }
        let flg;
        let x2;
        let v0;
        let v1;
        let x;
        let u;
        let v = 1;
        const d = shape - 1 / 3;
        const c = 1.0 / Math.sqrt(9.0 * d);
        let i = 0;
        flg = true;
        const nq1 = new NonRandomDetector(SAMERANDOM_MAX);
        while (flg && i++ < LOOP_MAX) {
            let j = 0;
            const nq2 = new NonRandomDetector(SAMERANDOM_MAX);
            do {
                x = this.normal();
                nq2.push(x);
                nq2.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the gamma distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul ofthe looped way of generating.`);
                v = 1.0 + (c * x);
            } while (v <= 0.0 && j++ < LOOP_MAX);
            if ((j + 1) >= LOOP_MAX) {
                throw new Error(`LOOP_MAX reached inside gamma inner loop - bailing out - possible parameter error, or using non-random source? had shape = ${shape}, rate = ${rate}, scale = ${scale}`);
            }
            v *= Math.pow(v, 2);
            x2 = Math.pow(x, 2);
            v0 = 1.0 - (0.331 * x2 * x2);
            v1 = (0.5 * x2) + (d * (1.0 - v + Math.log(v)));
            u = this._random();
            nq1.push(u);
            nq1.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the gamma distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul of the looped way of generating. Last random number was ${u}`);
            if (u < v0 || Math.log(u) < v1) {
                flg = false;
            }
        }
        if ((i + 1) >= LOOP_MAX) {
            throw new Error(`LOOP_MAX reached inside gamma - bailing out - possible parameter error, or using non-random source? had shape = ${shape}, rate = ${rate}, scale = ${scale}`);
        }
        return rate * d * v;
    }
    studentsT(nu = 1) {
        if (typeof nu === 'object') {
            ({ nu = 1 } = nu);
        }
        validate({ nu }).positive();
        const normal = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
        const chiSquared = this.gamma({ shape: nu / 2, rate: 2 });
        return normal / Math.sqrt(chiSquared / nu);
    }
    wignerSemicircle(R = 1) {
        if (typeof R === 'object') {
            ({ R = 1 } = R);
        }
        validate({ R }).gt(0);
        const theta = this._random() * 2 * Math.PI;
        return R * Math.cos(theta);
    }
    kumaraswamy({ alpha = 0.5, beta = 0.5 } = {}) {
        validate({ alpha }).gt(0);
        validate({ beta }).gt(0);
        const u = this._random();
        return Math.pow(1 - Math.pow(1 - u, 1 / beta), 1 / alpha);
    }
    hermite({ lambda1 = 1, lambda2 = 2 } = {}) {
        validate({ lambda1 }).gt(0);
        validate({ lambda2 }).gt(0);
        const x1 = this.poisson({ lambda: lambda1 });
        const x2 = this.poisson({ lambda: lambda2 });
        return x1 + x2;
    }
    chiSquared(k = 1) {
        if (typeof k === 'object') {
            ({ k = 1 } = k);
        }
        validate({ k }).positive().int();
        let sum = 0;
        for (let i = 0; i < k; i++) {
            const z = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
            sum += z * z;
        }
        return sum;
    }
    rayleigh(scale = 1) {
        if (typeof scale === 'object') {
            ({ scale = 1 } = scale);
        }
        validate({ scale }).gt(0);
        return scale * Math.sqrt(-2 * Math.log(this._random()));
    }
    logNormal({ mean = 0, stddev = 1 } = {}) {
        validate({ stddev }).gt(0);
        const normal = mean + stddev * Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
        return Math.exp(normal);
    }
    cauchy({ median = 0, scale = 1 } = {}) {
        validate({ scale }).gt(0);
        const u = this._random();
        return median + scale * Math.tan(Math.PI * (u - 0.5));
    }
    laplace({ mean = 0, scale = 1 } = {}) {
        validate({ scale }).gt(0);
        const u = this._random() - 0.5;
        return mean - scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
    }
    logistic({ mean = 0, scale = 1 } = {}) {
        validate({ scale }).gt(0);
        const u = this._random();
        return mean + scale * Math.log(u / (1 - u));
    }
    /**
     * Returns the support of the given distribution.
     *
     * @see [Wikipedia - Support (mathematics)](https://en.wikipedia.org/wiki/Support_(mathematics)#In_probability_and_measure_theory)
     */
    support(distribution) {
        const map = {
            random: '[min, max)',
            integer: '[min, max]',
            normal: '(-INF, INF)',
            boxMuller: '(-INF, INF)',
            gaussian: '(-INF, INF)',
            irwinHall: '[0, n]',
            bates: '[0, 1]',
            batesgaussian: '(-INF, INF)',
            bernoulli: '{0, 1}',
            exponential: '[0, INF)',
            pareto: '[scale, INF)',
            poisson: '{1, 2, 3 ...}',
            hypergeometric: '{max(0, n+K-N), ..., min(n, K)}',
            rademacher: '{-1, 1}',
            binomial: '{0, 1, 2, ..., n}',
            betaBinomial: '{0, 1, 2, ..., n}',
            beta: '(0, 1)',
            gamma: '(0, INF)',
            studentsT: '(-INF, INF)',
            wignerSemicircle: '[-R; +R]',
            kumaraswamy: '(0, 1)',
            hermite: '{0, 1, 2, 3, ...}',
            chiSquared: '[0, INF)',
            rayleigh: '[0, INF)',
            logNormal: '(0, INF)',
            cauchy: '(-INF, +INF)',
            laplace: '(-INF, +INF)',
            logistic: '(-INF, +INF)',
        };
        return map[distribution];
    }
    chancyInt(input) {
        var _a;
        if (typeof input === 'number') {
            return Math.round(input);
        }
        if (Array.isArray(input)) {
            for (const el of input) {
                if (!isNumeric(el)) {
                    throw new Error('Cannot pass non-numbers to chancyInt');
                }
            }
            let choice = this.choice(input);
            if (typeof choice !== 'number') {
                choice = parseFloat(choice);
            }
            return Math.round(choice);
        }
        if (typeof input === 'object') {
            input = Object.assign({}, input);
            const type = (_a = input.type) !== null && _a !== void 0 ? _a : 'random';
            if (type === 'random') {
                input.type = 'integer';
            }
            else if (type === 'normal') {
                input.type = 'normal_integer';
            }
        }
        return Math.round(this.chancy(input));
    }
    chancy(input, depth = 0) {
        var _a, _b;
        if (depth >= MAX_RECURSIONS) {
            if (this.shouldThrowOnMaxRecursionsReached()) {
                throw new MaxRecursionsError('Max recursions reached in chancy. Usually a case of badly chosen min/max values.');
            }
            else {
                return 0;
            }
        }
        if (Array.isArray(input)) {
            return this.choice(input);
        }
        if (typeof input === 'string') {
            return this.dice(input);
        }
        if (typeof input === 'object') {
            input = Object.assign({}, input);
            input.type = (_a = input.type) !== null && _a !== void 0 ? _a : 'random';
            if (input.type === 'random' ||
                input.type === 'int' ||
                input.type === 'integer') {
                if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
                    input.max = Number.MAX_SAFE_INTEGER;
                }
            }
            switch (input.type) {
                case 'random':
                    return this.random(input.min, input.max, input.skew);
                case 'int':
                case 'integer':
                    return this.randInt(input.min, input.max, input.skew);
                case 'normal_integer':
                case 'normal_int':
                    return Math.round(this.normal(input));
                case 'dice':
                    return this.chancyMinMax(this.dice((_b = input.dice) !== null && _b !== void 0 ? _b : input), input, depth);
                case 'rademacher':
                    return this.chancyMinMax(this.rademacher(), input, depth);
                case 'normal':
                case 'gaussian':
                case 'boxMuller':
                case 'irwinHall':
                case 'bates':
                case 'batesgaussian':
                case 'bernoulli':
                case 'exponential':
                case 'pareto':
                case 'poisson':
                case 'hypergeometric':
                case 'binomial':
                case 'betaBinomial':
                case 'beta':
                case 'gamma':
                case 'studentsT':
                case 'wignerSemicircle':
                case 'kumaraswamy':
                case 'hermite':
                case 'chiSquared':
                case 'rayleigh':
                case 'logNormal':
                case 'cauchy':
                case 'laplace':
                case 'logistic':
                    return this.chancyMinMax(this[input.type](input), input, depth);
            }
            throw new Error(`Invalid input type given to chancy: "${input.type}".`);
        }
        if (typeof input === 'number') {
            return input;
        }
        throw new Error('Invalid input given to chancy');
    }
    chancyMinMax(result, input, depth = 0) {
        const { min, max } = input;
        if ((depth + 1) >= MAX_RECURSIONS && !this.shouldThrowOnMaxRecursionsReached()) {
            if (typeof min !== 'undefined') {
                result = Math.max(min, result);
            }
            if (typeof max !== 'undefined') {
                result = Math.min(max, result);
            }
            // always returns something in bounds.
            return result;
        }
        if (typeof min !== 'undefined' && result < min) {
            return this.chancy(input, depth + 1);
        }
        if (typeof max !== 'undefined' && result > max) {
            return this.chancy(input, depth + 1);
        }
        return result;
    }
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    chancyMin(input) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.chancyMin(input);
    }
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    chancyMax(input) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.chancyMax(input);
    }
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    static chancyMin(input) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (Array.isArray(input)) {
            for (const el of input) {
                if (!isNumeric(el)) {
                    throw new Error('Cannot pass non-numbers to chancyMin array input');
                }
            }
            return Math.min(...input);
        }
        if (typeof input === 'string') {
            return this.diceMin(input);
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'object') {
            input.type = (_a = input.type) !== null && _a !== void 0 ? _a : 'random';
            if (input.type === 'random' || input.type === 'integer') {
                if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
                    input.max = Number.MAX_SAFE_INTEGER;
                }
            }
            switch (input.type) {
                case 'dice':
                    return this.diceMin(input.dice);
                case 'normal':
                    return (_b = input.min) !== null && _b !== void 0 ? _b : Number.NEGATIVE_INFINITY;
                case 'normal_integer':
                    return (_c = input.min) !== null && _c !== void 0 ? _c : Number.NEGATIVE_INFINITY;
                case 'integer':
                    return (_d = input.min) !== null && _d !== void 0 ? _d : 0;
                case 'random':
                    return (_e = input.min) !== null && _e !== void 0 ? _e : 0;
                case 'boxMuller':
                    return Number.NEGATIVE_INFINITY;
                case 'gaussian':
                    return Number.NEGATIVE_INFINITY;
                case 'irwinHall':
                    return 0;
                case 'bates':
                    return 0;
                case 'batesgaussian':
                    return Number.NEGATIVE_INFINITY;
                case 'bernoulli':
                    return 0;
                case 'exponential':
                    return 0;
                case 'pareto':
                    return (_f = input.scale) !== null && _f !== void 0 ? _f : 1;
                case 'poisson':
                    return 1;
                case 'hypergeometric':
                    // eslint-disable-next-line no-case-declarations
                    const { N = 50, K = 10, n = 5 } = input;
                    return Math.max(0, (n + K - N));
                case 'rademacher':
                    return -1;
                case 'binomial':
                    return 0;
                case 'betaBinomial':
                    return 0;
                case 'beta':
                    return Number.EPSILON;
                case 'gamma':
                    return Number.EPSILON;
                case 'studentsT':
                    return Number.NEGATIVE_INFINITY;
                case 'wignerSemicircle':
                    return -1 * ((_g = input.R) !== null && _g !== void 0 ? _g : 10);
                case 'kumaraswamy':
                    return Number.EPSILON;
                case 'hermite':
                    return 0;
                case 'chiSquared':
                    return 0;
                case 'rayleigh':
                    return 0;
                case 'logNormal':
                    return Number.EPSILON;
                case 'cauchy':
                    return Number.NEGATIVE_INFINITY;
                case 'laplace':
                    return Number.NEGATIVE_INFINITY;
                case 'logistic':
                    return Number.NEGATIVE_INFINITY;
            }
            throw new Error(`Invalid input type ${input.type}.`);
        }
        throw new Error('Invalid input supplied to chancyMin');
    }
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    static chancyMax(input) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (Array.isArray(input)) {
            for (const el of input) {
                if (!isNumeric(el)) {
                    throw new Error('Cannot pass non-numbers to chancyMax array input');
                }
            }
            return Math.max(...input);
        }
        if (typeof input === 'string') {
            return this.diceMax(input);
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'object') {
            input.type = (_a = input.type) !== null && _a !== void 0 ? _a : 'random';
            if (input.type === 'random' || input.type === 'integer') {
                if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
                    input.max = Number.MAX_SAFE_INTEGER;
                }
            }
            switch (input.type) {
                case 'dice':
                    return this.diceMax(input.dice);
                case 'normal':
                    return (_b = input.max) !== null && _b !== void 0 ? _b : Number.POSITIVE_INFINITY;
                case 'normal_integer':
                    return (_c = input.max) !== null && _c !== void 0 ? _c : Number.POSITIVE_INFINITY;
                case 'integer':
                    return (_d = input.max) !== null && _d !== void 0 ? _d : 1;
                case 'random':
                    return (_e = input.max) !== null && _e !== void 0 ? _e : 1;
                case 'boxMuller':
                    return Number.POSITIVE_INFINITY;
                case 'gaussian':
                    return Number.POSITIVE_INFINITY;
                case 'irwinHall':
                    return ((_f = input.n) !== null && _f !== void 0 ? _f : 6);
                case 'bates':
                    return 1;
                case 'batesgaussian':
                    return Number.POSITIVE_INFINITY;
                case 'bernoulli':
                    return 1;
                case 'exponential':
                    return Number.POSITIVE_INFINITY;
                case 'pareto':
                    return Number.POSITIVE_INFINITY;
                case 'poisson':
                    return Number.MAX_SAFE_INTEGER;
                case 'hypergeometric':
                    // eslint-disable-next-line no-case-declarations
                    const { K = 10, n = 5 } = input;
                    return Math.min(n, K);
                case 'rademacher':
                    return 1;
                case 'binomial':
                    return ((_g = input.n) !== null && _g !== void 0 ? _g : 1);
                case 'betaBinomial':
                    return ((_h = input.n) !== null && _h !== void 0 ? _h : 1);
                case 'beta':
                    return 1;
                case 'gamma':
                    return Number.POSITIVE_INFINITY;
                case 'studentsT':
                    return Number.POSITIVE_INFINITY;
                case 'wignerSemicircle':
                    return ((_j = input.R) !== null && _j !== void 0 ? _j : 10);
                case 'kumaraswamy':
                    return 1;
                case 'hermite':
                    return Number.MAX_SAFE_INTEGER;
                case 'chiSquared':
                    return Number.POSITIVE_INFINITY;
                case 'rayleigh':
                    return Number.POSITIVE_INFINITY;
                case 'logNormal':
                    return Number.POSITIVE_INFINITY;
                case 'cauchy':
                    return Number.POSITIVE_INFINITY;
                case 'laplace':
                    return Number.POSITIVE_INFINITY;
                case 'logistic':
                    return Number.POSITIVE_INFINITY;
            }
            throw new Error(`Invalid input type ${input.type}.`);
        }
        throw new Error('Invalid input supplied to chancyMax');
    }
    choice(data) {
        return this.weightedChoice(data);
    }
    weights(data) {
        const chances = new Map();
        data.forEach(function (a) {
            let init = 0;
            if (chances.has(a)) {
                init = chances.get(a);
            }
            chances.set(a, init + 1);
        });
        return chances;
    }
    weightedChoice(data) {
        let total = 0;
        let id;
        if (Array.isArray(data)) {
            // Some shortcuts
            if (data.length === 0) {
                return null;
            }
            if (data.length === 1) {
                return data[0];
            }
            const chances = this.weights(data);
            const result = this.weightedChoice(chances);
            chances.clear();
            return result;
        }
        if (data instanceof Map) {
            // Some shortcuts
            if (data.size === 0) {
                return null;
            }
            if (data.size === 1) {
                return data.keys().next().value;
            }
            data.forEach((value) => {
                total += value;
            });
        }
        else {
            // Some shortcuts
            const entries = Object.keys(data);
            if (entries.length === 0) {
                return null;
            }
            if (entries.length === 1) {
                return entries[0];
            }
            for (id in data) {
                if (data[id] < 0) {
                    throw new Error('Probability cannot be negative');
                }
                total += data[id];
            }
        }
        const random = this._random() * total;
        let part = 0;
        if (data instanceof Map) {
            for (const [id, value] of data) {
                part += value;
                if (random < part) {
                    return id;
                }
            }
        }
        else {
            for (id in data) {
                part += data[id];
                if (random < part) {
                    return id;
                }
            }
        }
        return id;
    }
    pool(entries) {
        return new Pool(entries, this);
    }
    static parseDiceArgs(n = 1, d = 6, plus = 0) {
        if (n === null || typeof n === 'undefined' || arguments.length <= 0) {
            throw new Error('Dice expects at least one argument');
        }
        if (typeof n === 'string') {
            return this.parseDiceString(n);
        }
        if (typeof n === 'object') {
            if (Array.isArray(n)) {
                [n, d, plus] = n;
            }
            else {
                if (typeof n.n === 'undefined' &&
                    typeof n.d === 'undefined' &&
                    typeof n.plus === 'undefined') {
                    throw new Error('Invalid input given to dice related function - dice object must have at least one of n, d or plus properties.');
                }
                ({ n = 1, d = 6, plus = 0 } = n);
            }
        }
        validate({ n }).int(`Expected n to be an integer, got ${n}`);
        validate({ d }).int(`Expected d to be an integer, got ${d}`);
        return { n, d, plus };
    }
    parseDiceArgs(n = 1, d = 6, plus = 0) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceArgs(n, d, plus);
    }
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    static parseDiceString(string) {
        // dice string like 5d10+1
        if (!diceCache[string]) {
            const trimmed = string.replace(/ +/g, '');
            if (/^[+-]*[\d.]+$/.test(trimmed)) {
                return { n: 0, d: 0, plus: parseFloat(trimmed) };
            }
            if (diceRe.test(string)) {
                const result = diceRe.exec(trimmed);
                if (result !== null) {
                    diceCache[string] = {
                        n: parseInt(result[1]),
                        d: parseInt(result[2]),
                        plus: parseFloat(result[3]),
                    };
                    if (Number.isNaN(diceCache[string].n)) {
                        diceCache[string].n = 1;
                    }
                    if (Number.isNaN(diceCache[string].d)) {
                        diceCache[string].d = 6;
                    }
                    if (Number.isNaN(diceCache[string].plus)) {
                        diceCache[string].plus = 0;
                    }
                }
            }
            if (typeof diceCache[string] === 'undefined') {
                throw new Error(`Could not parse dice string ${string}`);
            }
        }
        return diceCache[string];
    }
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    diceMax(n, d, plus) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.diceMax(n, d, plus);
    }
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    diceMin(n, d, plus) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.diceMin(n, d, plus);
    }
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    static diceMax(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        return (n * d) + plus;
    }
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    static diceMin(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        return n + plus;
    }
    diceExpanded(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        if (typeof n === 'number') {
            let nval = n;
            const dval = Math.max(d, 0);
            if (d === 1) {
                return { dice: Array(n).fill(d), plus, total: (n * d + plus) };
            }
            if (n === 0 || d === 0) {
                return { dice: [], plus, total: plus };
            }
            const multiplier = nval < 0 ? -1 : 1;
            nval *= multiplier;
            const results = { dice: [], plus, total: plus };
            while (nval > 0) {
                results.dice.push(multiplier * this.randInt(1, dval));
                nval--;
            }
            results.total = sum(results.dice) + plus;
            return results;
        }
        throw new Error('Invalid arguments given to dice');
    }
    dice(n, d, plus) {
        return this.diceExpanded(n, d, plus).total;
    }
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    parseDiceString(string) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceString(string);
    }
    clamp(number, lower, upper) {
        if (typeof upper !== 'undefined') {
            number = number <= upper ? number : upper;
        }
        if (typeof lower !== 'undefined') {
            number = number >= lower ? number : lower;
        }
        return number;
    }
    bin(val, bins, min, max) {
        validate({ val }).gt(min).lt(max);
        const spread = max - min;
        return (Math.round(((val - min) / spread) * (bins - 1)) / (bins - 1) * spread) + min;
    }
}
_RngAbstract_seed = new WeakMap(), _RngAbstract_randFunc = new WeakMap(), _RngAbstract_shouldThrowOnMaxRecursionsReached = new WeakMap(), _RngAbstract_distributions = new WeakMap();
/**
 * @category Main Class
 */
class Rng extends RngAbstract {
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable(seed) {
        return new this(seed !== null && seed !== void 0 ? seed : PREDICTABLE_SEED);
    }
    serialize() {
        return {
            seed: this.getSeed(),
            version: CURRENT_VERSION
        };
    }
    sameAs(other) {
        if (other instanceof Rng) {
            return this.getRandomSource() === other.getRandomSource() &&
                this.getSeed() === other.getSeed();
        }
        return false;
    }
    from(other) {
        this.setSeed(other.getSeed());
        return this;
    }
    _next() {
        this.setSeed((this.getSeed() + 0x9e3779b9) | 0);
        let z = this.getSeed();
        z ^= z >>> 16;
        z = Math.imul(z, 0x21f0aaad);
        z ^= z >>> 15;
        z = Math.imul(z, 0x735a2d97);
        z ^= z >>> 15;
        return (z >>> 0) / 0x100000000;
    }
    /**
     * Returns an object compatible with rot.js random number generator.
     *
     * @see [Rot.js](https://ondras.github.io/rot.js/manual/#rng)
     */
    rotCompatible() {
        const rng = this;
        return {
            getUniform() {
                return rng.random();
            },
            getUniformInt(lowerBound, upperBound) {
                return rng.randInt(lowerBound, upperBound);
            },
            getNormal(mean = 0, stddev = 1) {
                return rng.boxMuller({ mean, stddev });
            },
            getPercentage() {
                return 1 + Math.floor(this.getUniform() * 100);
            },
            getItem(array) {
                if (!array.length) {
                    return null;
                }
                return array[Math.floor(this.getUniform() * array.length)];
            },
            shuffle(array) {
                const result = [];
                const clone = array.slice();
                while (clone.length) {
                    const index = clone.indexOf(this.getItem(clone));
                    result.push(clone.splice(index, 1)[0]);
                }
                return result;
            },
            getWeightedValue(data) {
                return rng.weightedChoice(data);
            },
            getState() {
                return rng.serialize();
            },
            setState(state) {
                rng.setSeed(state.seed);
                return this;
            },
            clone() {
                const clone = new Rng().rotCompatible();
                return clone.setState(this.getState());
            }
        };
    }
}
export default Rng;
//# sourceMappingURL=rng.js.map