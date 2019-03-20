import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";

export default [
  {
    input: "src/main.js",
    output: {
      name: "isotopeSearch",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [resolve()]
  },
  {
    input: "src/main.js",
    output: {
      name: "isotopeSearch",
      file: pkg.browserMin,
      format: "umd"
    },
    plugins: [resolve(), terser()]
  }

];
