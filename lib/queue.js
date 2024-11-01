export default class Dequeue {
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
        return undefined;
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
export class NumberQueue extends Dequeue {
    sum() {
        return this.elements.reduce((a, b) => a + b, 0);
    }
    avg() {
        return this.sum() / this.length;
    }
}
class LoopDetectedError extends Error {
}
export class NonRandomDetector extends Dequeue {
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
        return undefined;
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
//# sourceMappingURL=queue.js.map