import Rng from '../src/rng';

test('named streams are unaffected by parent draw count and other streams', () => {
  const root = new Rng('world');
  const loot = root.fork('loot');
  const expected = Array.from({ length: 20 }, () => loot.random());
  for (let i = 0; i < 100; i++) { root.random(); root.fork('cosmetics').random(); }
  expect(Array.from({ length: 20 }, () => root.fork('loot').random())).not.toEqual(expected);
  const replay = root.fork('loot');
  expect(Array.from({ length: 20 }, () => replay.random())).toEqual(expected);
  expect(root.fork('combat').random()).not.toBe(expected[0]);
});

test('save/restore and cloning preserve stream origins after draws', () => {
  const root = new Rng(123);
  root.random();
  const saved = root.serialize();
  const restored = Rng.unserialize(saved);
  expect(restored.random()).toBe(root.random());
  expect(restored.fork('loot').random()).toBe(root.fork('loot').random());
  expect(new Rng().from(root).fork('loot').random()).toBe(root.fork('loot').random());
  root.seed(456);
  expect(root.fork('loot').random()).toBe(new Rng(456).fork('loot').random());
});

test('creating a stream does not advance the parent and labels are validated', () => {
  const root = new Rng(123);
  const before = root.serialize();
  root.fork('loot').fork('rare');
  expect(root.serialize()).toEqual(before);
  expect(() => root.fork('')).toThrow();
});
