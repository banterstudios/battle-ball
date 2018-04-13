import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackServerConfig from '../../../webpack.config.server'
import webpackClientConfig from '../../../webpack.config'

// Use this middleware to set up hot module reloading via webpack.
export default (app) => {
  const compiler = webpack([webpackClientConfig, webpackServerConfig])
  const clientCompiler = compiler.compilers.find(({ name }) => name === 'client')
  compiler.apply(new webpack.ProgressPlugin())

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: webpackClientConfig.output.filename,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: true,
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true
  }))

  app.use(webpackHotMiddleware(clientCompiler, {
    log: console.log,
    heartbeat: 10 * 1000
  }))

  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      // Only delete cache for files in server and shared folders
      if (/[/\\](shared|server)[/\\]/.test(id)) {
        delete require.cache[id]
      }
    })
  })
}
