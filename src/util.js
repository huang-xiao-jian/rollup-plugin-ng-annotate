/**
 * @description - rollup-plugin-ng-annotate util methods
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

module.exports = {
  flattenAnnotateRefs,
  translateAnnotateRefs
};

/**
 * @description - flatten dependency from string into array.<string>
 *
 * @param {Array.<string>} dependency
 */
function flattenAnnotateRefs(dependency) {
  if (!dependency.length) {
    return [];
  }
  return dependency.split(',').map(value => value.trim());
}

/**
 * @description - translate dependency from Array.<string> into string, make sure dependency not empty
 *
 * @param {Array.<string>} dependency
 */
function translateAnnotateRefs(dependency) {
  return dependency.map(item => `'${item}'`).join(', ')
}