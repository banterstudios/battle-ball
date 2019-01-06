const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  context: __dirname,
  optimization: {
    sideEffects: false
  },
  node: {
    __dirname: false
  }
})
