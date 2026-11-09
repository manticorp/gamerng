import { babelBrowser } from './tools/babel/rollup-plugin.mjs';

const config = {
  input: 'lib/browser.js',
  output: {
    file: 'dist/gamerng.js',
    name: 'GameRng',
    exports: 'default',
    format: 'iife'
  },
  plugins: [babelBrowser()]
};

export default config;
