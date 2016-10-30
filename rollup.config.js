import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
    babel()
  ],
  external: [
    'path',
    'fs',
    'rollup-pluginutils',
    'lodash'
  ],
  globals: {},
  targets: [
    {format: 'cjs', dest: 'dist/index.js'}
  ]
};