/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const path = require('path');
const fs = require('fs');
const should = require('should');
const { rollup } = require('rollup');

const ngAnnotate = require('../');
const options = {
  entry: 'fixture/hmr.module.js',
  plugins: [ngAnnotate()]
};
const expectation = fs.readFileSync(path.resolve(__dirname, 'fixture', 'hmr.bundle.js'), {encoding: 'utf8'});

// maybe rollup dependency tree directory
process.chdir('test');

describe('should annotate javascript source code', function () {
  it('should annotate function declare', function () {
    return rollup(options).then(bundle => {
      let { code } = bundle.generate({
        format: 'iife',
        moduleName: '$hmr'
      });
      
      should(code.includes(expectation)).be.true();
    });
  });
});
