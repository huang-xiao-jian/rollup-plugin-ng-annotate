/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const templateRegMatch = /\/\*\s*@ngInject\s*\*\/\s*function\s+([a-zA-Z]+)\(([^\)]*)\)/gm;
const classRegMatch = /\/\*\s*@ngInject\s*\*\/\s*\n\s+constructor\s*\(([^\)]*)\)/g;

/**
 * @description - analyze annotate refs from source code: function declare
 *
 * @param {string} template
 * @returns {Array.<AnnotateRef>}
 */
export function analyzeAnnotateRef(template) {
  let middleware;
  let ngAnnotateRefs = [];
  
  // eslint-disable-next-line no-cond-assign
  while (middleware = templateRegMatch.exec(template)) {
    let result = {};
    let [, name, deps] = middleware;
    
    result.name = name;
    
    if (deps) {
      result.hasDeps = true;
      result.deps = deps;
    } else {
      result.hasDeps = false;
    }
    
    ngAnnotateRefs.push(result);
  }
  
  return ngAnnotateRefs;
}

/**
 * @description
 * - analyze annotate refs from source code: class controller declare
 * - only single class specific ES6 module
 *
 * @param {string} template
 * @returns {AnnotateRef}
 */
export function analyzeClassAnnotateRef(template) {
  let middleware;
  let ngAnnotateRefs = {};

  // eslint-disable-next-line no-cond-assign
  if (middleware = classRegMatch.exec(template)) {
    let [, deps] = middleware;

    if (deps) {
      ngAnnotateRefs.hasDeps = true;
      ngAnnotateRefs.deps = deps;
    } else {
      ngAnnotateRefs.hasDeps = false;
    }
  }

  return ngAnnotateRefs;
}