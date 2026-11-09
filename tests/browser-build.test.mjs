import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { rollup } from 'rollup';
import { babelBrowser } from '../tools/babel/rollup-plugin.mjs';

test('Babel 8 browser chunks keep private fields, brand checks and helpers self-contained', async () => {
  const bundle = await rollup({
    input: 'vault',
    plugins: [{
      name: 'fixture',
      resolveId: id => id === 'vault' ? id : null,
      load: id => id === 'vault'
        ? `export default class Vault {
            #value;
            constructor(value) { this.#value = value; }
            #double() { return this.#value * 2; }
            read() { return this.#double(); }
            owns(other) { return #value in other; }
          }`
        : null
    }, babelBrowser()]
  });
  try {
    const { output } = await bundle.generate({ format: 'iife', name: 'Vault' });
    const context = vm.createContext({});
    vm.runInContext(output[0].code, context);
    assert.equal(vm.runInContext('new Vault(7).read()', context), 14);
    assert.equal(vm.runInContext('new Vault(7).owns(new Vault(9))', context), true);
    assert.equal(vm.runInContext('new Vault(7).owns({})', context), false);
    assert.throws(() => vm.runInContext('Vault.prototype.read.call({})', context));
  } finally {
    await bundle.close();
  }
});
