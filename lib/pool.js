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
var _Pool_entries;
import Rng from './rng.js';
/**
 * @category Pool
 */
export class PoolEmptyError extends Error {
}
/**
 * @category Pool
 */
export class PoolNotEnoughElementsError extends Error {
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
            this.rng = new Rng();
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
        return __classPrivateFieldGet(this, _Pool_entries, "f");
    }
    set entries(entries) {
        __classPrivateFieldSet(this, _Pool_entries, this.copyArray(entries), "f");
    }
    get entries() {
        return __classPrivateFieldGet(this, _Pool_entries, "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _Pool_entries, "f").length;
    }
    setRng(rng) {
        this.rng = rng;
        return this;
    }
    getRng() {
        return this.rng;
    }
    add(entry) {
        __classPrivateFieldGet(this, _Pool_entries, "f").push(entry);
    }
    empty() {
        __classPrivateFieldSet(this, _Pool_entries, [], "f");
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
            return __classPrivateFieldGet(this, _Pool_entries, "f").splice(0, 1)[0];
        }
        const idx = this.rng.randInt(0, __classPrivateFieldGet(this, _Pool_entries, "f").length - 1);
        return __classPrivateFieldGet(this, _Pool_entries, "f").splice(idx, 1)[0];
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
            const idx = this.rng.randInt(0, __classPrivateFieldGet(this, _Pool_entries, "f").length - 1);
            result.push(__classPrivateFieldGet(this, _Pool_entries, "f").splice(idx, 1)[0]);
        }
        return result;
    }
}
_Pool_entries = new WeakMap();
export default Pool;
//# sourceMappingURL=pool.js.map