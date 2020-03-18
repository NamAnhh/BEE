var webpack = require('webpack');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let pathsToClean = [
  'js/*.*'
]

let cleanOptions = {
  root: path.join(__dirname, 'public/build/')
}

module.exports = {
   entry: {
      'build-cms': path.join(__dirname, 'core/client/app/admin-dashboard/app.jsx')
   },
  output: {
    path: path.join(__dirname, 'public/build/js'),
    publicPath: '/build/js/',
    filename: '[name].js',
    chunkFilename:'[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js|\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css|\.scss?$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
      loader: 'file-loader?limit=100000'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
   new webpack.IgnorePlugin(/jsdom$/),
   new webpack.optimize.UglifyJsPlugin(),
   new webpack.optimize.AggressiveMergingPlugin(),
   new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
};