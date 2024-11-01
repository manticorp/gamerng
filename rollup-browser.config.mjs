import { babel } from '@rollup/plugin-babel';

const config = {
  input: 'lib/browser.js',
  output: {
    file: 'dist/gamerng.js',
    name: 'GameRng',
    exports: 'default',
    format: 'iife'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;
