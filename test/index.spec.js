/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const should = require('should');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const ngAnnotate = require('../');

process.chdir('test');

// maybe rollup dependency tree directory
describe.only('rollup-plugin-ng-annotate', function () {
  it('should annotate source code', function () {
    let options = {
      entry: 'fixture/hmr.demo.js',
      plugins: [ngAnnotate(), babel()]
    };

    return rollup(options).then(bundle => {
      let { code } = bundle.generate({
        format: 'iife',
        moduleName: 'demo'
      });

      let strictDI = {
        HMRProvider: `HMRProvider.$inject = [];`,
        HMRStateProvider: `HMRStateProvider.$inject = ['$stateProvider', '$hmrProvider'];`,
        ReduxAssistController: `ReduxAssistController.$inject = ['$injector', '$http'];`,
        ReduxCoreController: `ReduxCoreController.$inject = ['$ngRedux', '$scope', '$stateParams', 'taskActions'];`
      };

      console.log(code);

      code.includes(strictDI.HMRProvider).should.be.true();
      code.includes(strictDI.HMRStateProvider).should.be.true();
      code.includes(strictDI.ReduxAssistController).should.be.true();
      code.includes(strictDI.ReduxCoreController).should.be.true();
    });
  });
});