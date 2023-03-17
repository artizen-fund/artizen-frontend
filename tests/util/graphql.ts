export const graphqlURL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL
  ? process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL
  : 'https://artizen-dev.hasura.app/v1/graphql'

export const graphqlAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET ? process.env.HASURA_GRAPHQL_ADMIN_SECRET : ''

export const deleteTestUserMutationDoc: string = `
mutation MyMutation {
delete_Users(where: {publicAddress: {_ilike: "0x7e4abd63a7c8314cc28d388303472353d884f292"}}) {
  returning {
    id
  }
}
}
`

export const deleteTestSeasonMutationDoc: string = `
mutation DeleteTestSeason {
delete_Seasons(where: {title: {_like: "playwright test title"}}) {
  returning {
    id
  }
}
}
`
