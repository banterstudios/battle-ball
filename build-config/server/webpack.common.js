const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.resolve(__dirname, '../../')
const entryPath = path.resolve(rootPath, 'server/index.js')
const outputPath = path.resolve(rootPath, 'build-server')

const cleanWebpackBuild = new CleanWebpackPlugin(['build-server'], {
  root: rootPath,
  verbose: true,
  dry: false,
  exclude: ['.gitkeep']
})

module.exports = {
  name: 'server',
  target: 'node',
  entry: entryPath,
  externals: [nodeExternals()],
  output: {
    path: outputPath,
    filename: 'server.js'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    cleanWebpackBuild,
    new webpack.IgnorePlugin(/\.(css|less|scss)$/)
  ]
}
