const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.resolve(__dirname, '../../')
const entryPath = path.resolve(rootPath, 'shared/index.js')
const outputPath = path.resolve(rootPath, 'build')
const fileContextPath = path.resolve(rootPath, 'shared/assets')

const cleanWebpackBuild = new CleanWebpackPlugin(['build'], {
  root: rootPath,
  verbose: true,
  dry: false,
  exclude: ['.gitkeep']
})

module.exports = {
  name: 'client',
  target: 'web',
  entry: [
    '@babel/polyfill',
    entryPath
  ],
  output: {
    path: outputPath,
    filename: 'js/app.js',
    publicPath: '/'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js?x$/,
        loader: 'eslint',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?-autoprefixer&sourceMap&minimize',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|eot|mp4|woff2)$/i,
        loader: 'file-loader',
        query: {
          name: 'assets/[path][name].[ext]',
          context: fileContextPath
        }
      }
    ]
  },
  plugins: [
    cleanWebpackBuild,
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
