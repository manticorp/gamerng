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
var _ArrayNumberValidator_numbers, _NumberValidator_number;
import { isNumeric } from './utils.js';
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
export class NumberValidationError extends Error {
}
/**
 * @category Number Validator
 */
export class ArrayNumberValidator {
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
export class NumberValidator {
    constructor(number = 0, name = 'number') {
        /**
         * The number being tested.
         */
        _NumberValidator_number.set(this, void 0);
        /**
         * The name of the variable being validated - shows up in error messages.
         */
        this.name = 'number';
        if (typeof number === 'string') {
            number = parseFloat(number);
        }
        this.number = number;
        this.name = name;
    }
    get number() {
        return __classPrivateFieldGet(this, _NumberValidator_number, "f");
    }
    set number(number) {
        assert(isNumeric(number), `Non-number passed to validator ${number}`);
        if (typeof number === 'string') {
            number = parseFloat('number');
        }
        __classPrivateFieldSet(this, _NumberValidator_number, number, "f");
    }
    /**
     * Returns an ArrayNumberValidator for all the numbers
     */
    all(numbers, name) {
        return new ArrayNumberValidator(numbers, name !== null && name !== void 0 ? name : this.name);
    }
    assertNumber(num) {
        assert(typeof num !== 'undefined', 'No number passed to validator.');
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
    integer(msg) {
        return this.int(msg);
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
    else if (typeof number === 'object') {
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
export default validate;
//# sourceMappingURL=number.js.map