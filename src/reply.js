/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

/**
 * @description - generate annotate code from analyze
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