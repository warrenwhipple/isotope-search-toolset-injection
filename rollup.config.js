import pkg from "./package.json";

export default [
  {
    input: "src/main.js",
    output: {
      name: "isotopeSearch",
      file: pkg.browser,
      format: "umd"
    },
    plugins: []
  }
];
