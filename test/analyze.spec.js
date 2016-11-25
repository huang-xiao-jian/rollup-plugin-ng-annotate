/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const path = require('path');
const fs = require('fs');
const should = require('should');
const { analyzeExplicitReference, analyzeImplicitReference } = require('../src/analyze');
const options = {encoding: 'utf8'};

describe('rollup-plugin-ng-annotate analyze implement', function () {
  it('should analyze function declare', function () {
    let template = fs.readFileSync(path.resolve(__dirname, 'fixture', 'hmr.provider.js'), options);
    let [$hmr, $state] = analyzeExplicitReference(template);

    $hmr.name.should.equal('HMRProvider');
    $state.name.should.equal('HMRStateProvider');

    $hmr.dependency.should.eql([]);
    $state.dependency.should.eql(['$stateProvider', '$hmrProvider']);
  });

  it('should analyze class declare', function () {
    let template = fs.readFileSync(path.resolve(__dirname, 'fixture', 'redux.controller.js'), options);
    let [core, assist] = analyzeImplicitReference(template);

    core.name.should.equal('ReduxCoreController');
    assist.name.should.equal('ReduxAssistController');

    core.dependency.should.eql(['$ngRedux', '$scope', '$stateParams', 'taskActions']);
    assist.dependency.should.eql(['$injector', '$http']);
  });
});

// // maybe rollup dependency tree directory
// process.chdir('test');
//
// describe('should annotate javascript source code', function () {
//   it('should annotate function declare', function () {
//     let options = {
//       entry: 'fixture/hmr.module.js',
//       plugins: [ngAnnotate()]
//     };
//     let expectation = fs.readFileSync(path.resolve(__dirname, 'fixture', 'hmr.bundle.js'), {encoding: 'utf8'});
//
//     return rollup(options).then(bundle => {
//       let {code} = bundle.generate({
//         format: 'iife',
//         moduleName: '$hmr'
//       });
//
//       should(code.includes(expectation)).be.true();
//     });
//   });
// });
//
// describe('should annotate javascript source code', function () {
//   it('should annotate class declare', function () {
//     let options = {
//       entry: 'fixture/redux.controller.js',
//       plugins: [
//         ngAnnotate(),
//         babel()
//       ]
//     };
//     let expectation = `OrderController.$inject = ['$ngRedux', '$scope', '$stateParams', 'taskActions'];`;
//
//     return rollup(options).then(bundle => {
//       let {code} = bundle.generate({
//         format: 'iife',
//         moduleName: '$hmr'
//       });
//
//       should(code.includes(expectation)).be.true();
//     });
//   });
// });