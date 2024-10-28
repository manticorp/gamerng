(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GameRng"] = factory();
	else
		root["GameRng"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ArrayNumberValidator: () => (/* reexport */ ArrayNumberValidator),
  MaxRecursionsError: () => (/* reexport */ MaxRecursionsError),
  NonRandomRandomError: () => (/* reexport */ NonRandomRandomError),
  NumberValidationError: () => (/* reexport */ NumberValidationError),
  NumberValidator: () => (/* reexport */ NumberValidator),
  Pool: () => (/* reexport */ pool),
  PoolEmptyError: () => (/* reexport */ PoolEmptyError),
  PoolNotEnoughElementsError: () => (/* reexport */ PoolNotEnoughElementsError),
  PredictableRng: () => (/* reexport */ PredictableRng),
  Rng: () => (/* reexport */ src_rng),
  RngAbstract: () => (/* reexport */ RngAbstract),
  "default": () => (/* binding */ src),
  validateNumber: () => (/* reexport */ src_number)
});

;// ./src/number.ts
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ArrayNumberValidator_numbers, _NumberValidator_number;
/**
 * @category Number Validator
 */
const assert = (truthy, msg = 'Assertion failed') => {
    if (!truthy) {
        throw new NumberValidationError(msg);
    }
};
/**
 * @category Number Validator
 */
class NumberValidationError extends Error {
}
/**
 * @category Number Validator
 */
class ArrayNumberValidator {
    constructor(numbers, name = 'numbers') {
        /**
         * The numbers to be validated
         */
        _ArrayNumberValidator_numbers.set(this, []);
        /**
         * Descriptive name for this validation
         */
        this.name = 'numbers';
        this.numbers = numbers;
        this.name = name;
    }
    get numbers() {
        return __classPrivateFieldGet(this, _ArrayNumberValidator_numbers, "f");
    }
    set numbers(numbers) {
        for (const number of numbers) {
            assert(typeof number === 'number', `Non-number passed to validator ${number}`);
        }
        __classPrivateFieldSet(this, _ArrayNumberValidator_numbers, numbers, "f");
    }
    /**
     * Specify the numbers to validate
     */
    all(numbers) {
        this.numbers = numbers;
        return this;
    }
    /**
     * Specify the numbers to validate
     */
    validate(numbers) {
        if (!Array.isArray(numbers)) {
            return new NumberValidator(numbers);
        }
        return this.all(numbers);
    }
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potatoes = [0, 1];
     * validate(potatoes).varname('potatoes').gt(2); // "Expected every component of potatoes to be > 2, got 0"
     */
    varname(name) {
        this.name = name;
        return this;
    }
    /**
     * Get the sum of our numbers
     */
    sum() {
        return this.numbers.reduce((a, b) => a + b, 0);
    }
    /**
     * Validates whether the total of all of our numbers is close to sum, with a maximum difference of diff
     * @param sum The sum
     * @param diff The maximum difference
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not sum close to the correct amount
     */
    sumcloseto(sum, diff = 0.0001, msg) {
        assert(Math.abs(this.sum() - sum) < diff, msg !== null && msg !== void 0 ? msg : `Expected sum of ${this.name} to be within ${diff} of ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is equal (===) to sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to the correct amount
     */
    sumto(sum, msg) {
        assert(this.sum() === sum, msg !== null && msg !== void 0 ? msg : `Expected sum of ${this.name} to be equal to ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is < sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to < sum
     */
    sumtolt(sum, msg) {
        assert(this.sum() < sum, msg !== null && msg !== void 0 ? msg : `Expected sum of ${this.name} to be less than ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is > sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to > sum
     */
    sumtogt(sum, msg) {
        assert(this.sum() > sum, msg !== null && msg !== void 0 ? msg : `Expected sum of ${this.name} to be greater than ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is <= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to <= sum
     */
    sumtolteq(sum, msg) {
        assert(this.sum() <= sum, msg !== null && msg !== void 0 ? msg : `Expected sum of ${this.name} to be less than or equal to ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is >= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to >= sum
     */
    sumtogteq(sum, msg) {
        assert(this.sum() >= sum, msg !== null && msg !== void 0 ? msg : `Expected sum of ${this.name} to be greater than or equal to ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all integers
     */
    int(msg) {
        this.numbers.forEach(a => validate(a).int(msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be an integer, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all positive
     */
    positive(msg) {
        this.numbers.forEach(a => validate(a).positive(msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be postiive, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all negative
     */
    negative(msg) {
        this.numbers.forEach(a => validate(a).negative(msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be negative, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all between from and to
     */
    between(from, to, msg) {
        this.numbers.forEach(a => validate(a).between(from, to, msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be between ${from} and ${to}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all between or equal to from and to
     */
    betweenEq(from, to, msg) {
        this.numbers.forEach(a => validate(a).betweenEq(from, to, msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be between or equal to ${from} and ${to}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all > n
     */
    gt(n, msg) {
        this.numbers.forEach(a => validate(a).gt(n, msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be > ${n}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all >= n
     */
    gteq(n, msg) {
        this.numbers.forEach(a => validate(a).gteq(n, msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be >= ${n}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all < n
     */
    lt(n, msg) {
        this.numbers.forEach(a => validate(a).lt(n, msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be < ${n}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all <= n
     */
    lteq(n, msg) {
        this.numbers.forEach(a => validate(a).lteq(n, msg !== null && msg !== void 0 ? msg : `Expected every component of ${this.name} to be <= ${n}, got ${a}`));
        return this;
    }
}
_ArrayNumberValidator_numbers = new WeakMap();
/**
 * Validate numbers in a fluent fashion.
 *
 * Each validator method accepts a message as the last parameter
 * for customising the error message.
 *
 * @category Number Validator
 *
 * @example
 * const n = new NumberValidator();
 * n.validate(0).gt(1); // NumberValidationError
 *
 * @example
 * const n = new NumberValidator();
 * const probability = -0.1;
 * n.validate(probability).gteq(0, 'Probabilities should always be >= 0'); // NumberValidationError('Probabilities should always be >= 0').
 */
class NumberValidator {
    constructor(number = 0, name = 'number') {
        /**
         * The number being tested.
         */
        _NumberValidator_number.set(this, void 0);
        /**
         * The name of the variable being validated - shows up in error messages.
         */
        this.name = 'number';
        this.number = number;
        this.name = name;
    }
    get number() {
        return __classPrivateFieldGet(this, _NumberValidator_number, "f");
    }
    set number(number) {
        assert(typeof number === 'number', `Non-number passed to validator ${number}`);
        __classPrivateFieldSet(this, _NumberValidator_number, number, "f");
    }
    /**
     * Returns an ArrayNumberValidator for all the numbers
     */
    all(numbers, name) {
        return new ArrayNumberValidator(numbers, name !== null && name !== void 0 ? name : this.name);
    }
    assertNumber(num) {
        assert(typeof this.number !== 'undefined', 'No number passed to validator.');
        return true;
    }
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potato = 1;
     * validate(potato).varname('potato').gt(2); // "Expected potato to be greater than 2, got 1"
     * @param {string} name [description]
     */
    varname(name) {
        this.name = name;
        return this;
    }
    /**
     * Specify the number to be validated
     */
    validate(number) {
        if (Array.isArray(number)) {
            return this.all(number);
        }
        this.number = number;
        return this;
    }
    /**
     * Asserts that the number is an integer
     * @throws {@link NumberValidationError} if ths number is not an integer
     */
    int(msg) {
        if (this.assertNumber(this.number))
            assert(Number.isInteger(this.number), msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be an integer, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that the number is > 0
     * @throws {@link NumberValidationError} if the number is not positive
     */
    positive(msg) {
        return this.gt(0, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be positive, got ${this.number}`);
    }
    /**
     * Asserts that the number is < 0
     * @throws {@link NumberValidationError} if the number is not negative
     */
    negative(msg) {
        return this.lt(0, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be negative, got ${this.number}`);
    }
    /**
     * Asserts that the from < number < to
     * @throws {@link NumberValidationError} if it is outside or equal to those bounds
     */
    between(from, to, msg) {
        if (this.assertNumber(this.number))
            assert(this.number > from && this.number < to, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be between ${from} and ${to}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that the from <= number <= to
     * @throws {@link NumberValidationError} if it is outside those bounds
     */
    betweenEq(from, to, msg) {
        if (this.assertNumber(this.number))
            assert(this.number >= from && this.number <= to, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be between or equal to ${from} and ${to}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number > n
     * @throws {@link NumberValidationError} if it is less than or equal to n
     */
    gt(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number > n, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be greater than ${n}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number >= n
     * @throws {@link NumberValidationError} if it is less than n
     */
    gteq(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number >= n, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be greater than or equal to ${n}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number < n
     * @throws {@link NumberValidationError} if it is greater than or equal to n
     */
    lt(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number < n, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be less than ${n}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number <= n
     * @throws {@link NumberValidationError} if it is greater than n
     */
    lteq(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number <= n, msg !== null && msg !== void 0 ? msg : `Expected ${this.name} to be less than or equal to ${n}, got ${this.number}`);
        return this;
    }
}
_NumberValidator_number = new WeakMap();
function validate(number) {
    if (Array.isArray(number)) {
        return new ArrayNumberValidator(number);
    }
    else if (typeof number === 'object' && number !== null) {
        const entries = Object.entries(number);
        if (entries.length === 0) {
            throw new Error('Empty object provided');
        }
        const [name, value] = entries[0];
        return validate(value).varname(name);
    }
    else {
        return new NumberValidator(number);
    }
}
/* harmony default export */ const src_number = (validate);

;// ./src/pool.ts
var pool_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var pool_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Pool_entries;

/**
 * @category Pool
 */
class PoolEmptyError extends Error {
}
/**
 * @category Pool
 */
class PoolNotEnoughElementsError extends Error {
}
/**
 * Allows for randomly drawing from a pool of entries without replacement
 * @category Pool
 */
class Pool {
    constructor(entries = [], rng) {
        _Pool_entries.set(this, []);
        this.entries = entries;
        if (rng) {
            this.rng = rng;
        }
        else {
            this.rng = new src_rng();
        }
    }
    copyArray(arr) {
        return Array.from(arr);
    }
    setEntries(entries) {
        this.entries = entries;
        return this;
    }
    getEntries() {
        return pool_classPrivateFieldGet(this, _Pool_entries, "f");
    }
    set entries(entries) {
        pool_classPrivateFieldSet(this, _Pool_entries, this.copyArray(entries), "f");
    }
    get entries() {
        return pool_classPrivateFieldGet(this, _Pool_entries, "f");
    }
    get length() {
        return pool_classPrivateFieldGet(this, _Pool_entries, "f").length;
    }
    setRng(rng) {
        this.rng = rng;
        return this;
    }
    getRng() {
        return this.rng;
    }
    add(entry) {
        pool_classPrivateFieldGet(this, _Pool_entries, "f").push(entry);
    }
    empty() {
        pool_classPrivateFieldSet(this, _Pool_entries, [], "f");
        return this;
    }
    isEmpty() {
        return this.length <= 0;
    }
    /**
     * Draw an element from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     */
    draw() {
        if (this.length === 0) {
            throw new PoolEmptyError('No more elements left to draw from in pool.');
        }
        if (this.length === 1) {
            return pool_classPrivateFieldGet(this, _Pool_entries, "f").splice(0, 1)[0];
        }
        const idx = this.rng.randInt(0, pool_classPrivateFieldGet(this, _Pool_entries, "f").length - 1);
        return pool_classPrivateFieldGet(this, _Pool_entries, "f").splice(idx, 1)[0];
    }
    /**
     * Draw n elements from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     * @throws {@link PoolNotEnoughElementsError} if the pool does not have enough elements to draw n values
     */
    drawMany(n) {
        if (n < 0) {
            throw new Error('Cannot draw < 0 elements from pool');
        }
        if (this.length === 0 && n > 0) {
            throw new PoolEmptyError('No more elements left to draw from in pool.');
        }
        if (this.length < n) {
            throw new PoolNotEnoughElementsError(`Tried to draw ${n} elements from pool with only ${this.length} entries.`);
        }
        const result = [];
        for (let i = 0; i < n; i++) {
            const idx = this.rng.randInt(0, pool_classPrivateFieldGet(this, _Pool_entries, "f").length - 1);
            result.push(pool_classPrivateFieldGet(this, _Pool_entries, "f").splice(idx, 1)[0]);
        }
        return result;
    }
}
_Pool_entries = new WeakMap();
/* harmony default export */ const pool = (Pool);

;// ./src/queue.ts
class Dequeue {
    constructor(length = 1) {
        this.elements = [];
        if (Array.isArray(length)) {
            this.elements = length;
            this.size = this.elements.length;
        }
        else {
            this.size = length;
        }
    }
    get length() {
        return this.elements.length;
    }
    push(el) {
        this.elements.push(el);
        if (this.elements.length > this.size) {
            return this.pop();
        }
    }
    pop() {
        return this.elements.pop();
    }
    full() {
        return this.length >= this.size;
    }
    empty() {
        this.elements = [];
    }
    get(i) {
        return this.elements[i];
    }
    allSame() {
        if (this.length > 0) {
            return this.elements.every(a => a === this.elements[0]);
        }
        return true;
    }
}
class NumberQueue extends (/* unused pure expression or super */ null && (Dequeue)) {
    sum() {
        return this.elements.reduce((a, b) => a + b, 0);
    }
    avg() {
        return this.sum() / this.length;
    }
}
class LoopDetectedError extends Error {
}
class NonRandomDetector extends Dequeue {
    constructor(length = 1, minsequencelength = 2) {
        super(length);
        this.minsequencelength = 2;
        this.errormessage = 'Loop detected in input data. Randomness source not random?';
        if (this.size > 10000) {
            throw new Error('Cannot detect loops for more than 10000 elements');
        }
        this.minsequencelength = minsequencelength;
    }
    push(el) {
        this.detectLoop();
        this.elements.push(el);
        if (this.elements.length > this.size) {
            return this.pop();
        }
    }
    detectLoop(msg) {
        if (this.full()) {
            if (this.allSame()) {
                this.loopDetected(msg);
            }
            if (this.hasRepeatingSequence(this.elements, this.minsequencelength)) {
                this.loopDetected(msg);
            }
        }
    }
    loopDetected(msg) {
        throw new LoopDetectedError(msg !== null && msg !== void 0 ? msg : this.errormessage);
    }
    /**
     * Checks if there is a repeating sequence longer than a specified length in an array of numbers.
     *
     * @param {number[]} arr - The array of numbers.
     * @param {number} n - The minimum length of the repeating sequence.
     * @returns {boolean} True if a repeating sequence longer than length n is found, otherwise false.
     */
    hasRepeatingSequence(arr, n) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                let k = 0;
                while (j + k < arr.length && arr[i + k] === arr[j + k]) {
                    k++;
                    if (k > n) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

;// ./src/rng.ts
var rng_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var rng_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RngAbstract_seed, _RngAbstract_monotonic, _RngAbstract_lastuniqid, _RngAbstract_randFunc, _RngAbstract_shouldThrowOnMaxRecursionsReached, _RngAbstract_distributions, _Rng_mask, _Rng_seed, _Rng_randFunc, _Rng_m_z;



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
class MaxRecursionsError extends Error {
}
;
class NonRandomRandomError extends Error {
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
class RngAbstract {
    constructor(seed) {
        _RngAbstract_seed.set(this, 0);
        _RngAbstract_monotonic.set(this, 0);
        _RngAbstract_lastuniqid.set(this, 0);
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
        return rng_classPrivateFieldGet(this, _RngAbstract_seed, "f");
    }
    sameAs(other) {
        if (other instanceof RngAbstract) {
            return rng_classPrivateFieldGet(this, _RngAbstract_seed, "f") === rng_classPrivateFieldGet(other, _RngAbstract_seed, "f") && rng_classPrivateFieldGet(this, _RngAbstract_randFunc, "f") === rng_classPrivateFieldGet(other, _RngAbstract_randFunc, "f");
        }
        return false;
    }
    randomSource(source) {
        rng_classPrivateFieldSet(this, _RngAbstract_randFunc, source, "f");
        return this;
    }
    getRandomSource() {
        return rng_classPrivateFieldGet(this, _RngAbstract_randFunc, "f");
    }
    setSeed(seed) {
        if (typeof seed !== 'undefined' && seed !== null) {
            if (typeof seed === 'string') {
                seed = this.convertStringToNumber(seed);
            }
            rng_classPrivateFieldSet(this, _RngAbstract_seed, seed, "f");
        }
        else {
            return this.setSeed(Math.ceil(Math.random() * 100000000));
        }
        return this;
    }
    seed(seed) {
        this.setSeed(seed);
        return this;
    }
    serialize() {
        return {
            seed: rng_classPrivateFieldGet(this, _RngAbstract_seed, "f"),
        };
    }
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized) {
        const { constructor } = Object.getPrototypeOf(this);
        const rng = new constructor(serialized.seed);
        rng.setSeed(serialized.seed);
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
        if (typeof rng_classPrivateFieldGet(this, _RngAbstract_randFunc, "f") === 'function') {
            return rng_classPrivateFieldGet(this, _RngAbstract_randFunc, "f").call(this);
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
        src_number({ chanceIn }).positive();
        src_number({ n }).positive();
        const chance = n / chanceIn;
        return this._random() <= chance;
    }
    // 500 to 1 chance, for example
    chanceTo(from, to) {
        return this.chance(from, from + to);
    }
    randInt(from = 0, to = 1, skew = 0) {
        src_number({ from }).int();
        src_number({ to }).int();
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
        var _a;
        const now = Date.now() * 1000;
        if (rng_classPrivateFieldGet(this, _RngAbstract_lastuniqid, "f") === now) {
            rng_classPrivateFieldSet(this, _RngAbstract_monotonic, (_a = rng_classPrivateFieldGet(this, _RngAbstract_monotonic, "f"), _a++, _a), "f");
        }
        else {
            rng_classPrivateFieldSet(this, _RngAbstract_monotonic, Math.round(this._random() * 100), "f");
        }
        const sec = now + rng_classPrivateFieldGet(this, _RngAbstract_monotonic, "f");
        const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
        rng_classPrivateFieldSet(this, _RngAbstract_lastuniqid, now, "f");
        return `${prefix}${id}`;
    }
    randomString(len = 6) {
        src_number({ len }).gt(0);
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
        else {
            rand = Math.pow(rand, Math.pow(2, -skew));
        }
        return this.scaleNorm(rand, from, to);
    }
    scale(number, from, to, min = 0, max = 1) {
        src_number({ number }).lteq(max);
        src_number({ number }).gteq(min);
        // First we scale the number in the range [0-1)
        number = (number - min) / (max - min);
        return this.scaleNorm(number, from, to);
    }
    scaleNorm(number, from, to) {
        src_number({ number }).betweenEq(0, 1);
        return (number * (to - from)) + from;
    }
    shouldThrowOnMaxRecursionsReached(val) {
        if (typeof val === 'boolean') {
            rng_classPrivateFieldSet(this, _RngAbstract_shouldThrowOnMaxRecursionsReached, val, "f");
            return this;
        }
        if (typeof rng_classPrivateFieldGet(this, _RngAbstract_shouldThrowOnMaxRecursionsReached, "f") !== 'undefined') {
            return rng_classPrivateFieldGet(this, _RngAbstract_shouldThrowOnMaxRecursionsReached, "f");
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
        src_number({ stddev }).positive();
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
        src_number({ stddev }).gteq(0);
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
        src_number({ n }).int().positive();
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
        src_number({ n }).int().positive();
        return this.irwinHall({ n }) / n;
    }
    batesgaussian(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        src_number({ n }).int().gt(1);
        return (this.irwinHall({ n }) / Math.sqrt(n)) - ((1 / Math.sqrt(1 / n)) / 2);
    }
    bernoulli(p = 0.5) {
        if (typeof p === 'object') {
            ({ p = 0.5 } = p);
        }
        src_number({ p }).lteq(1).gteq(0);
        return this._random() < p ? 1 : 0;
    }
    exponential(rate = 1) {
        if (typeof rate === 'object') {
            ({ rate = 1 } = rate);
        }
        src_number({ rate }).gt(0);
        return -Math.log(1 - this._random()) / rate;
    }
    pareto({ shape = 0.5, scale = 1, location = 0 } = {}) {
        src_number({ shape }).gteq(0);
        src_number({ scale }).positive();
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
        src_number({ lambda }).positive();
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
        src_number({ N }).int().positive();
        src_number({ K }).int().positive().lteq(N);
        src_number({ n }).int().positive().lteq(N);
        if (typeof k === 'undefined') {
            k = this.randInt(0, Math.min(K, n));
        }
        src_number({ k }).int().betweenEq(0, Math.min(K, n));
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
        src_number({ n }).int().positive();
        src_number({ p }).betweenEq(0, 1);
        let successes = 0;
        for (let i = 0; i < n; i++) {
            if (this._random() < p) {
                successes++;
            }
        }
        return successes;
    }
    betaBinomial({ alpha = 1, beta = 1, n = 1 } = {}) {
        src_number({ alpha }).positive();
        src_number({ beta }).positive();
        src_number({ n }).int().positive();
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
        src_number({ alpha }).positive();
        src_number({ beta }).positive();
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
        src_number({ shape }).positive();
        if (typeof scale !== 'undefined' && typeof rate !== 'undefined' && rate !== 1 / scale) {
            throw new Error('Cannot supply rate and scale');
        }
        if (typeof scale !== 'undefined') {
            src_number({ scale }).positive();
            rate = 1 / scale;
        }
        if (typeof rate === 'undefined') {
            rate = 1;
        }
        if (rate) {
            src_number({ rate }).positive();
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
        src_number({ nu }).positive();
        const normal = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
        const chiSquared = this.gamma({ shape: nu / 2, rate: 2 });
        return normal / Math.sqrt(chiSquared / nu);
    }
    wignerSemicircle(R = 1) {
        if (typeof R === 'object') {
            ({ R = 1 } = R);
        }
        src_number({ R }).gt(0);
        const theta = this._random() * 2 * Math.PI;
        return R * Math.cos(theta);
    }
    kumaraswamy({ alpha = 0.5, beta = 0.5 } = {}) {
        src_number({ alpha }).gt(0);
        src_number({ beta }).gt(0);
        const u = this._random();
        return Math.pow(1 - Math.pow(1 - u, 1 / beta), 1 / alpha);
    }
    hermite({ lambda1 = 1, lambda2 = 2 } = {}) {
        src_number({ lambda1 }).gt(0);
        src_number({ lambda2 }).gt(0);
        const x1 = this.poisson({ lambda: lambda1 });
        const x2 = this.poisson({ lambda: lambda2 });
        return x1 + x2;
    }
    chiSquared(k = 1) {
        if (typeof k === 'object') {
            ({ k = 1 } = k);
        }
        src_number({ k }).positive().int();
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
        src_number({ scale }).gt(0);
        return scale * Math.sqrt(-2 * Math.log(this._random()));
    }
    logNormal({ mean = 0, stddev = 1 } = {}) {
        src_number({ stddev }).gt(0);
        const normal = mean + stddev * Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
        return Math.exp(normal);
    }
    cauchy({ median = 0, scale = 1 } = {}) {
        src_number({ scale }).gt(0);
        const u = this._random();
        return median + scale * Math.tan(Math.PI * (u - 0.5));
    }
    laplace({ mean = 0, scale = 1 } = {}) {
        src_number({ scale }).gt(0);
        const u = this._random() - 0.5;
        return mean - scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
    }
    logistic({ mean = 0, scale = 1 } = {}) {
        src_number({ scale }).gt(0);
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
                    return Math.floor(this.normal(input));
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
            data.forEach((value, key) => {
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
        // If by some floating-point annoyance we have
        // random >= total, just return the last id.
        return id;
    }
    pool(entries) {
        return new pool(entries, this);
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
        src_number({ n }).int(`Expected n to be an integer, got ${n}`);
        src_number({ d }).int(`Expected d to be an integer, got ${d}`);
        return { n, d, plus };
    }
    parseDiceArgs(n = 1, d = 6, plus = 0) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceArgs(n);
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
        src_number({ val }).gt(min).lt(max);
        const spread = max - min;
        return (Math.round(((val - min) / spread) * (bins - 1)) / (bins - 1) * spread) + min;
    }
}
_RngAbstract_seed = new WeakMap(), _RngAbstract_monotonic = new WeakMap(), _RngAbstract_lastuniqid = new WeakMap(), _RngAbstract_randFunc = new WeakMap(), _RngAbstract_shouldThrowOnMaxRecursionsReached = new WeakMap(), _RngAbstract_distributions = new WeakMap();
/**
 * @category Main Class
 */
class Rng extends RngAbstract {
    constructor(seed) {
        super(seed);
        _Rng_mask.set(this, void 0);
        _Rng_seed.set(this, 0);
        _Rng_randFunc.set(this, void 0);
        _Rng_m_z.set(this, 0);
        rng_classPrivateFieldSet(this, _Rng_mask, 0xffffffff, "f");
        rng_classPrivateFieldSet(this, _Rng_m_z, 987654321, "f");
    }
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable(seed) {
        return new this(seed !== null && seed !== void 0 ? seed : PREDICTABLE_SEED);
    }
    serialize() {
        return {
            mask: this.getMask(),
            seed: this.getSeed(),
            m_z: this.getMz(),
        };
    }
    sameAs(other) {
        if (other instanceof Rng) {
            return this.getRandomSource() === other.getRandomSource() &&
                this.getSeed() === other.getSeed() &&
                this.getMask() === other.getMask() &&
                this.getMz() === other.getMz();
        }
        return false;
    }
    /** @hidden */
    getMask() {
        return rng_classPrivateFieldGet(this, _Rng_mask, "f");
    }
    /** @hidden */
    getMz() {
        return rng_classPrivateFieldGet(this, _Rng_m_z, "f");
    }
    /** @hidden */
    setMask(mask) {
        rng_classPrivateFieldSet(this, _Rng_mask, mask, "f");
    }
    /** @hidden */
    setMz(mz) {
        rng_classPrivateFieldSet(this, _Rng_m_z, mz, "f");
    }
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized) {
        const rng = new this();
        rng.setSeed(serialized.seed);
        rng.setMask(serialized.mask);
        rng.setMz(serialized.m_z);
        return rng;
    }
    seed(i) {
        super.seed(i);
        rng_classPrivateFieldSet(this, _Rng_m_z, 987654321, "f");
        return this;
    }
    _next() {
        rng_classPrivateFieldSet(this, _Rng_m_z, (36969 * (rng_classPrivateFieldGet(this, _Rng_m_z, "f") & 65535) + (rng_classPrivateFieldGet(this, _Rng_m_z, "f") >> 16)) & rng_classPrivateFieldGet(this, _Rng_mask, "f"), "f");
        this.setSeed((18000 * (this.getSeed() & 65535) + (this.getSeed() >> 16)) & rng_classPrivateFieldGet(this, _Rng_mask, "f"));
        let result = ((rng_classPrivateFieldGet(this, _Rng_m_z, "f") << 16) + this.getSeed()) & rng_classPrivateFieldGet(this, _Rng_mask, "f");
        result /= 4294967296;
        return result + 0.5;
    }
}
_Rng_mask = new WeakMap(), _Rng_seed = new WeakMap(), _Rng_randFunc = new WeakMap(), _Rng_m_z = new WeakMap();
/* harmony default export */ const src_rng = (Rng);

;// ./src/rng/predictable.ts

/**
 *
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 *
 * You can set an array of results that will be returned from called to _next()
 *
 * Note: To avoid unexpected results when using this in place of regular Rng, it is
 * only allowed to make the results spread from [0, 1)
 *
 * The numbers are returned and cycled, so once you reach the end of the list, it will
 * just keep on going.
 *
 * @category Other Rngs
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0.0];
 * prng.random(); // 0.0
 * prng.random(); // 0.0
 * prng.random(); // 0.0
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0, 0.5];
 * prng.random(); // 0.0
 * prng.random(); // 0.5
 * prng.random(); // 0.0
 * prng.random(); // 0.5
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0.0, 0.1, 0.2, 0.3, 0.4];
 * prng.random(); // 0.0
 * prng.random(); // 0.1
 * prng.random(); // 0.2
 * prng.random(); // 0.3
 * prng.random(); // 0.4
 * prng.random(); // 0.0
 *
 * @example
 * // The setEvenSpread and evenSpread methods can be used to generate
 * // n numbers between [0, 1) with even gaps between
 * const prng = new PredictableRng();
 * prng.results = [0.0, 0.1, 0.2, 0.3, 0.4];
 * prng.setEvenSpread(11);
 * prng.random(); // 0.0
 * prng.random(); // 0.1
 * prng.random(); // 0.2
 * prng.random(); // 0.3
 * prng.random(); // 0.4
 * prng.random(); // 0.5
 * prng.random(); // 0.6
 * prng.random(); // 0.7
 * prng.random(); // 0.8
 * prng.random(); // 0.9
 * prng.random(); // 0.9999999...
 * prng.random(); // 0.0
 */
class PredictableRng extends RngAbstract {
    constructor(seed, results) {
        super(seed);
        this.counter = 0;
        this._results = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
        if (results) {
            this.results = results;
        }
    }
    get results() {
        return this._results;
    }
    set results(results) {
        if (results.length <= 0) {
            throw new Error('Must provide some fake results.');
        }
        for (const r of results) {
            if (r < 0) {
                throw new Error(`Results must be greater than or equal to 0, got '${r}'`);
            }
            if (r >= 1) {
                throw new Error(`Results must be less than 1, got '${r}'`);
            }
        }
        this._results = results;
        this.reset();
    }
    evenSpread(n) {
        const p = [];
        for (let i = 0; i < (n - 1); i++) {
            p.push(i / (n - 1));
        }
        p.push(1 - Number.EPSILON);
        return p;
    }
    setEvenSpread(n) {
        this.results = this.evenSpread(n);
        return this;
    }
    sameAs(other) {
        if (other instanceof PredictableRng) {
            return this.results.join(',') === other.results.join(',') &&
                this.counter === other.counter &&
                this.getRandomSource() === other.getRandomSource();
        }
        return false;
    }
    reset() {
        this.counter = 0;
        return this;
    }
    _next() {
        return this.results[this.counter++ % this.results.length];
    }
}

;// ./src/index.ts

/* harmony default export */ const src = (src_rng);










/******/ 	return __webpack_exports__;
/******/ })()
;
});