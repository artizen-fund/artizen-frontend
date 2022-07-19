const path = require('path')

module.exports = ({ config }) => {
  config.resolve.modules = [path.resolve(__dirname, '..', 'src'), 'node_modules']

  config.resolve.alias = {
    '@components': path.resolve(__dirname, '..', 'src', 'components'),
    '@contracts': path.resolve(__dirname, '..', 'src', 'contracts'),
    '@forms': path.resolve(__dirname, '..', 'src', 'forms'),
    '@pages': path.resolve(__dirname, '..', 'src', 'pages', '*'),
    '@public': path.resolve(__dirname, '..', 'public', '*'),
    '@theme': path.resolve(__dirname, '..', 'src', 'theme'),
    '@gql': path.resolve(__dirname, '..', 'src', 'gql'),
    '@lib': path.resolve(__dirname, '..', 'src', 'lib'),
    '@types': path.resolve(__dirname, '..', 'src', 'types'),
    '@copy': path.resolve(__dirname, '..', 'copy', '*'),
  }

  // We're using several that don't play nicely with Webpack5.
  // https://github.com/crypto-browserify/cipher-base/issues/10
  config.resolve.fallback = { http: false, os: false, https: false, crypto: false, stream: false }

  return config
}
