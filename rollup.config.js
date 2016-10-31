import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
    babel()
  ],
  external: [
    'lodash',
    'rollup-pluginutils'
  ],
  globals: {},
  sourceMap: 'inline',
  targets: [
    {format: 'cjs', dest: 'dist/index.js'}
  ]
};