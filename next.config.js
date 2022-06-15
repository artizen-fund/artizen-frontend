const withGraphql = require('next-plugin-graphql')

// const LEGACY_DOMAIN = 'https://legacy.artizen.fund'

module.exports = withGraphql({
  reactStrictMode: true,
  compiler: { styledComponents: true },
  // images: {
  //   domains: ['res.cloudinary.com'],
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/index/:slug*',
  //       destination: `/`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/project/:slug*',
  //       destination: `${LEGACY_DOMAIN}/project/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/edit-project/:slug*',
  //       destination: `${LEGACY_DOMAIN}/project/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/projects/:slug*',
  //       destination: `${LEGACY_DOMAIN}/project/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/grant/:slug*',
  //       destination: `${LEGACY_DOMAIN}/grant/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/edit-grant/:slug*',
  //       destination: `${LEGACY_DOMAIN}/project/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/grants/:slug*',
  //       destination: `${LEGACY_DOMAIN}/grants/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/member/:slug*',
  //       destination: `${LEGACY_DOMAIN}/member/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/members/:slug*',
  //       destination: `${LEGACY_DOMAIN}/members/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/loves/:slug*',
  //       destination: `${LEGACY_DOMAIN}/loves/:slug*`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/inbox',
  //       destination: `${LEGACY_DOMAIN}/inbox`,
  //       permanent: false,
  //     },
  //     {
  //       source: '/settings/:slug*',
  //       destination: `${LEGACY_DOMAIN}/settings/:slug*`,
  //       permanent: false,
  //     },
  //   ]
  // },
})
