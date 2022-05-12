/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

require('dotenv').config({ path: '.env.local' })

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env.jwt_secret = process.env.JWT_SECRET
  config.env.magic_public_key = process.env.MAGIC_PUBLIC_KEY
  config.env.magic_secret_key = process.env.MAGIC_SECRET_KEY
  config.baseUrl = process.env.BASE_URL
  config.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL =
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL
  config.env.hasura_admin_secret = process.env.HASURA_ADMIN_SECRET
  config.env.NEXT_PUBLIC_STREAMS_API_KEY =
    process.env.NEXT_PUBLIC_STREAMS_API_KEY
  config.env.STREAMS_SECRET = process.env.STREAMS_SECRET
  config.env.NEXT_PUBLIC_STREAMS_APP_ID = process.env.NEXT_PUBLIC_STREAMS_APP_ID

  // do not forget to return the changed config object!

  return config
}
