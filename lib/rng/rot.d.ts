import Rng, { SerializedRng } from './../rng.js';
export interface RotRngInterface {
    getUniform(): number;
    getUniformInt(lowerBound: number, upperBound: number): number;
    getNormal(mean?: number, stddev?: number): number;
    getPercentage(): number;
    getItem<T>(array: Array<T>): T | null;
    shuffle<T>(array: Array<T>): T[];
    getWeightedValue(data: {
        [key: string]: number;
        [key: number]: number;
    }): string | number;
    getSeed(): number;
    setSeed(state: string | number): this;
    getState(): SerializedRng;
    setState(state: SerializedRng): this;
    clone(): RotRngInterface;
}
/**
 * A ROT.js compatible RNG interface
 */
export default class RotRng extends Rng implements RotRngInterface {
    getUniform(): number;
    getUniformInt(lowerBound: number, upperBound: number): number;
    getNormal(mean?: number, stddev?: number): number;
    getPercentage(): number;
    getItem<T>(array: Array<T>): T | null;
    shuffle<T>(array: Array<T>): T[];
    getWeightedValue(data: {
        [key: string]: number;
        [key: number]: number;
    }): any;
    getState(): SerializedRng;
    setState(state: SerializedRng): this;
    clone(): RotRngInterface;
}
