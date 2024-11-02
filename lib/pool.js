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
export default class Pool {
    rng;
    #entries = [];
    constructor(entries = [], rng) {
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
        return this.#entries;
    }
    set entries(entries) {
        this.#entries = this.copyArray(entries);
    }
    get entries() {
        return this.#entries;
    }
    get length() {
        return this.#entries.length;
    }
    setRng(rng) {
        this.rng = rng;
        return this;
    }
    getRng() {
        return this.rng;
    }
    add(entry) {
        this.#entries.push(entry);
    }
    empty() {
        this.#entries = [];
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
            return this.#entries.splice(0, 1)[0];
        }
        const idx = this.rng.randInt(0, this.#entries.length - 1);
        return this.#entries.splice(idx, 1)[0];
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
            const idx = this.rng.randInt(0, this.#entries.length - 1);
            result.push(this.#entries.splice(idx, 1)[0]);
        }
        return result;
    }
}
//# sourceMappingURL=pool.js.map