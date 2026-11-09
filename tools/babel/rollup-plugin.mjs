import { transformAsync } from '@babel/core';
import presetEnv from '@babel/preset-env';
import classProperties from '@babel/plugin-transform-class-properties';
import privateMethods from '@babel/plugin-transform-private-methods';
import privatePropertyInObject from '@babel/plugin-transform-private-property-in-object';

// Compile the complete browser chunk so Babel helpers remain inside the IIFE.
// This package has a separate install because Jest still requires Babel 7.
export function babelBrowser () {
  return {
    name: 'babel-browser',
    async renderChunk (code, chunk) {
      const result = await transformAsync(code, {
        filename: chunk.fileName,
        configFile: false,
        babelrc: false,
        sourceType: 'script',
        sourceMaps: true,
        targets: ['last 2 versions, not dead, > 0.5%', 'maintained node versions'],
        presets: [[presetEnv, { modules: false }]],
        // Closure Compiler cannot consume private elements, even when all
        // target browsers support them, so always lower these class features.
        plugins: [classProperties, privateMethods, privatePropertyInObject]
      });
      if (!result?.code) throw new Error(`Babel did not compile ${chunk.fileName}`);
      return { code: result.code, map: result.map };
    }
  };
}
