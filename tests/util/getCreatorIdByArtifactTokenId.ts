import { request } from '@playwright/test'
import { graphqlURL, graphqlAdminSecret, getCreatorIdByArtifactTokenIdGql } from './graphql'

export async function getCreatorIdByArtifactTokenId(tokenId: string) {
  const context = await request.newContext({
    baseURL: graphqlURL,
  })

  const result = await context.post('/v1/graphql/', {
    headers: {
      'X-Hasura-Admin-Secret': graphqlAdminSecret,
    },
    data: {
      query: getCreatorIdByArtifactTokenIdGql(tokenId),
      operationName: 'getCreatorIdByArtifactTokenId',
    },
  })

  const resJSON = await result.json()
  console.log(JSON.stringify(resJSON))
  return resJSON.data.Projects[0].members[0].user.publicAddress
}
