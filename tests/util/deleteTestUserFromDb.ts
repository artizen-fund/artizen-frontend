import { request } from '@playwright/test'
import { graphqlURL, graphqlAdminSecret, deleteTestUserMutationDoc } from './graphql'

export async function deleteTestUserFromDb() {
  const context = await request.newContext({
    baseURL: graphqlURL,
  })

  // async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await context.post('/v1/graphql/', {
    headers: {
      'X-Hasura-Admin-Secret': graphqlAdminSecret,
    },
    data: {
      query: deleteTestUserMutationDoc,
      operationName: 'MyMutation',
    },
  })

  const resJSON = await result.json()
  console.log(JSON.stringify(resJSON))
}
