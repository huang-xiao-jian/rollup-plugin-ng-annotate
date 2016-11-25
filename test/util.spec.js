/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const should = require('should');
const { flattenAnnotateRefs, translateAnnotateRefs } = require('../src/util');

describe.only('rollup-plugin-ng-annotate util', function () {
  it('should flatten dependency', function () {
    flattenAnnotateRefs('').should.eql([]);
    flattenAnnotateRefs(' $http, $injector ').should.eql(['$http', '$injector']);
  });

  it('should translate dependency', function () {
    translateAnnotateRefs(['$http', '$injector']).should.equal(`'$http', '$injector'`);
  });
});

