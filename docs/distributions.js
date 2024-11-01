const rng = new GameRng();

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#graph-container');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const samples = parseInt(urlParams.get('samples') ?? 20000);

  const xbins = {
    size: 0.005,
  };

  const layout = {
    width: 900,
    height: 600,
    scene: {
      aspectratio: 1
    },
    bargap: 0,
    bargroupgap: 0,
    barmode: 'overlay'
  };
  const opacity = 0.5;
  const chartType = 'histogram';
  const lay = (up) => ({ ...layout, ...up });

  const newEl = (container, code, description) => {
    const overallCont = document.createElement('div');
    const codeCont = document.createElement('div');
    const descCont = document.createElement('div');
    const graphCont = document.createElement('div');
    const preEl = document.createElement('pre');
    const codeEl = document.createElement('code');
    overallCont.classList.add('rng-demo-container');
    codeCont.classList.add('code-container');
    graphCont.classList.add('graph-container');
    container.appendChild(overallCont);
    overallCont.appendChild(codeCont);
    overallCont.appendChild(descCont);
    overallCont.appendChild(graphCont);
    codeCont.appendChild(preEl);
    preEl.appendChild(codeEl);
    codeEl.innerHTML = code;
    descCont.innerHTML = description;

    return graphCont;
  };

  const toShow = [
    {
      name: 'random',
      argtype: 'params',
      show: 'return (new GameRng.Rng()).random()',
      args: [
        null,
      ],
      fn: () => {
        return (new GameRng()).random();
      },
      xaxis: { range: [0, 1] },
      xbins: { start: 0, end: 1, size: 0.01 },
    },
    {
      name: 'random',
      argtype: 'params',
      args: [
        null,
      ],
      xaxis: { range: [0, 1] },
      xbins: { start: 0, end: 1, size: 0.01 },
    },
    {
      name: 'random',
      argtype: 'params',
      args: [
        { min: 1, max: 10, skew: -3 },
        { min: 1, max: 10, skew: -2 },
        { min: 1, max: 10, skew: -1 },
        { min: 1, max: 10 },
        { min: 1, max: 10, skew: 1 },
        { min: 1, max: 10, skew: 2 },
        { min: 1, max: 10, skew: 3 },
      ],
      xbins: { start: 1, end: 10, size: 0.1 },
    },
    {
      name: 'randInt',
      argtype: 'params',
      samples: 1000,
      args: [
        { min: 1, max: 10, skew: -3 },
        { min: 1, max: 10, skew: -2 },
        { min: 1, max: 10, skew: -1 },
        { min: 1, max: 10 },
        { min: 1, max: 10, skew: 1 },
        { min: 1, max: 10, skew: 2 },
        { min: 1, max: 10, skew: 3 },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'normal',
      args: [
        {},
      ],
      xaxis: { range: [-3, 3] },
      xbins: { start: -3, end: 3, size: 0.05 },
    },
    {
      name: 'normal',
      args: [
        { mean: -2 },
        { mean: -1 },
        { mean: 0 },
        { mean: 1 },
        { mean: 2 },
      ],
      xaxis: { range: [-3, 3] },
      xbins: { start: -3, end: 3, size: 0.05 },
    },
    {
      name: 'normal',
      args: [
        { stddev: 0.01 },
        { stddev: 0.1 },
        { stddev: 0.2 },
        { stddev: 1 },
      ],
      yaxis: { range: [0, samples / 20] },
      xaxis: { range: [-3, 3] },
      xbins: { start: -3, end: 3, size: 0.01 },
    },
    {
      name: 'normal',
      samples: 10000,
      defaultArgs: { min: -0.5, max: 0.5 },
      args: [
        { min: -0.5, max: 0.5, stddev: 0.01 },
        { min: -0.5, max: 0.5, stddev: 0.1 },
        { min: -0.5, max: 0.5, stddev: 0.2 },
        { min: -0.5, max: 0.5, stddev: 1 },
      ],
      yaxis: { range: [0, samples / 20] },
      xaxis: { range: [-3, 3] },
      xbins: { start: -0.5, end: 0.5, size: 0.01 },
    },
    {
      name: 'normal',
      samples: 10000,
      defaultArgs: { min: -0.5 },
      args: [
        { min: -0.5, stddev: 0.01 },
        { min: -0.5, stddev: 0.1 },
        { min: -0.5, stddev: 0.2 },
        { min: -0.5, stddev: 1 },
      ],
      yaxis: { range: [0, samples / 20] },
      xaxis: { range: [-3, 3] },
      xbins: { size: 0.01 },
    },
    {
      name: 'normal',
      defaultArgs: { stddev: 0.25 },
      args: [
        { min: -1 },
        { min: -0.5 },
        { min: 0 },
        { min: 0.5 },
      ],
      yaxis: { range: [0, samples / 20] },
      xaxis: { range: [-3, 3] },
      xbins: { size: 0.01 },
    },
    {
      name: 'normal',
      defaultArgs: { stddev: 0.25 },
      args: [
        { max: 1 },
        { max: 0.5 },
        { max: 0 },
        { max: -0.5 },
      ],
      yaxis: { range: [0, samples / 20] },
      xaxis: { range: [-3, 3] },
      xbins: { size: 0.01 },
    },
    {
      name: 'normal',
      args: [
        { min: -2, max: 0 },
        { min: -2, max: 4 },
        { min: 0, max: 2 },
        { min: 2, max: 3 }
      ],
      xaxis: { range: [-3, 5] },
      xbins: { size: 0.01 },
    },
    {
      name: 'normal',
      samples: 10000,
      args: [
        { min: -2, max: 0, skew: -1 },
        { min: -2, max: 0, skew: 0 },
        { min: -2, max: 0, skew: 1 },
        { min: -2, max: 4, skew: -1 },
        { min: -2, max: 4 },
        { min: -2, max: 4, skew: 1 },
        { min: 0, max: 2, skew: -1 },
        { min: 0, max: 2 },
        { min: 0, max: 2, skew: 1 },
        { min: 2, max: 3, skew: -1 },
        { min: 2, max: 3 },
        { min: 2, max: 3, skew: 1 }
      ],
      xaxis: { range: [-3, 5] },
      xbins: { start: -2, end: 4, size: 0.01 },
    },
    {
      name: 'normal',
      samples: 10000,
      defaultArgs: { mean: 0.5, min: 0, max: 1, stddev: 0.1 },
      args: [
        { skew: -2 },
        { skew: -1 },
        { skew: 0 },
        { stddev: 0.25, skew: 0 },
        { stddev: 0.5, skew: 0 },
        { stddev: 0.25, skew: +1 },
        { skew: +1 },
        { skew: +2 },
      ],
      yaxis: { range: [0, samples / 20] },
      xaxis: { range: [-0.1, 1.1] },
      xbins,
    },
    {
      name: 'normal',
      defaultArgs: { mean: 0.50 },
      args: [
        { stddev: 1 / 10 },
        { stddev: 5 / 10 },
        { stddev: 1 },
        { stddev: 10 },
        { mean: 5, stddev: 1 },
        { mean: -5, stddev: 1 }
      ],
      yaxis: { range: [0, samples / 50] },
      xaxis: { range: [-5, 5] },
      xbins,
    },
    {
      name: 'normal',
      defaultArgs: { min: 0, max: 1 },
      args: [
        { skew: -3 },
        { skew: -2 },
        { skew: -1 },
        { skew: 0 },
        { skew: +1 },
        { skew: +2 },
        { skew: +3 },
      ],
      xbins: { size: 0.005, start: 0, end: 1 },
    },
    {
      name: 'gaussian',
      defaultArgs: { mean: 0.5, stddev: 0.1 },
      args: [
        { skew: -4 },
        { skew: -3 },
        { skew: -2 },
        { skew: -1 },
        { skew: 0 },
        { skew: +1 },
        { skew: +2 },
        { skew: +3 },
        { skew: +4 },
      ],
      xaxis: { range: [-0.5, 1.5] },
      xbins,
    },
    {
      name: 'gaussian',
      defaultArgs: { mean: 0, stddev: 0.5 },
      args: [
        { skew: -3 },
        { skew: -2 },
        { skew: -1 },
        { skew: 0 },
        { skew: +1 },
        { skew: +2 },
        { skew: +3 },
      ],
      xaxis: { range: [-2.5, 2.5] },
      xbins,
    },
    {
      name: 'chancy',
      defaultArgs: { min: 0, max: 1 },
      args: [
        {},
        { type: 'normal', skew: -1 },
        { type: 'normal' },
        { type: 'normal', skew: +1 },
      ],
      xbins,
    },
    {
      name: 'chancy',
      defaultArgs: { min: 0, max: 100, type: 'normal' },
      args: [
        { skew: -2 },
        { skew: -1 },
        { skew: 0 },
        { skew: +1 },
        { skew: +2 },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'chancy',
      defaultArgs: { min: 0, max: 100, type: 'normal_integer' },
      args: [
        { skew: -2 },
        { skew: -1 },
        { skew: 0 },
        { skew: +1 },
        { skew: +2 },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'chancy',
      defaultArgs: { mean: 50, stddev: 10, type: 'normal_integer' },
      args: [
        { skew: 0 },
        { skew: +1 },
        { skew: -1 },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'dice',
      argtype: 'params',
      args: [
        { n: '1d4' },
        { n: '1d6' },
        { n: '1d8' },
        { n: 'd10' },
        { n: 'd12' },
        { n: 'd20' },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'dice',
      argtype: 'params',
      args: [
        { n: '2d6' },
        { n: '3d6' },
        { n: '4d6' },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'dice',
      argtype: 'params',
      args: [
        { n: '1d6+1' },
        { n: '1d6+3' },
        { n: '1d6+6' },
      ],
      xbins: { size: 1 },
    },
    {
      name: 'irwinHall',
      args: [
        { n: 1 },
        { n: 2 },
        { n: 3 },
        { n: 6 },
        { n: 10 },
      ],
      xbins: { start: 0, end: 10, size: 0.01 },
    },
    {
      name: 'bates',
      args: [
        { n: 1 },
        { n: 2 },
        { n: 3 },
        { n: 6 },
        { n: 10 },
      ],
      xbins: { start: 0, end: 1, size: 0.01 },
    },
    {
      name: 'batesgaussian',
      args: [
        { n: 2 },
        { n: 3 },
        { n: 6 },
        { n: 10 },
      ],
      xbins: { size: 0.01 },
    },
    {
      name: 'boxMuller',
      args: [
        { mean: 0, stddev: 0.1 },
        { mean: 0, stddev: 0.2 },
        { mean: 0, stddev: 0.4 },
        { mean: 0, stddev: 1 },
        { mean: 0, stddev: 1.5 },
      ],
      xbins: { start: -1, end: 1, size: 0.01 },
    },
    {
      name: 'bernoulli',
      args: [
        { p: 0.25 },
        { p: 0.5 },
        { p: 0.75 },
      ],
    },
    {
      name: 'exponential',
      args: [
        { rate: 1 },
        { rate: 2 },
        { rate: 4 },
        { rate: 8 },
        { rate: 16 },
        { rate: 32 },
      ],
      xaxis: { range: [0, 2] },
      xbins: { start: 0, end: 2, size: 0.01 },
    },
    {
      name: 'pareto',
      args: [
        { shape: 1, scale: 1, location: 0 },
        { shape: 5, scale: 1, location: 0 },
        { shape: 5, scale: 1, location: 3 },
        { shape: 20, scale: 1, location: 0 },
      ],
      xaxis: { range: [0, 5] },
      xbins: { start: 0, end: 5, size: 0.05 },
    },
    {
      name: 'pareto',
      args: [
        { shape: 5, scale: 1, location: 0 },
        { shape: 5, scale: 2, location: 0 },
        { shape: 5, scale: 5, location: 0 },
        { shape: 5, scale: 10, location: 0 },
      ],
      xbins: { start: 0, end: 5, size: 0.05 },
    },
    {
      name: 'pareto',
      args: [
        { shape: 1, scale: 1, location: 0 },
        { shape: 1, scale: 1, location: 1 },
        { shape: 1, scale: 1, location: -1 },
        { shape: 1, scale: 1, location: 5 },
      ],
      xbins: { start: 0, end: 6, size: 0.05 },
    },
    {
      name: 'poisson',
      args: [
        { lambda: 1 },
        { lambda: 4 },
        { lambda: 10 },
      ],
    },
    {
      name: 'rademacher',
      args: [
        {}
      ],
    },
    {
      name: 'beta',
      args: [
        { alpha: 0.5, beta: 0.5 },
        { alpha: 5, beta: 1 },
        { alpha: 1, beta: 3 },
        { alpha: 2, beta: 2 },
        { alpha: 2, beta: 5 }
      ],
      samples: 100000,
      xbins: { start: 0, end: 1, size: 0.01 },
    },
    {
      name: 'gamma',
      args: [
        { shape: 1, rate: 2 },
        { shape: 2, rate: 2 },
        { shape: 3, rate: 2 },
        { shape: 5, rate: 1 },
        { shape: 9, rate: 0.5 },
        { shape: 7.5, rate: 1 },
        { shape: 0.5, rate: 1 },
      ],
      xaxis: { range: [0, 20] },
      yaxis: { range: [0, samples / 100] },
      xbins: { start: 0, end: 20, size: 0.01 },
    },
    {
      name: 'studentsT',
      args: [
        { nu: 1 },
        { nu: 2 },
        { nu: 10 },
        { nu: 99 },
      ],
      xbins: { start: -10, end: 10, size: 0.01 },
    },
    {
      name: 'wignerSemicircle',
      args: [
        { R: 0.25 },
        { R: 0.5 },
        { R: 1 },
        { R: 2 },
        { R: 3 }
      ],
    },
    {
      name: 'kumaraswamy',
      args: [
        { alpha: 0.5, beta: 0.5 },
        { alpha: 5, beta: 1 },
        { alpha: 1, beta: 3 },
        { alpha: 2, beta: 2 },
        { alpha: 2, beta: 5 },
      ],
      xbins: { start: 0, end: 1, size: 0.01 },
    },
    {
      name: 'hermite',
      args: [
        { lambda1: 0.1, lambda2: 1.5 },
        { lambda1: 1, lambda2: 2 },
        { lambda1: 1, lambda2: 0.125 }
      ],
    },
    {
      name: 'chiSquared',
      args: [
        { k: 1 },
      ],
      xbins: { start: 0, end: 5, size: 0.1 },
    },
    {
      name: 'chiSquared',
      args: [
        // {k: 1},
        { k: 2 },
        { k: 3 },
        { k: 4 },
        { k: 6 },
        { k: 9 }
      ],
      xbins: { start: 0, end: 20, size: 0.1 },
    },
    {
      name: 'rayleigh',
      args: [
        { scale: 0.5 },
        { scale: 1 },
        { scale: 2 },
        { scale: 3 },
        { scale: 4 },
      ],
    },
    {
      name: 'logNormal',
      args: [
        { mean: 0, stddev: 0.25 },
        { mean: 0, stddev: 0.5 },
        { mean: 0, stddev: 1 },
      ],
      xbins: { start: 0, end: 3, size: 0.05 },
    },
    {
      name: 'cauchy',
      args: [
        { median: 0, scale: 0.5 },
        { median: 0, scale: 1 },
        { median: 0, scale: 2 },
        { median: -2, scale: 1 }
      ],
      xbins: { start: -5, end: 5, size: 0.05 },
    },
    {
      name: 'laplace',
      args: [
        { mean: 0, scale: 1 },
        { mean: 0, scale: 2 },
        { mean: 0, scale: 4 },
        { mean: -2, scale: 4 }
      ],
      xbins: { start: -5, end: 5, size: 0.05 },
    },
    {
      name: 'logistic',
      args: [
        { mean: 0, scale: 1 },
        { mean: 5, scale: 2 },
        { mean: 9, scale: 3 },
        { mean: 9, scale: 4 },
        { mean: 9, scale: 4 },
        { mean: 6, scale: 2 },
        { mean: 2, scale: 1 }
      ],
      xbins: { start: -5, end: 20, size: 0.05 },
    },
  ];
  const just = [];

  if (urlParams.has('just')) {
    const urlJust = urlParams.get('just');
    if (typeof urlJust === 'string') {
      urlJust.split(',').map(a => a.trim()).forEach(el => just.push(el));
    } else if (Array.isArray(urlJust)) {
      urlJust.forEach(el => just.push(el));
    }
  }

  const statuscont = document.getElementById('status');

  const overallstart = performance.now();

  const allPromises = [];

  const showFn = async (fn) => {
    if (just.length && !just.includes(fn.name)) {
      return;
    }
    statuscont.innerHTML = `Generating ${fn.name}`;
    const start = performance.now();
    const argtype = fn.argtype ?? 'object';
    const data = [];
    const numsamples = fn.samples ?? samples;
    const argNames = new Set();
    for (const [k, v] of Object.entries(fn.defaultArgs ?? {})) {
      argNames.add(`${k}=${v}`);
    }
    for (const args of fn.args ?? [{}]) {
      if (fn.args.length === 1 && !fn.show) {
        if (args === null || Object.values(args).length === 0) {
          fn.show = `rng.${fn.name}()`;
        } else {
          fn.show = `rng.${fn.name}(${JSON.stringify(args)})`;
        }
      }
      if (args !== null) {
        for (const k of Object.keys(args)) {
          if (typeof (fn.defaultArgs ?? {})[k] === 'undefined') {
            argNames.add(k);
          }
        }
      }
      const fnargs = Object.assign({}, fn.defaultArgs ?? {}, args);
      if (fn.callWith ?? null === 'chancy') {
        fnargs.type = fn.name;
      }
      if (typeof fn.fn !== 'function') {
        if (fn.callWith ?? null === 'chancy') {
          fnargs.type = fn.name;
          fn.fn = rng.chancy;
        } else {
          fn.fn = rng[fn.name];
        }
      }
      const results = [];
      for (let i = 0; i < numsamples; i++) {
        let result;
        if (args === null) {
          result = fn.fn.call(rng);
        } else {
          if (argtype === 'params') {
            result = fn.fn.call(rng, ...Object.values(fnargs));
          } else if (argtype === 'object') {
            result = fn.fn.call(rng, fnargs);
          } else {
            result = fn.fn.call(rng, ...Object.values(fnargs));
          }
        }
        results.push(result);
      }
      data.push({
        x: results,
        name: JSON.stringify(args),
        type: chartType,
        opacity,
        xbins: fn.xbins ?? undefined
      });
    }

    fn.show = fn.show ?? `rng.${fn.name}({${Array.from(argNames).join(', ')}})`;

    const parts = [];

    if (argtype === 'object' && fn.name !== 'chancy' && fn.name !== 'dice') {
      parts.push(`<p>Outputs: ${rng.support(fn.name)}`);
    }

    const duration = performance.now() - start;

    parts.push(`<p>${duration.toFixed(0)}ms for ${numsamples * fn.args.length} runs</p>`);
    parts.push(`<p>${((duration / (numsamples * fn.args.length)) * 1_000).toFixed(2)}ms / 1,000 runs</p>`);

    const div = newEl(container, fn.show, parts.join('\n'));

    Plotly.newPlot(div, {
      data,
      layout: lay({
        title: `${fn.show}`,
        xaxis: fn.xaxis ?? {},
        yaxis: fn.yaxis ?? {}
      })
    });
  };

  for (const fn of toShow) {
    allPromises.push(showFn(fn));
  }

  Promise.all(allPromises).then(() => {
    const overallduration = performance.now() - overallstart;
    statuscont.innerHTML = `Took ${overallduration.toFixed(1)}ms to generate all examples`;
  });
});
