import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../../webpack.config'

// Use this middleware to set up hot module reloading via webpack.
export default (app) => {
  const compiler = webpack(webpackConfig())
  const clientCompiler = compiler.compilers.find(({ name }) => name === 'client')
  compiler.apply(new webpack.ProgressPlugin())

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: clientCompiler.options.output.filename,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: true,
    publicPath: clientCompiler.options.output.publicPath,
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
