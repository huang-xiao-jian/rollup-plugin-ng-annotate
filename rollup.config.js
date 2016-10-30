import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
    babel()
  ],
  external: [
    'rollup-pluginutils'
  ],
  globals: {},
  targets: [
    {format: 'cjs', dest: 'dist/index.js'}
  ]
};