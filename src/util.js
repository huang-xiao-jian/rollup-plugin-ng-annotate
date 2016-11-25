/**
 * @description - rollup-plugin-ng-annotate util methods
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

module.exports = {
  flattenAnnotateRefs
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
 * @description - translate dependency from Array.<AnnotateRef> into string
 *
 * @param {Array.<AnnotateRef>} annotateRefs
 */
function translateAnnotateRefs(annotateRefs) {}