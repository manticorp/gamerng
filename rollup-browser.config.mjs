import { babel } from '@rollup/plugin-babel';

const config = {
  input: 'lib/browser.js',
  output: {
    file: 'dist/gamerng.js',
    name: 'GameRng',
    exports: 'default',
    format: 'iife'
  },
  plugins: [babel({
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-transform-class-properties',
      '@babel/plugin-transform-private-methods',
    ],
    targets: [
      'last 2 versions, not dead, > 0.5%',
      'maintained node versions'
    ]
  })]
};

export default config;
