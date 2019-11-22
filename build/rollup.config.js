import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs';
import url from 'rollup-plugin-asset-url';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/backTop.esm.js',
    format: 'esm',
    name: 'backTop',
    exports: 'named'
  },
  plugins: [
    resolve({
      mainFields: ['main']
    }),
    vue(),
    babel({
      runtimeHelpers: true,
      extensions: ['.js', '.vue']
    }),
    common(),
    url({
      limit: 5 * 1024, // inline files < 5k, copy files > 5k
      include: ['**/*.svg'],
      fileName: '[name][extname]',
      output: '/dist/static/',
      reserveImportInJs: true,
    }),
  ]
};
