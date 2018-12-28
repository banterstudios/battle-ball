const getConfig = ({ name, isProduction }) => (
  isProduction
    ? require(`./build-config/${name}/webpack.prod`)
    : require(`./build-config/${name}/webpack.dev`)
)

module.exports = ({ production } = {}) => {
  const clientConfig = getConfig({ name: 'client', isProduction: production })
  const serverConfig = getConfig({ name: 'server', isProduction: production })

  return [ clientConfig, serverConfig ]
}
