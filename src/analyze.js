/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const { partial } = require('lodash');
const { flattenAnnotateRefs } = require('./util');

const lineBreakReg = /[\n\r]/g;
// about function declare
const explicitRegMatch = /\/\*\s*@ngInject\s*\*\/\s*function\s+(\w+)\s*\(([^\)]*)\)/gm;
// about class constructor declare
const implicitRegMatch = /class\s+(\w+)\s*\{\s*\/\*\s*@ngInject\s*\*\/\s*constructor\s*\(([^\)]*)\)/gm;

module.exports = {
  analyzeExplicitReference: partial(analyzeInjectionReference, explicitRegMatch),
  analyzeImplicitReference: partial(analyzeInjectionReference, implicitRegMatch)
};

/**
 * @description - analyze function declare dependency
 *
 * @param {RegExp} DIRegMatch
 * @param {string} template
 *
 * @return {Array.<AnnotateRef>}
 */
function analyzeInjectionReference(DIRegMatch, template) {
  template = template.replace(lineBreakReg, '');

  let middleware;
  let ngAnnotateRefs = [];

  // eslint-disable-next-line no-cond-assign
  while (middleware = DIRegMatch.exec(template)) {
    let [, name, dependency] = middleware;

    ngAnnotateRefs.push({
      name,
      dependency: flattenAnnotateRefs(dependency)
    });
  }

  return ngAnnotateRefs;
}