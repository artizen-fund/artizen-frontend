import { InMemoryCache, Reference, makeVar } from '@apollo/client'
import { isEqual } from 'lodash'
import type { MagicUserMetadata } from 'magic-sdk'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        /* Hasura fields */
        exampleEntities: {
          keyArgs: false,
        },
        Project: {
          // Don't cache separate results based on any of this field's arguments.
          // keyArgs: ['where'],
          keyArgs: false,
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
        User: {
          // Don't cache separate results based on any of this field's arguments.
          // keyArgs: ['where'],
          keyArgs: ['where'],
          // Concatenate the incoming list items with the existing list items.
          merge(existing, incoming) {
            return !existing ? incoming : [...existing, ...incoming]
          },
        },

        /* local (client) fields */
        userToken: {
          read() {
            return userTokenVar()
          },
        },
        userMetadata: {
          read() {
            return userMetadataVar()
          },
        },
      },
    },
  },
})

export const userTokenVar = makeVar<string | undefined>(undefined)

export const userMetadataVar = makeVar<MagicUserMetadata | undefined>(undefined)
