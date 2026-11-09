# Contributing to GameRng

GameRng is written in [TypeScript](https://www.typescriptlang.org/) and packed with [Rollup](https://rollupjs.org/).

## Code Style

Please lint code using eslint with the "[neostandard](https://github.com/neostandard/neostandard)" code style (using semicolons). An ```eslint.config.js``` style file is present.

# Building

The following command is for building the final output files:

```
npm run build
```

The final build files appear in the ```dist``` folder, along with typings in ```dist/types```.

There are four output js files for different environments/uses.

Please build before submitting pull requests.

## Documentation and Examples

If you wish to make examples, please use:

```
npm run ci
```

To build the docs folder. This will give you the necessary JS files to run the examples locally, but the ```docs/code``` and ```docs/js``` files are not tracked.

# Tests

Please write tests for any new functionality.

Unit tests a run using [jest](https://jestjs.io/) on the typescript files themselves, using ```jest.config.js```.

The following commands are included for development:

```
npm run test
```

And a watch mode:

```
npm run test-watch
```

# Dev Code

During development, a ```dev``` folder is spawned (and not tracked) containing WIP copies of the js library.

This folder can be used for testing functionality (e.g place a ```node.js``` file in there with ```import ultraloot.js``` and/or a html file with ```<script type="module" src="demo.js"></script>```).

The following commands are used for dev work:

```
npm run dev
```

or watch mode:

```
npm run watch
```

# Pull Requests

Please make all code contributions as pull requests.

All tests should be passing before submitting the PR.

If this becomes an issue I will set up an automated tests thing.
## Browser compiler dependencies

Use Node 24.11 or newer (Node 22.18 is also supported) for development builds. The browser compiler uses Babel 8 in `tools/babel`, with its own package lock. Jest and the CommonJS Rollup adapter retain their compatible Babel 7 dependencies in the root install. See the [Babel 8 migration guide](https://babeljs.io/docs/v8-migration).

`npm ci --strict-peer-deps` installs the root tools. `npm run build` installs the locked browser compiler automatically through `prebuild-browser`; `npm run check` also runs its private-field regression fixture and compares both browser bundles with the packed CommonJS seeded results. For standalone compiler fixture checks, run `npm run tools:install` before `npm run test:browser-build`. Published package installs do not run this build setup.

CI validates both dependency graphs and audits `tools/babel` separately. Dependabot groups the isolated Babel dependencies so future major upgrades are proposed together.
