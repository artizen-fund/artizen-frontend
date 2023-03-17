import { request } from '@playwright/test'
import { graphqlURL, graphqlAdminSecret, deleteTestSeasonMutationDoc } from './graphql'

export async function deleteTestSeasonFromDb() {
  const context = await request.newContext({
    baseURL: graphqlURL,
  })

  const result = await context.post('/v1/graphql/', {
    headers: {
      'X-Hasura-Admin-Secret': graphqlAdminSecret,
    },
    data: {
      query: deleteTestSeasonMutationDoc,
      operationName: 'DeleteTestSeason',
    },
  })

  const resJSON = await result.json()
  console.log(JSON.stringify(resJSON))
}
