import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'isotopeSearch',
      file: 'dist/isotope-search.js',
      format: 'iife',
    },
    plugins: [resolve()],
  },
  {
    input: 'src/main.js',
    output: {
      name: 'isotopeSearch',
      file: 'dist/isotope-search.min.js',
      format: 'iife',
    },
    plugins: [resolve(), terser()],
  },
];
