const Paths = require('./paths');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}

const externals = [];
const internals = ['fabric', 'canvas'];


module.exports = {
  mode: 'production',
  entry: {
    src: './src'
  },
  performance: {
    hints: false
  },
  output: {
    path: Paths.outputPath,
    filename: 'index.js',
    libraryTarget: 'umd',
    hashFunction: 'sha256',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [Paths.srcPath],
        exclude: /(node_modules|bower_components|lib)/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        warnings: false
      }
    }),
    new NoEmitOnErrorsPlugin(),
    new AggressiveMergingPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  stats: {
    modules: true,
  },
};