const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  name: 'server',
  entry: './server',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  target: 'node',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
