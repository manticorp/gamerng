# GameRNG - a Game Focussed RNG

This is a random number generator that is:

🏎️ highly performant  
🌱 seedable  
📅 serializable  
⚡flexible input (Chancy!!)  
⌨️ written in TypeScript

And more!

# Installation

Run ```npm install @manticorp/ultraloot``` or include the dist file in browser.

## Browser

Download release and include ultraloot in browser:

```html
<script src="https://unpkg.com/@manticorp/gamerng@latest/dist/gamerng.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@manticorp/gamerng/dist/gamerng.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/gh/manticorp/gamerng@latest/dist/gamerng.min.js"></script>
<! -- or -- >
<script src="dist/gamerng.js"></script>
<script>
  const rng = new GameRng();
  rng.random();
</script>
```

## Node

```ts
const { GameRng } = require('@manticorp/gamerng');
```

## ES Module

```ts
import GameRng from '@manticorp/gamerng';
```

# Usage

## Instantiate

```ts
const rng = new GameRng();

// or with a seed
const mySeed = 'hellothere';
const rng = new GameRng(mySeed);

// seeds can be strings or numbers
const rng = new GameRng(77618576514768);

// you can also seed afterward
const rng = new GameRng();
rng.seed(12345);

// Or call a predictable method statically, or on an instance
const rng1 = new GameRng();
const rng2 = GameRng.predictable(12345);
const rng3 = rng1.predictable(12345);

assert(rng2.getSeed() === rng3.getSeed()); // true
```

## Generate a random number

```ts
const rng = new GameRng('my_seed');

rng.random(); // A uniform random float between [0, 1)
rng.random(0, 10); // A uniform random float between [0, 10)
rng.randInt(0, 10); // A uniform random integer between [0, 10)

rng.normal({ mean: 5, stddev: 1 }); // A normally distributed random float with a mean of 5 and a standard deviation of 1
rng.normal({ min: 0, max: 10 }); // A normally distributed random float with a minimum value of 0 and a maximum value of 10

rng.dice('2d6+10'); // A dice roll of 2 x d6 + 10
rng.diceExpanded('2d6+10'); // returns the following: { dice: [3, 6], plus: 10, total: 19 }

rng.choice([1, 2, 3]); // A random choice from an array, e.g. 2
```

## Chancy

The special ```chancy``` function takes a broad range of inputs.

```ts
rng.chancy(5); // Always returns 5
rng.chancy({min: 1, max: 10}); // Random number between [1, 10), e.g. 2.71828
rng.chancy({min: 5, max: 50, type: 'integer', skew: -1}); // Random uniform integer between [5, 50] with a skew to the left / lower numbers, e.g. 10
rng.chancy({type: 'normal', mean: 0, stddev: 1}); // Random normally distributed integer around 0 with a stddev of 1
rng.chancy('2d10+1'); // Rolls the dice string, e.g. 17
rng.chancy([1, 3, 5, 7, 9]); // Picks a random number from the list, e.g. 5
rng.chancy(['a', 'b', 'c']); // Picks a random element from the list (note: this is the only way chancy will not return a number...), e.g. 'a'
```

You can easily use the calling interface anywhere you might want a randomised number with highly flexible input.

There is also a second function called ```chancyInt``` which always returns an integer. Usually uses ```Math.round``` to round things:

```ts
rng.chancyInt(5.3); // Always returns 5
rng.chancyInt({min: 1, max: 10}); // Random number between [1, 10)
rng.chancyInt({min: 5, max: 50, type: 'integer', skew: -1}); // Random uniform integer between [5, 50] with a skew to the left / lower numbers
rng.chancyInt('2d10+0.5'); // e.g. 17
rng.chancyInt([1.1, 3.3, 5.5, 7.7, 9.9]); // e.g 3 or 8
rng.chancyInt(['a', 'b', 'c']); // Will throw an Error
```

# Full Documentation

See the [full docs](https://manticorp.github.io/gamerng) for more information.

[Code docs](https://manticorp.github.io/gamerng/code)    
[Examples](https://manticorp.github.io/gamerng/examples)
