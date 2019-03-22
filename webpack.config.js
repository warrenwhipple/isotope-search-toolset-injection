var path = require('path');

module.exports = {
  output: {
    filename: 'isotope-search.js',
    library: 'isotopeSearch',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'dev'),
      path.join(__dirname, 'node_modules/jquery/dist'),
    ],
    watchContentBase: true,
  },
};
