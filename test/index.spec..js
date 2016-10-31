/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const path = require('path');
const fs = require('fs');
const should = require('should');
const babel = require('rollup-plugin-babel');
const { rollup } = require('rollup');
const ngAnnotate = require('../');

// maybe rollup dependency tree directory
process.chdir('test');

describe('should annotate javascript source code', function () {
  it('should annotate function declare', function () {
    let options = {
      entry: 'fixture/hmr.module.js',
      plugins: [ngAnnotate()]
    };
    let expectation = fs.readFileSync(path.resolve(__dirname, 'fixture', 'hmr.bundle.js'), {encoding: 'utf8'});

    return rollup(options).then(bundle => {
      let { code } = bundle.generate({
        format: 'iife',
        moduleName: '$hmr'
      });

      should(code.includes(expectation)).be.true();
    });
  });
});

describe('should annotate javascript source code', function () {
  it('should annotate class declare', function () {
    let options = {
      entry: 'fixture/redux.controller.js',
      plugins: [ngAnnotate(), babel()]
    };
    let expectation = `OrderController.$inject = ['$ngRedux', '$scope', '$stateParams', 'taskActions'];`;

    return rollup(options).then(bundle => {
      let { code } = bundle.generate({
        format: 'iife',
        moduleName: '$hmr'
      });

      should(code.includes(expectation)).be.true();
    });
  });
});