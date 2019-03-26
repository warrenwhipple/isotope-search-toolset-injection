const { src, dest, watch, series, parallel } = require('gulp');
const webpack = require('webpack-stream');
const server = require('browser-sync').create();

function scripts(done) {
  src('./src/index.js').pipe(
    webpack({
      mode: 'production',
      output: {
        filename: 'isotope-search.js',
        library: 'isotopeSearch',
        libraryTarget: 'umd',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
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
    })
  );
  done();
}

function serve(done) {
  server.init({
    server: ['dist', 'dev', 'node_modules/jquery/dist'],
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

function watchSrc() {
  watch('./src/**/*.js', series(scripts, reload));
}

function watchDev() {
  watch('./dev/**/*.*', reload);
}

exports.build = series(scripts);
exports.dev = series(scripts, serve, parallel(watchSrc, watchDev));
