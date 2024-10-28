# Distributions available to GameRng

There are several distributions available, according to your needs.

You can view each one plotted on a graph on [the distributions examples page](https://manticorp.github.io/gamerng/distributions.html).

## Bates Distribution

See the [code documentation](../classes/index.Rng.html#bates) for complete calling signature.

```ts
rng.bates({ n?: number });
rng.chancy({ type: 'bates', n?: number });
```

## Bernoulli Distribution

See the [code documentation](../classes/index.Rng.html#bernoulli) for complete calling signature.

```ts
rng.bernoulli({ p?: number });
rng.chancy({ type: 'bernoulli', p?: number });
```

## Beta Distribution

See the [code documentation](../classes/index.Rng.html#beta) for complete calling signature.

```ts
rng.beta({ alpha?: number, beta?: number });
rng.chancy({ type: 'beta', alpha?: number, beta?: number });
```

## Beta Binomial Distribution

See the [code documentation](../classes/index.Rng.html#betaBinomial) for complete calling signature.

```ts
rng.betaBinomial({ alpha?: number, beta?: number, n?: number });
rng.chancy({ type: 'betaBinomial', alpha?: number, beta?: number, n?: number });
```

## Binomial Distribution

See the [code documentation](../classes/index.Rng.html#binomial) for complete calling signature.

```ts
rng.binomial({ n?: number, p?: number });
rng.chancy({ type: 'binomial', n?: number, p?: number });
```

## Box Muller Distribution

See the [code documentation](../classes/index.Rng.html#boxMuller) for complete calling signature.

```ts
rng.boxMuller({ mean?: number, stddev?: number });
rng.chancy({ type: 'boxMuller', mean?: number, stddev?: number });
```

## Cauchy Distribution

See the [code documentation](../classes/index.Rng.html#cauchy) for complete calling signature.

```ts
rng.cauchy({ median?: number, scale?: number });
rng.chancy({ type: 'cauchy', median?: number, scale?: number });
```

## Chi Squared Distribution

See the [code documentation](../classes/index.Rng.html#chiSquared) for complete calling signature.

```ts
rng.chiSquared({ k?: number });
rng.chancy({ type: 'chiSquared', k?: number });
```

## Exponential Distribution

See the [code documentation](../classes/index.Rng.html#exponential) for complete calling signature.

```ts
rng.exponential({ rate?: number });
rng.chancy({ type: 'exponential', rate?: number });
```

## Gamma Distribution

See the [code documentation](../classes/index.Rng.html#gamma) for complete calling signature.

```ts
rng.gamma({ shape?: number, rate?: number, scale?: number });
rng.chancy({ type: 'gamma', shape?: number, rate?: number, scale?: number });
```

## Gaussian Distribution

See the [code documentation](../classes/index.Rng.html#gaussian) for complete calling signature.

```ts
rng.gaussian({ mean?: number, stddev?: number, skew?: number });
rng.chancy({ type: 'gaussian', mean?: number, stddev?: number, skew?: number });
```

## Hermite Distribution

See the [code documentation](../classes/index.Rng.html#hermite) for complete calling signature.

```ts
rng.hermite({ lambda1?: number, lambda2?: number });
rng.chancy({ type: 'hermite', lambda1?: number, lambda2?: number });
```

## Hypergeometric Distribution

See the [code documentation](../classes/index.Rng.html#hypergeometric) for complete calling signature.

```ts
rng.hypergeometric({ N?: number, K?: number, n?: number, k?: number });
rng.chancy({ type: 'hypergeometric', N?: number, K?: number, n?: number, k?: number });
```

## Irwin Hall Distribution

See the [code documentation](../classes/index.Rng.html#irwinHall) for complete calling signature.

```ts
rng.irwinHall({ n?: number });
rng.chancy({ type: 'irwinHall', n?: number });
```

## Kumaraswamy Distribution

See the [code documentation](../classes/index.Rng.html#kumaraswamy) for complete calling signature.

```ts
rng.kumaraswamy({ alpha?: number, beta?: number });
rng.chancy({ type: 'kumaraswamy', alpha?: number, beta?: number });
```

## Laplace Distribution

See the [code documentation](../classes/index.Rng.html#laplace) for complete calling signature.

```ts
rng.laplace({ mean?: number, scale?: number });
rng.chancy({ type: 'laplace', mean?: number, scale?: number });
```

## Logistic Distribution

See the [code documentation](../classes/index.Rng.html#logistic) for complete calling signature.

```ts
rng.logistic({ mean?: number, scale?: number });
rng.chancy({ type: 'logistic', mean?: number, scale?: number });
```

## Log Normal Distribution

See the [code documentation](../classes/index.Rng.html#logNormal) for complete calling signature.

```ts
rng.logNormal({ mean?: number, stddev?: number });
rng.chancy({ type: 'logNormal', mean?: number, stddev?: number });
```

## Pareto Distribution

See the [code documentation](../classes/index.Rng.html#pareto) for complete calling signature.

```ts
rng.pareto({ shape?: number, scale?: number, location?: number });
rng.chancy({ type: 'pareto', shape?: number, scale?: number, location?: number });
```

## Poisson Distribution

See the [code documentation](../classes/index.Rng.html#poisson) for complete calling signature.

```ts
rng.poisson({ lambda?: number });
rng.chancy({ type: 'poisson', lambda?: number });
```

## Rademacher Distribution

See the [code documentation](../classes/index.Rng.html#rademacher) for complete calling signature.

```ts
rng.rademacher();
rng.chancy({ type: 'rademacher' });
```

## Rayleigh Distribution

See the [code documentation](../classes/index.Rng.html#rayleigh) for complete calling signature.

```ts
rng.rayleigh({ scale?: number });
rng.chancy({ type: 'rayleigh', scale?: number });
```

## Students T Distribution

See the [code documentation](../classes/index.Rng.html#studentsT) for complete calling signature.

```ts
rng.studentsT({ nu?: number });
rng.chancy({ type: 'studentsT', nu?: number });
```

## Wigner Semicircle Distribution

See the [code documentation](../classes/index.Rng.html#wignerSemicircle) for complete calling signature.

```ts
rng.wignerSemicircle({ R?: number ;
rng.chancy({ type: 'wignerSemicircle', R?: number ;
```
