import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel';

export default {
  entry: 'endomembrane.js',
  dest: 'dist/endomembrane.js',
  moduleName: 'Endomembrane',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  format: 'umd'
}