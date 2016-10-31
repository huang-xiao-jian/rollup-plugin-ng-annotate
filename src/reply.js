/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const classRegMatch = /(\/\*\s*@ngInject\s*\*\/\s*\n)(\s+)(constructor\s*\([^\)]*\))/g;

/**
 * @description - generate annotate code from function analyze
 *
 * @param {Array.<AnnotateRef>} ngAnnotateRefs
 * @returns {string}
 */
export function replyAnnotateRef(ngAnnotateRefs) {
  return ngAnnotateRefs.map(({name, hasDeps, deps}) => {
    let ngAnnotateDeps;

    if (hasDeps) {
      let dependencyList = deps.split(',').map(dep => dep.trim());

      ngAnnotateDeps = dependencyList.reduce((prev, current) => {
        return `'${prev}', '${current}'`;
      });
    }

    return ngAnnotateDeps ? `${name}.$inject = [${ngAnnotateDeps}]` : `${name}.$inject = []`;
  }).join('\n');
}

/**
 * @description - generate annotate code from class analyze
 *
 * @param {AnnotateRef} ngAnnotateRef
 * @param {string} code - original source code
 * @returns {string}
 */
export function replayClassAnnotateRef(ngAnnotateRef, code) {
  let ngAnnotateDeps;
  let {hasDeps, deps} = ngAnnotateRef;

  if (hasDeps) {
    let dependencyList = deps.split(',').map(dep => dep.trim());

    ngAnnotateDeps = dependencyList.slice(1).reduce((prev, current) => {
      return `${prev}, '${current}'`;
    }, `'${dependencyList[0]}'`);
  }

  let ngStrictDi = ngAnnotateDeps ? `static $inject = [${ngAnnotateDeps}]` : `static $inject = []`;

  return code.replace(classRegMatch, (match, annotation, indent, constructor) => {
    return `${annotation}${indent}${ngStrictDi};\n${indent}${constructor}`;
  });
}