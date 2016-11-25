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
 * @description - translate dependency from Array.<string> into string
 *
 * @param {Array.<string>} dependency
 */
function translateAnnotateRefs(dependency) {
  return dependency.reduce((prev, current) => {
    return `'${prev}', '${current}'`;
  });
}