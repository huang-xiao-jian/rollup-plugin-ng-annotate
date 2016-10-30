/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const templateRegMatch = /\/\*\s*@ngInject\s*\*\/\s*function\s+([a-zA-Z]+)\(([^\)]*)\)/gm;

/**
 * @description - analyze annotate refs from source code
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