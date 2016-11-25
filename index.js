/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const { createFilter } = require('rollup-pluginutils');
const { analyzeExplicitReference, analyzeImplicitReference } = require('./src/analyze');
const { annotateDependencyInjection } = require('./src/engine');

module.exports = annotate;

function annotate(opts = {}) {
  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'ng-annotate',
    transform(code, id) {
      if (filter(id)) {
        let ngAnnotateRefs;
        let ngAnnotateCode;
        // 为函数声明添加 strict-di 标记内容
        ngAnnotateRefs = [...analyzeExplicitReference(code), ...analyzeImplicitReference(code)];
        ngAnnotateCode = annotateDependencyInjection(ngAnnotateRefs);

        return {
          code: ngAnnotateCode ? `${code} \n ${ngAnnotateCode}` : code,
          map: {mappings: ''}
        };
      }
    }
  };
}