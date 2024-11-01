import Rng, { SerializedRng } from './../rng.js';

export interface RotRngInterface {
  getUniform (): number;

  getUniformInt (lowerBound: number, upperBound: number): number;

  getNormal (mean?: number, stddev?: number): number

  getPercentage (): number;

  getItem<T> (array: Array<T>): T | null;

  shuffle<T>(array: Array<T>): T[];

  getWeightedValue (data: { [key: string]: number, [key: number]: number }): string | number;

  getSeed (): number;

  setSeed (state: string | number): this;

  getState (): SerializedRng;

  setState (state: SerializedRng): this;

  clone(): RotRngInterface;
}

/**
 * A ROT.js compatible RNG interface
 */
export default class RotRng extends Rng implements RotRngInterface {
  getUniform () {
    return this.random();
  }

  getUniformInt (lowerBound: number, upperBound: number) {
    return this.randInt(lowerBound, upperBound);
  }

  getNormal (mean: number = 0, stddev: number = 1) {
    return this.boxMuller({ mean, stddev });
  }

  getPercentage () {
    return 1 + Math.floor(this.getUniform() * 100);
  }

  getItem<T> (array: Array<T>) {
    return this.choice(array);
  }

  getWeightedValue (data: { [key: string]: number, [key: number]: number }) {
    return this.weightedChoice(data);
  }

  getState (): SerializedRng {
    return this.serialize();
  }

  setState (state: SerializedRng) {
    this.setSeed(state.seed);
    return this;
  }

  clone (): RotRngInterface {
    const clone = new RotRng();
    return clone.setState(this.getState());
  }
}
