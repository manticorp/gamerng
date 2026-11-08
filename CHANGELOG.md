# Unreleased

- Corrected Gamma rate/scale handling and fractional shapes, Beta and Beta-binomial sampling, Student t scaling, and the Wigner semicircle density.
- Zero-total weighted choices now return `null`. Negative and non-finite weights throw, including single-entry objects and Maps. Inherited object properties are ignored.
- Added separate ESM and CommonJS declarations, packed-package consumer checks, PR validation on Node 22/24, and repeatable benchmarks.
- Sampling revisions are recorded as `samplingVersion: 2` in serialized RNG state. The uniform engine and its established seeded sequence are unchanged. Corrected derived distributions and invalid/zero-weight cases can produce different outcomes or consume a different number of draws than earlier versions. Existing serialized states remain readable; save states do not emulate the old incorrect samplers.

The dependency-free `src/sampling.ts` is the canonical source embedded by UltraLoot. To update that checkout, run `npm run sync:rng -- --source ../gamerng` from UltraLoot, then its tests and `test:parity` after building both packages.

Run `npm run check` for types, unit tests, a production build, and real packed-package ESM/CJS/browser consumers. Run `npm run benchmark` after building; `benchmarks/baseline.json` records local measurements for comparison, not portable performance guarantees.
