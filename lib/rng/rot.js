import Rng from './../rng.js';
/**
 * A ROT.js compatible RNG interface
 */
export default class RotRng extends Rng {
    getUniform() {
        return this.random();
    }
    getUniformInt(lowerBound, upperBound) {
        return this.randInt(lowerBound, upperBound);
    }
    getNormal(mean = 0, stddev = 1) {
        return this.boxMuller({ mean, stddev });
    }
    getPercentage() {
        return 1 + Math.floor(this.getUniform() * 100);
    }
    getItem(array) {
        return this.choice(array);
    }
    getWeightedValue(data) {
        return this.weightedChoice(data);
    }
    getState() {
        return this.serialize();
    }
    setState(state) {
        this.setSeed(state.seed);
        return this;
    }
    clone() {
        const clone = new RotRng();
        return clone.setState(this.getState());
    }
}
//# sourceMappingURL=rot.js.map