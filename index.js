/**
 * @description - rollup-plugin-ng-annotate
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { createFilter } from 'rollup-pluginutils';
import { analyzeAnnotateRef } from './src/parse';
import { replyAnnotateRef } from './src/reply';

export default function annotate(opts = {}) {
  const filter = createFilter(opts.include, opts.exclude);
  
  return {
    name: 'ng-annotate',
    transform(code, id) {
      if (filter(id)) {
        let ngAnnotateRefs = analyzeAnnotateRef(code);
        let ngAnnotateCode = replyAnnotateRef(ngAnnotateRefs);
        
        return {
          code: `${ngAnnotateCode}\n${code}`,
          map: {mappings: ''}
        };
      }
    }
  };
}