/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const should = require('should');
const { annotateDependencyInjection } = require('../src/engine');

describe('rollup-plugin-ng-annotate engine', function () {
  it('should annotate empty refs', function () {
    annotateDependencyInjection([]).should.be.false();
  });

  it('should annotate none dependency', function () {
    annotateDependencyInjection([{ name: 'HMRProvider', dependency: [] }]).should.eql(`HMRProvider.$inject = [];`);
  });

  it('should annotate several dependency', function () {
    let refs = [
      { name: 'HMRProvider', dependency: [] },
      { name: 'HMRStateProvider', dependency: ['$stateProvider', '$hmrProvider'] }
    ];
    annotateDependencyInjection(refs).should.eql(`HMRProvider.$inject = [];\nHMRStateProvider.$inject = ['$stateProvider', '$hmrProvider'];`);
  });
});

