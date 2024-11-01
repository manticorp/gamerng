import { babel } from '@rollup/plugin-babel';

const config = {
  input: 'lib/index.js',
  output: {
    file: 'dist/gamerng.cjs',
    name: 'GameRng',
    exports: 'named',
    format: 'umd'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;
