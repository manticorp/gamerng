# GameRNG - a Game Focussed RNG

This is a random number generator that is:

🏎️ highly performant  
🌱 seedable  
📅 serializable  
⚡flexible input (Chancy!!)  
⌨️ Typescript typed

And more!

## Installation

Run ```npm install @manticorp/ultraloot``` or include the dist file in browser.

### Browser

Download release and include ultraloot in browser:

```html
<script src="dist/gamerng.js"></script>
<script>
  const rng = new GameRng();
  rng.random();
</script>
```

### Node

```ts
const { GameRng } = require('@manticorp/gamerng');
```

### ES Module

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

assert(rng1.getSeed() !== rng2.getSeed());
assert(rng1.getSeed() !== rng3.getSeed());
assert(rng2.getSeed() === rng3.getSeed());
```

## Seeding

You can seed with a ```string``` or a ```number``` type:

```ts
const rngFromString = new GameRng('my_seed');
const rngFromNumber = new GameRng(123456);
```

However, internally, strings are transformed to numbers, so your seed is not going to be recoverable:

```ts
const rngFromString = new GameRng('my_seed');

assert(rngFromString.getSeed() === 'my_seed'); // false
```

You can also supply a new randomness source function to the RNG that completely bypasses the built in pRNG:

```ts
rng.randomSource(() => 0.5);
rng.randomSource(Math.random);
rng.randomSource(() => Math.pow(Math.random(), 2));
```

This can be useful for testing.

Note that the function really should return a number in the range of [0, 1) (that is, 0 inclusive, 1 exclusive) otherwise a lot of the resulting functionality will break.

To return it back to normal, simply call without an argument, or null:

```ts
rng.randomSource();
rng.randomSource(null);
```

# Random Number Generation

## Generate Random Uniform Floats

```ts
const rng = new GameRng();

// floats
const myRand       = rng.random(); // Gives numbers between [0, 1)
const percent1     = rng.random(0, 100); // Gives numbers between [0, 100)

const percent2     = rng.percent(); // equivalent to rng.random(0, 100)
const probability  = rng.probability(); // equivalent to rng.random(0, 1)

const middle       = rng.randBetween(10, 90);
```

You can also skew these uniform numbers:

```ts
const percentleft  = rng.random(0, 100, -1); // Gives numbers between [0, 100), skewed to the left
const percentright = rng.random(0, 100, +1); // Gives numbers between [0, 100), skewed to the right
```

## Generate Random Uniform Integers

```ts
// integers
const myRandInt = rng.randInt();
const aRandomIntInTheMiddle = rng.randInt(10, 90);

```

You can also skew these uniform numbers:

```ts
const percentleft  = rng.randInt(0, 100, -1); // Gives integers between [0, 100), skewed to the left
const percentright = rng.randInt(0, 100, +1); // Gives integers between [0, 100), skewed to the right
```

## Rolling Dice

You can simulate dice rolls easily:

```ts
rng.dice('1d6'); // Integer between [1, 6]
rng.dice('1d6+2'); // Integer between [3, 8]
rng.dice('3d10-1'); // Integer between [2, 29]
```

You can also supply params

```ts
// These are all equivalent and return an integer between [2, 7]
rng.dice('1d6+1');
rng.dice({ n: 1, d: 6, plus: 1 }); // object with names
rng.dice(1, 6, 1); // regular params n, d and plus
rng.dice([1, 6, 1]); // array of values
```

Dice also supports rolling _negative_ numbers of dice:

```ts
rng.dice('-1d6+1'); // number beteween -5 and 0.
```

If you want the details of each roll of the dice, then you can call ```diceExpanded```:

```ts
rng.diceExpanded('3d6+2'); // returns the following: { dice: [3, 6, 1], plus: 2, total: 12 }
```

## Generate Numbers According to a Distribution

GameRng provides several different ways of generating random numbers according to different distributions.

Please see [the distributions examples](https://manticorp.github.io/gamerng/distributions.html) for visual examples of each of the different distributions and their call signatures.

### Normally distributed numbers

You can generate normally distributed numbers using the ```normal``` function:

```ts
rng.normal({mean: 0.5, stddev: 0.1});
```

Alongside the proper normally distributed numbers, ```rng.normal``` accepts some other useful parameters, although this strays away from strictly normally/gaussian distributed numbers:

```ts
rng.normal({
  mean: 0,   // The center of the distribution. Note this may now be the true mean if skew is also specified - it is the pre-skewed mean.
  stddev: 1, // The width of the bell shape of the curve, i.e. how variable the data is.
  min: -10,  // The minimum value (inclusive) we can take.
  max: 10,   // The maximum value (inclusive) we can take.
  skew: 0,   // Which direction to skew the data. Positive numbers are to the right/higher, negative to the left/lower. Start with +/-1 and work your way from there!
});
```

A good example for game use is:

```ts
rng.normal({min: 1, max: 10, skew: -1});
```

this will generate numbers with a strict maximum of 10, and minimum of 1, with a skew towards lower numbers. This could be used, for example, for setting HP or Loot levels.

Note that calling normal with just the ```mean``` and/or ```stddev``` parameters generates truly normally/gaussian distributed numbers from a mathematical standpoint. The other parameters are included simply as convenience for game use.

### Other Distributions

There are many other distributions available - but to prevent bloating the main README, these are detailed in [DISTRIBUTIONS](DISTRIBUTIONS.md).

# Chancy

The chancy function is a highly flexible interface for generating random numbers.

Why? Why not just use the built in random functions?

Chancy gives you a huge advantage that the parameters that are passed to the function are easily serialized and understood, and you can pass in lots of different types random number to generate.

```ts
rng.chancy(5); // Always returns 5
rng.chancy({min: 1, max: 10}); // Random number between [1, 10), e.g. 2.71828
rng.chancy({min: 5, max: 50, type: 'integer', skew: -1}); // Random uniform integer between [5, 50] with a skew to the left / lower numbers, e.g. 10
rng.chancy('2d10+1'); // Rolls the dice string, e.g. 17
rng.chancy([1, 3, 5, 7, 9]); // Picks a random number from the list, e.g. 5
rng.chancy(['a', 'b', 'c']); // Picks a random element from the list (note: this is the only way chancy will not return a number...), e.g. 'a'
```

You can easily use the interface anywhere you might want a randomised number.

There is also a second function called ```chancyInt``` which always returns an integer. Usually uses ```Math.round``` to round things:

```ts
rng.chancyInt(5.3); // Always returns 5
rng.chancyInt({min: 1, max: 10}); // Random number between [1, 10)
rng.chancyInt({min: 5, max: 50, type: 'integer', skew: -1}); // Random uniform integer between [5, 50] with a skew to the left / lower numbers
rng.chancyInt('2d10+0.5'); // e.g. 17
rng.chancyInt([1.1, 3.3, 5.5, 7.7, 9.9]); // e.g 3
rng.chancyInt(['a', 'b', 'c']); // Will throw an Error
```

## Ways of Calling Chancy

### Number

Calling Chancy with a number just returns that number

```ts
rng.chancy(5); // always returns 5
rng.chancy(3.141); // always returns 3.141
rng.chancyInt(5.1); // always returns 5
rng.chancyInt(4.9); // always returns 5
```

### Dice string

Works the same as calling ```rng.dice()```.

```ts
rng.chancy('1d6');
rng.chancy('1d10+0.5'); // rolls a d10 and adds 0.5
rng.chancyInt('1d10+0.5'); // rols a d10 and adds 0.5 then rounds the answer
```

### Array

Works the same as calling ```rng.choice()``` with an array.

```ts
rng.chancy([1, 2, 3, 4, 5]); // returns one of 1, 2, 3, 4 or 5
rng.chancy(['a', 'b', 'c']); // returns one of 'a', 'b' or 'c'
rng.chancyInt([1.1, 2.2, 3.3, 4.4, 5.5]); // returns one of 1, 2, 3, 4 or 6
rng.chancyInt(['a', 'b', 'c']); // Throws an Error
```

### Object

You can pass chancy an object specifying certain random parameters.

There is an interface for this object called [```ChancyInterface```](types/ChancyInterface.html) which, if you need to use in your TypeScript code, you can import using:

```ts
import { ChancyInterface } from '@manticorp/gamerng';
const args : ChancyInterface = { type: 'normal', min: 0, max: 1 };
```

Supported parameters are:

```ts
type ChancyInterface = {
  type?: string, // name of a distribution - must be valid from a given list
  min?: number,  // always available
  max?: number,  // always available
  ...otherArgs,  // The relevant args for the distribution named above, all optional
}
```

Common ways of using it are:

```ts
// Generate a uniformly distributed float between 1 and 10 inclusive.
// Equivalent to calling rng.random(1, 10)
rng.chancy({ min: 1, max: 10 }); // type: 'random' is default
rng.chancy({ type: 'random', min: 1, max: 10 });

// Generate a normally distributed float between 1 and 10 inclusive.
// Equivalent to calling rng.normal({min: 1, max: 10})
rng.chancy({ type: 'normal', min: 1, max: 10 });

// Generate a uniformly distributed integer between 1 and 10 inclusive.
// Equivalent to calling rng.randInt(1, 10)
rng.chancy({ type: 'integer', min: 1, max: 10 });

// Generate a normally distributed integer between 1 and 10 inclusive.
// Equivalent to calling Math.floor(rng.normal({min: 1, max: 10}))
rng.chancy({ type: 'normal_integer', min: 1, max: 10 });
```

See [```ChancyInterface```](https://manticorp.github.io/gamerng/code/types/ChancyInterface.html) for all of the possible ways of specifying this parameter, including access to every single different distribution.

## Chancy Implementation Example

Let's say you have your monster definitions in JSON file ```monsters.json```:

```json
[
  {
    "id": "goblin",
    "hp": {"min": 1, "max": 5},
    "attack": "1d6+1"
  },
  {
    "id": "orc",
    "hp": {"min": 10, "max": 20, "type": "normal"},
    "attack": "1d10+2"
  },
  {
    "id": "troll",
    "hp": {"min": 20, "max": 60, "type": "normal", "skew": 1},
    "attack": "3d6-1"
  },
  {
    "id": "big_boss",
    "hp": 80,
    "attack": {"min": 5, "max": 25, "stddev": 3, "type": "normal", "skew": 0.5}
  }
]
```

You could define a monster factory thusly:

```ts
const rng = new GameRng();

function monsterFactory (def) {
  return new Monster({
    id: def.id,
    hp: rng.chancyInt(def.hp),
    attack: def.attack
  });
}

function damage(monster) {
  return rng.chancy(monster.attack);
}

const monsterDict = await fetch('monsters.json')
  .then(a => a.json())
  .then(arr => arr.reduce((obj, item) => (obj[item.id] = item, obj), {})); // maps an array by subitem's id

const goblin = monsterFactory (monsterDict.goblin);
const orc = monsterFactory (monsterDict.orc);
const troll = monsterFactory (monsterDict.troll);
const boss = monsterFactory (monsterDict.big_boss);

damage(goblin); // a roll on 1d6+1
damage(orc);    // a roll on 1d10+2
damage(troll);  // a roll on 3d6-1
damage(boss);   // hits hard!!
```

You can find this working example in the [examples folder](../examples).

# Random Chance Results

You can ask the rng to give you a boolean depending on a chance. There are two methods for this, ```chance``` and ```chanceTo```

```ts
rng.chance(1, 50); // 1 in 50 chance
rng.chanceTo(50, 1); // 50 to 1 chance (equivalent to rng.chance(1, 51))
```

# Random / Weighted Choice

You can get a weighted or random choice from an array, object or Map:

```ts
rng.choice(['a', 'b', 'c']); // Random choice from this array
rng.weightedChoice({
  a: 1,
  b: 2,
  c: 3,
  d: 4
}); // Returns 'a' 1/10 of the time, 'b' 2/10 of the time, 'c' 3/10 of the time, and 'd' 4/10 of the time
```

Using a Map allows you to have _anything_ as a key, but takes the same pattern as an object being passed.

See [the MDN page on Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) for more info on their usage.

You can use functions, objects, or any primitive as a key. This makes them _super_ flexible:

```ts
const monsterSpawner = new Map();
monsterSpawner.set(() => new Monster('hard'), 1);
monsterSpawner.set(() => new Monster('medium'), 2);
monsterSpawner.set(() => new Monster('easy'), 4);

// Returns a random Monster factory from monsterSpawner, skewing towards easier monsters
const monster = rng.weightedChoice(monsterSpawner)();
```

## Pools

You can generate "pools" that take options out without replenishment.

```ts
const pool = rng.pool(['a', 'b', 'c']);

pool.isEmpty(); // false
pool.length; // 3

pool.draw(); // random choice, e.g. 'b'
pool.draw(); // random choice, e.g. 'c'
pool.draw(); // random choice, e.g. 'a'

pool.isEmpty(); // true
pool.length; // 0
pool.draw(); // PoolEmptyError
```

You can re-add entries, and draw many:

```ts
const pool = rng.pool(['a', 'b', 'c']);
pool.push('d');

pool.length; // 4

pool.drawMany(3); // e.g. ['a', 'd', 'b']

pool.length; // 1
```

# Result "Prediction"

You can easily get the minimum or maximum results that you can expect from a ```dice``` or ```chancy``` call by calling the following functions:

```ts
rng.chancyMax({min: 1, max: 10, skew: -1}); // 1
rng.diceMax('1d6'); // 1
rng.chancyMin([1, 2, 3, 4]); // 1
rng.diceMin('4d6-3'); // 1
```

## Distribution Results Ranges

There is a special method called ```support``` that, if you give it the name of a distribution function, will give you a string showing the range its output can take.

```ts
rng.support('normal');           // returns "(-INF, INF) or (input.min, input.max)"
rng.support('bates');            // returns "[0, 1]"
rng.support('beta');             // returns "(0, 1)",
rng.support('gaussian');         // returns "(-INF, INF)"
rng.support('hypergeometric');   // returns "{max(0, n+K-N), ..., min(n, K)}"
rng.support('wignerSemicircle'); // returns "[-R; +R]"
```

# Serialization and Unserialization

You can easily serialize and unserialize the Rng for the purposes of storage:

```ts
const rng = new GameRng('my_seed');

rng.random();

const serialized = rng.serialize();
const unserialized = GameRng.unserialize(serialized);

assert(rng.sameAs(unserialized)); // true
assert(rng.random() === unserialized.random()); // true
```

The resulting serialized object is a simple javascript object which can be stored and retrieved as JSON.

# Other Utilities

## Result Binning

If you need to bin some results, you can do so:

```ts
const ourValue = 24.56;
const numBins = 101;
const min = 0;
const max = 100;
rng.bin(ourValue, numBins, min, max); // 25
rng.bin(12.2, numBins, min, max); // 12
```

## Clamping numbers

A simple clamping function

```ts
rng.clamp(3.141, 2, 5); // 3.141
rng.clamp(3.141, 4, 5); // 4
rng.clamp(3.141, 0, 1); // 1
```

## Parsing a Dice String

Takes a dice string and returns an object:

```ts
rng.parseDiceString('2d6+1'); // returns { n: 2, d: 6, plus: 1 }
rng.parseDiceString('d10'); // returns { n: 1, d: 10, plus: 0 }
rng.parseDiceString('6'); // returns { n: 0, d: 0, plus: 6 }
```

## Scaling / Linear Interpolation

Takes a number and scales it from one scale to another:

```ts

rng.scale(value, newFrom, newTo, oldFrom, oldTo);

rng.scale(5, 0, 1, 0, 10); // 0.5
rng.scale(0.5, 0, 100, 0, 1); // 50

// Scale norm is like having oldFrom = 0, oldTo = 1
rng.scaleNorm(0.5, 0, 100); // 50
```

## Unique ID / String

There are two string generating functions.

### Uniqid

Returns a unique ID, useful for using in object IDs, with an optional prefix - should be highly collision resistant up to 1000 / second:

```ts
rng.uniqid(); // 6257a96a97213c
rng.uniqid('my_prefix_'); // my_prefix_6257a97a3f6120
```

Uniqid also generates strictly incrementing strings, useful for datetime sorting.

### Uniqstr

Generates a random string of known length:

```ts
rng.randomString(50); // "H7SMm8FnQkKJhIb0R5k6dQXiZ9w6k7Y43tcAkfAVR9CryjuQ7i"
rng.randomString(10); // "2nglrfIzBw"
rng.randomString(2);  // "dQ"
```

The strings are alphanumeric and come from an alphabet of the letters a-z, A-Z and numbers 0-9, i.e.:

```ts
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
```

## Calculate Weightings

Calculates the final weights given an array of values, and returns a map:

```ts
const weights = rng.weights(['a', 'b', 'c', 'a']);

assert(weights['a'] === 2); // true
assert(weights['b'] === 1); // true
assert(weights['c'] === 1); // true
```

# Additional Classes / Imports

## Node

```javascript
import {
  ArrayNumberValidator,
  MaxRecursionsError,
  NonRandomRandomError,
  NumberValidationError,
  NumberValidator,
  Pool,
  PoolEmptyError,
  PoolNotEnoughElementsError,
  PredictableRng,
  Rng,
  RngAbstract,
  validateNumber
} from '@manticorp/gamerng';
```

This may be handy in, for example, validation handling errors:

```javascript
import { NumberValidationError, MaxRecursionsError } from '@manticorp/gamerng';

try {
  rng.chancy({type: 'bates', n: -1});
} catch (e) {
  if (e instanceof NumberValidationError) {
    // handle it, show error to user for example
  } else if (e instanceof MaxRecursionsError) {
    // Aha... maybe adjust parameters slightly?
  } else {
    throw e;
  }
}
```

Or when dealing with pools:

```javascript
import { PoolEmptyError } from '@manticorp/gamerng';

const myPool = rng.pool(['a', 'b', 'c']);

// ... inside some other code

try {
  myPool.draw();
} catch (e) {
  if (e instanceof PoolEmptyError) {
    // oh well, pool is empty, fun is over
  } else {
    throw e;
  }
}
```

### validateNumber

A handy exposition of the number validation inside GameRng:

```javascript
validateNumber(5).lt(6);
validateNumber(5).lt(4); // NumberValidationError('Expected number to be less than 4, got 5');

const dogs = 99;
validateNumber(dogs).gt(100); // NumberValidationError('Expected number to be greater than 100, got 99');
validateNumber(dogs).varName('dogs').gt(100); // NumberValidationError('Expected dogs to be greater than 100, got 99');

// Passing an object takes the object key as the variable name
const myVar = 10;
validateNumber({ myVar }).lt(4); // NumberValidationError('Expected myVar to be less than 4, got 10');
```

See [the code docs for more information and examples](functions/index.validateNumber.html).

### PredictableRng

This is a special RNG that allows you to put in some predictable result set that gets looped over in order:

```javascript
import { PredictableRng } from '@manticorp/gamerng';

const rng = new PredictableRng();
rng.results = [0.1, 0.2, 0.3];

rng.random(); // 0.1
rng.random(); // 0.2
rng.random(); // 0.3
rng.random(); // 0.1

rng.setEvenSpread(5); // sets an (almost) even spread between [0, 1) in "n" chunks

rng.random(); // 0.0
rng.random(); // 0.25
rng.random(); // 0.50
rng.random(); // 0.75
rng.random(); // 0.9999999....
rng.random(); // 0.0
rng.random(); // 0.25

// When doing it using setEvenSpread, the last number will always be 1 - Number.EPSILON (the largest number < 1 on the javascript platform).
```

This provides an easy way of testing code - just substitute in your ```GameRng``` instance for ```PredictableRng``` - they use exactly the same interfaces.

## TypeScript

If you're using typescript, you may find it useful to import some interfaces.

The following _additional_ types/interfaces are available:

```ts
import {
  Chancy,          // any valid chancy input
  ChancyInterface, // objects of the form {type : string, ...params}
  ChancyNumeric,   // any chancy input that can lead to numeric results only (everything except arbitrary arrays basically)
  DiceInterface,
  DiceReturnInterface,
  Distribution,
  Randfunc,
  RngConstructor,
  RngDistributionsInterface,
  RngInterface,
  Seed,
  SerializedRng
} from '@manticorp/gamerng';
```

Example:

```ts
import { Rng, RngInterface, Chancy, ChancyNumeric } from '@manticorp/gamerng';

class Monster {
  id: string;
  name: string;
  rng: RngInterface;
  hp: number = 0;
  attack: ChancyNumeric = '1d6';

  constructor ({id, name, rng, hp, attack} : {id: string, name?: string, rng: RngInterface, hp: ChancyNumeric, attack: ChancyNumeric}) {
    this.id = id;
    this.rng = rng;
    this.hp = rng.chancy(hp);
    this.attack = attack;
    this.name = name ?? this.id;
  }

  damage (): number {
    return this.rng.chancy(this.attack);
  }
}

const rng = new Rng();

const goblin = new Monster({
  id: 'goblin',
  name: 'Geoff',
  rng,
  hp: '4d3+1',
  attack: '10d6'
});

console.log(`${goblin.id} ${goblin.name} attacks you for ${goblin.damage()}`);
```

The best place to look for all the interfaces is the full code docs.