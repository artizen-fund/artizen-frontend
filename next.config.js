const { withSentryConfig } = require('@sentry/nextjs')
const withGraphql = require('next-plugin-graphql')

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
]

const moduleExports = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  webpack: config => {
    config.resolve.fallback = { net: false, tls: false, fs: false, request: false }

    return config
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  }
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  token: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withGraphql(withSentryConfig(moduleExports, sentryWebpackPluginOptions))
