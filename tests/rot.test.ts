import Rng from './../src/rng';
import PredictableRng from './../src/rng/predictable';
import RotRng from './../src/rng/rot';

const smruns = Math.pow(10, 2);
const mdruns = Math.pow(10, 3);
const lgruns = Math.pow(10, 4);
const xlruns = Math.pow(10, 5);

describe('testing Rng & predictable Rng', () => {
  let rng: Rng;
  let rot: RotRng;
  let prng: PredictableRng;

  beforeEach(() => {
    rng = new Rng();
    rot = new RotRng();
    prng = new PredictableRng();
  });

  afterEach(() => {
    prng.reset();
  });

  test('Rng.rotCompatible returns object', () => {
    expect(rng.rotCompatible()).toBeInstanceOf(Object);
  });

  test('function getUniform exists', () => {
    expect(rng.rotCompatible().getUniform).toEqual(expect.any(Function));
    expect(rot.getUniform).toEqual(expect.any(Function));
  });

  test('function getUniformInt exists', () => {
    expect(rng.rotCompatible().getUniformInt).toEqual(expect.any(Function));
    expect(rot.getUniformInt).toEqual(expect.any(Function));
  });

  test('function getNormal exists', () => {
    expect(rng.rotCompatible().getNormal).toEqual(expect.any(Function));
    expect(rot.getNormal).toEqual(expect.any(Function));
  });

  test('function getPercentage exists', () => {
    expect(rng.rotCompatible().getPercentage).toEqual(expect.any(Function));
    expect(rot.getPercentage).toEqual(expect.any(Function));
  });

  test('function getItem exists', () => {
    expect(rng.rotCompatible().getItem).toEqual(expect.any(Function));
    expect(rot.getItem).toEqual(expect.any(Function));
  });

  test('function shuffle exists', () => {
    expect(rng.rotCompatible().shuffle).toEqual(expect.any(Function));
    expect(rot.shuffle).toEqual(expect.any(Function));
  });

  test('function getWeightedValue exists', () => {
    expect(rng.rotCompatible().getWeightedValue).toEqual(expect.any(Function));
    expect(rot.getWeightedValue).toEqual(expect.any(Function));
  });

  test('function getState exists', () => {
    expect(rng.rotCompatible().getState).toEqual(expect.any(Function));
    expect(rot.getState).toEqual(expect.any(Function));
  });

  test('function setState exists', () => {
    expect(rng.rotCompatible().setState).toEqual(expect.any(Function));
    expect(rot.setState).toEqual(expect.any(Function));
  });

  test('function clone exists', () => {
    expect(rng.rotCompatible().clone).toEqual(expect.any(Function));
    expect(rot.clone).toEqual(expect.any(Function));
  });

  describe('functions work as expected and do not throw', () => {
    test('getUniform', () => {
      const rngResult = rng.rotCompatible().getUniform();
      expect(rngResult).toBeGreaterThanOrEqual(0);
      expect(rngResult).toBeLessThan(1);

      const rotResult = rot.getUniform();
      expect(rotResult).toBeGreaterThanOrEqual(0);
      expect(rotResult).toBeLessThan(1);
    });

    test('getUniformInt', () => {
      const rngResult = rng.rotCompatible().getUniformInt(0, 100);
      expect(rngResult).toBeGreaterThanOrEqual(0);
      expect(rngResult).toBeLessThanOrEqual(100);

      const rotResult = rot.getUniformInt(0, 100);
      expect(rotResult).toBeGreaterThanOrEqual(0);
      expect(rotResult).toBeLessThanOrEqual(100);
    });

    test('getNormal', () => {
      const rngResult = rng.rotCompatible().getNormal();
      expect(rngResult).toEqual(expect.any(Number));

      const rotResult = rot.getNormal();
      expect(rotResult).toEqual(expect.any(Number));
    });

    test('getPercentage', () => {
      const rngResult = rng.rotCompatible().getPercentage();
      expect(rngResult).toBeGreaterThanOrEqual(0);
      expect(rngResult).toBeLessThanOrEqual(100);

      const rotResult = rot.getPercentage();
      expect(rotResult).toBeGreaterThanOrEqual(0);
      expect(rotResult).toBeLessThanOrEqual(100);
    });

    test('getItem', () => {
      const arr = ['a', 'b', 'c'];
      const rngResult = rng.rotCompatible().getItem(arr);
      expect(arr).toContain(rngResult);
      expect(rngResult).toEqual(expect.any(String));

      const rotResult = rot.getItem(arr);
      expect(arr).toContain(rotResult);
      expect(rotResult).toEqual(expect.any(String));
    });

    test('shuffle', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
      const rngResult = rng.rotCompatible().shuffle(arr);
      expect(rngResult).not.toEqual(arr);
      expect(rngResult.sort()).toEqual(arr.sort());

      const rotResult = rot.shuffle(arr);
      expect(rotResult).not.toEqual(arr);
      expect(rotResult.sort()).toEqual(arr.sort());
    });

    test('getWeightedValue', () => {
      const v = { a: 100000000000000, b: 1 };
      const rngResult = rng.rotCompatible().getWeightedValue(v);
      expect(rngResult).toBe('a');

      const rotResult = rot.getWeightedValue(v);
      expect(rotResult).toBe('a');
    });

    test('getState', () => {
      expect(() => {
        rng.rotCompatible().getState();
        rot.getState();
      }).not.toThrow();
    });

    test('get/setState works as expected', () => {
      const newRng = new Rng();
      const state = newRng.rotCompatible().getState();
      rng.rotCompatible().setState(state);
      const rngResult = rng.rotCompatible().getState();
      expect(rngResult).toEqual(state);

      const rot1 = new RotRng();
      const rot2 = new RotRng();
      rot2.setState(rot1.getState());
      expect(rot1.getState()).toEqual(rot2.getState());
    });

    test('clone', () => {
      const rc = rng.rotCompatible();
      const rngResult = rc.clone();
      expect(rngResult).not.toBe(rc);
      expect(rngResult.getState()).toEqual(rc.getState());

      const rotResult = rot.clone();
      expect(rotResult).not.toBe(rot);
      expect(rotResult.getState()).toEqual(rot.getState());
    });
  });
});
