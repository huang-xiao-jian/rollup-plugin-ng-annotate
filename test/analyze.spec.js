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

describe('rollup-plugin-ng-annotate analyze', function () {
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