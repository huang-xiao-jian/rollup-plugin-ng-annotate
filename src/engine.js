/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const { isEmpty } = require('lodash');

const { translateAnnotateRefs } = require('./util');

module.exports = {
  annotateDependencyInjection
};

/**
 * @description - decorate raw code with strict-di
 *
 * @param {Array.<AnnotateRef>} refs
 */
function annotateDependencyInjection(refs) {
  if (isEmpty(refs)) {
    return false;
  }

  return refs.map((ref) => {
    return isEmpty(ref.dependency) ? `${ref.name}.$inject = [];` : `${ref.name}.$inject = [${translateAnnotateRefs(ref.dependency)}];`
  }).join('\n');
}