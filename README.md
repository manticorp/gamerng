# GameRNG – a Game‑Focused RNG

GameRNG is a **TypeScript-first**, game‑oriented random number generator designed to be:

- 🏎️ **highly performant**
- 🌱 **seedable** and reproducible
- 📅 **serializable** (save & restore state)
- ⚡ **flexible in input** (via the `chancy` API)
- ⌨️ **written in TypeScript** with rich types

It’s built with **🤸‍♂️ extreme flexibility 🤸‍♂️** in mind: from simple dice rolls to advanced probability distributions, pools, and deterministic test runs.

---

## Why GameRNG?

JavaScript’s built‑in `Math.random()` is:

- not seedable or reproducible by default,
- not easily serializable,
- and has no opinionated support for game‑style constructs (dice, loot tables, encounter tables, etc.).

GameRNG is focused on game and simulation use‑cases:

- **Deterministic runs** – seed once and get the same sequence across sessions, machines, and tests.
- **Game‑native primitives** – dice strings (e.g. `3d6+1`), weighted choices, pools without replacement.
- **Distribution‑aware** – easily get normal, Poisson, Beta, and many other distributions without reimplementing math.
- **Config‑driven randomness** – the `chancy` interface lets you describe randomness in JSON or data files, not scattered across code.
- **Testable** – `PredictableRng` and `GameRng.predictable` make tests deterministic and debuggable.

If you’re building:

- roguelikes,
- loot tables,
- procedural levels,
- AI behaviour with randomness,
- or simulations with reproducibility,

GameRNG is meant to be your “game‑native” RNG.

---

## Features at a Glance

- **Core RNG**
  - Uniform floats: `rng.random()`, `rng.random(min, max, skew?)`
  - Uniform ints: `rng.randInt(min?, max?, skew?)`
  - Normal/Gaussian: `rng.normal({ mean, stddev, min?, max?, skew? })`
- **Distributions**
  - Irwin‑Hall, Bates, Bates Gaussian
  - Bernoulli, Exponential, Pareto, Poisson, Hypergeometric
  - Rademacher, Binomial, Beta‑Binomial, Beta, Gamma
  - Wigner semicircle, Kumaraswamy, Hermite
  - Chi‑Squared, Rayleigh, Log‑Normal, Cauchy, Laplace, Logistic
- **Game utilities**
  - Dice: `rng.dice('2d6+7')`, `rng.diceExpanded('2d6+7')`
  - Choice & weighted choice: `rng.choice`, `rng.weightedChoice`
  - Shuffling: `rng.shuffle`
  - Pools (without replacement): `rng.pool([...])`
  - Chance helpers: `rng.chance`, `rng.chanceTo`
- **Chancy – unified interface**
  - `rng.chancy(...)` and `rng.chancyInt(...)` accept:
    - numbers, dice strings, arrays, or rich config objects
- **State & testing**
  - Seeding with strings or numbers
  - `GameRng.predictable` and `PredictableRng` for deterministic tests
  - `rng.serialize()` / `GameRng.unserialize(...)`
- **Utilities**
  - Binning, clamping, dice parsing, scaling, unique IDs/strings
  - Typed helpers & error types for robust validation

---

## Installation

```bash
npm install @manticorp/gamerng
# or
yarn add @manticorp/gamerng
```

Or use a prebuilt bundle in the browser.

### Browser

Include a UMD bundle from a CDN or from your own build:

```html
<script src="https://unpkg.com/@manticorp/gamerng@latest/dist/gamerng.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@manticorp/gamerng/dist/gamerng.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/gh/manticorp/gamerng@latest/dist/gamerng.min.js"></script>
<!-- or (self-hosted build) -->
<script src="dist/gamerng.js"></script>

<script>
  const rng = new GameRng();
  rng.random();
</script>
```

### Node (CommonJS)

```ts
const { GameRng } = require('@manticorp/gamerng');

const rng = new GameRng('my_seed');
console.log(rng.random());
```

### ES Module

```ts
import GameRng from '@manticorp/gamerng';

const rng = new GameRng(12345);
console.log(rng.randInt(1, 6));
```

---

## Quick Start

### Instantiate and seed

```ts
import GameRng from '@manticorp/gamerng';

// Default seed (non-deterministic)
const rng = new GameRng();

// String seed
const rngFromString = new GameRng('hellothere');

// Numeric seed
const rngFromNumber = new GameRng(77618576514768);

// Seed later
rng.seed(12345);

// Predictable RNG from a seed
const rng1 = new GameRng();
const rng2 = GameRng.predictable(12345);
const rng3 = rng1.predictable(12345);

console.assert(rng2.getSeed() === rng3.getSeed()); // true
```

### Core random numbers

```ts
const rng = new GameRng('my_seed');

// Uniform floats
rng.random();        // [0, 1)
rng.random(0, 10);   // [0, 10)

// Uniform integers
rng.randInt();       // default integer range
rng.randInt(0, 10);  // integer between [0, 10]

// Normal / Gaussian
rng.normal({ mean: 5, stddev: 1 });
rng.normal({ min: 0, max: 10, skew: -1 }); // clamped + skewed
```

### Dice and choices

```ts
// Dice rolls
rng.dice('2d6+10');        // e.g. 19
rng.diceExpanded('2d6+10'); // { dice: [3, 6], plus: 10, total: 19 }

// Random selection
rng.choice([1, 2, 3]); // e.g. 2
rng.weightedChoice({ a: 1, b: 2, c: 3 }); // c more likely than a
rng.shuffle(['a', 'b', 'c']); // random permutation
```

---

## Chancy – Flexible Random Input

The special `chancy` function accepts many input forms and returns a random result that matches those semantics. This makes it easy to:

- **Serialize** random behaviour into JSON config files.
- **Explain** and tweak random behaviours without sprinkling logic everywhere.

```ts
const rng = new GameRng();

// Literal number
rng.chancy(5); // always 5

// Uniform range
rng.chancy({ min: 1, max: 10 }); // float in [1, 10)

// Skewed integer
rng.chancy({ min: 5, max: 50, type: 'integer', skew: -1 });

// Normal distribution
rng.chancy({ type: 'normal', mean: 0, stddev: 1 });

// Dice string
rng.chancy('2d10+1');

// From an array
rng.chancy([1, 3, 5, 7, 9]);
rng.chancy(['a', 'b', 'c']); // only case where chancy returns non‑numeric
```

There is also `chancyInt`, which guarantees an integer result:

```ts
rng.chancyInt(5.3); // 5
rng.chancyInt({ min: 1, max: 10 });
rng.chancyInt('2d10+0.5');
rng.chancyInt([1.1, 3.3, 5.5]); // rounds internally
rng.chancyInt(['a', 'b', 'c']); // throws an Error
```

---

## Recipes

Below are some common patterns you can directly lift into your game or simulation.

### 1. Loot tables

Define a loot table as a weighted map or object and draw loot using `weightedChoice`:

```ts
const rng = new GameRng();

// Simple object-based loot table
const loot = rng.weightedChoice({
  'gold_coin': 50,
  'healing_potion': 10,
  'rare_gem': 3,
  'legendary_sword': 1,
});

// Map-based loot table with richer payloads
const lootTable = new Map();
lootTable.set({ id: 'gold', min: 10, max: 100 }, 50);
lootTable.set({ id: 'potion', type: 'healing' }, 10);
lootTable.set({ id: 'gem', rarity: 'rare' }, 3);
lootTable.set({ id: 'sword', rarity: 'legendary' }, 1);

const drop = rng.weightedChoice(lootTable);
```

Combine with `chancy` to have quantities in data:

```ts
const lootConfig = {
  id: 'gold',
  amount: { min: 10, max: 100, type: 'integer' } // chancy-compatible
};

const amount = rng.chancyInt(lootConfig.amount);
```

---

### 2. Encounter tables / difficulty scaling

Use weighted choices to bias encounters and `normal` for soft difficulty bands:

```ts
const rng = new GameRng();

const encounter = rng.weightedChoice({
  'easy_slime': 5,
  'goblin': 3,
  'orc': 2,
  'dragon': 0.1, // almost never
});

// Enemy level around playerLevel with some spread
function enemyLevel(playerLevel: number) {
  return Math.round(
    rng.normal({ mean: playerLevel, stddev: 1.5, min: 1, skew: 0.2 })
  );
}
```

---

### 3. Procedural map parameters

Use distributions to generate more “natural” looking parameters:

```ts
const rng = new GameRng();

function generateRoom() {
  return {
    width: rng.randInt(3, 10, 0.2),
    height: rng.randInt(3, 10, 0.2),
    treasureDensity: rng.normal({ mean: 0.2, stddev: 0.05, min: 0, max: 0.5 }),
    enemyCount: rng.poisson({ lambda: 2 }), // via distributions API
  };
}
```

(See the distributions docs for the exact call signatures.)

---

### 4. Pools without replacement (cards, limited draws)

Use `pool` when you want each element to be drawn at most once:

```ts
const rng = new GameRng();

const deck = rng.pool(['AH', 'KH', 'QH', 'JH', '10H']);

deck.draw(); // e.g. "QH"
deck.drawMany(2); // e.g. ["10H", "AH"]
deck.isEmpty();   // false/true

// Refill or extend pool
deck.push('Joker');
```

---

### 5. Deterministic replays / save files

Serialize the RNG together with your game state:

```ts
const rng = new GameRng('initial_seed');

// ... run a bunch of game logic
rng.random();
rng.dice('2d6+1');
// etc

// Save
const saveData = {
  rng: rng.serialize(),
  // ...your own game state
};

// Later / on another machine
const restoredRng = GameRng.unserialize(saveData.rng);
// restoredRng will continue where rng left off
```

---

## Serialization

You can serialize and restore RNG state, which is useful for:

- Saving game sessions
- Replays and deterministic debugging

```ts
const rng = new GameRng('my_seed');
rng.random(); // advance state

const serialized = rng.serialize();
const restored = GameRng.unserialize(serialized);

console.assert(rng.sameAs(restored));               // true
console.assert(rng.random() === restored.random()); // true
```

The serialized form is a plain JavaScript object and can safely be stored as JSON.

---

## Documentation

The README is intentionally high‑level. For full API details and more examples, see:

- [Full docs](https://manticorp.github.io/gamerng)
- [Code docs](https://manticorp.github.io/gamerng/code)
- [Examples](https://manticorp.github.io/gamerng/examples)

---

## License

[MIT](LICENSE)
## Development and reproducibility

Run `npm ci` and `npm run check` to validate the library, including packed ESM/CommonJS imports, NodeNext declarations, and the browser bundle. PR checks run on Node 22 and 24. `npm run benchmark` records repeatable local measurements after building.

The uniform seeded sequence is unchanged by the sampling fixes. Gamma, Beta, Beta-binomial, Student t and Wigner outputs are corrected, so derived outcomes and RNG consumption can differ from older releases. Serialized state records the derived sampler revision in `samplingVersion`; see [CHANGELOG.md](CHANGELOG.md) for compatibility details.

## Named streams

```ts
const world = new GameRng('world-01');
const loot = world.fork('loot');
const combat = world.fork('combat');
const cosmetics = world.fork('cosmetics');
cosmetics.random(); // does not advance loot, combat, or world
loot.dice('2d6');
```

`fork(label)` creates a fresh stream at the start of that label's sequence. It does not consume the parent. Labels must be non-empty strings, are case-sensitive, and can be nested with another `fork`. Parent draw count and the order in which labels are requested do not change a stream. Keep the returned child to advance it; calling `fork('loot')` again restarts that child sequence.

New saves include `streamSeed`, preserving the fork origin as well as the current uniform state. `seed()`/`setSeed()` reset that origin; save/restore, `from()`, and ROT state cloning retain it. Old saves without `streamSeed` use the saved current seed as their fork origin because the original seed is unavailable. The existing uniform engine and golden sequences are unchanged. Named streams isolate game systems; this 32-bit engine does not promise collision-free labels or cryptographic independence.

Boundary tests now generate queue windows, weights, and invalid numeric inputs with fixed replayable fast-check seeds. Non-finite seeds/results and fractional pool draw counts are rejected before mutation. Predictable RNG input arrays and returned result arrays are snapshots.

Release verification and npm trusted-publisher setup are documented in [SECURITY.md](SECURITY.md).
