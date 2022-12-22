import { InMemoryCache } from '@apollo/client'
import { isEqual } from 'lodash'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        /* Hasura fields */
        Users: {
          // Don't cache separate results based on any of this field's arguments.
          keyArgs: ['where'],
          // Concatenate the incoming list items with the existing list items.
          merge(existing, incoming) {
            return !existing
              ? incoming
              : [
                  ...existing,
                  ...incoming.filter((incomingVar: any) =>
                    existing.every((existingVar: any) => !isEqual(incomingVar, existingVar)),
                  ),
                ]
          },
        },
      },
    },
  },
})
