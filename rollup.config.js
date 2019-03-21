import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'isotopeSearch',
      file: 'dist/isotope-search.js',
      format: 'iife',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  {
    input: 'src/main.js',
    output: {
      name: 'isotopeSearch',
      file: 'dist/isotope-search.min.js',
      format: 'iife',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },
];
