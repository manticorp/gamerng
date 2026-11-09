import { dts } from 'rollup-plugin-dts';

export default {
  input: 'lib/index.d.ts',
  output: [
    { file: 'dist/gamerng.d.mts', format: 'es' },
    { file: 'dist/gamerng.d.cts', format: 'es' }
  ],
  plugins: [dts()]
};
