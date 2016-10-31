/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { isEmpty } from 'lodash';
import { createFilter } from 'rollup-pluginutils';
import { analyzeAnnotateRef, analyzeClassAnnotateRef } from './src/parse';
import { replyAnnotateRef, replayClassAnnotateRef } from './src/reply';

export default function annotate(opts = {}) {
  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'ng-annotate',
    transform(code, id) {
      if (filter(id)) {
        let ngAnnotateCode;
        let ngAnnotateRefs = analyzeAnnotateRef(code);
        let ngAnnotateClassRef = analyzeClassAnnotateRef(code);

        // 为函数声明添加 strict-di 标记内容
        if (!isEmpty(ngAnnotateRefs)) {
          ngAnnotateCode = replyAnnotateRef(ngAnnotateRefs);

          return {
            code: `${ngAnnotateCode}\n${code}`,
            map: {mappings: ''}
          };
        }

        // 为 class controller 声明添加 strict-di 标记内容
        if (!isEmpty(ngAnnotateClassRef)) {
          ngAnnotateCode = replayClassAnnotateRef(ngAnnotateClassRef, code);

          return {
            code: ngAnnotateCode,
            map: {mappings: ''}
          };
        }
      }
    }
  };
}