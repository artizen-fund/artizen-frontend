module.exports = {
  schema: [
    {
      'https://artizen-dev.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'EtjRvMTkKbMWAFvjEMCXVfeTV9votg6UpNLBk4Z8gMvQgyRd6l8yNIfG09I03uHE',
        },
      },
    },
  ],
  documents: ['./src/gql/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/HasuraTypes.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
}
