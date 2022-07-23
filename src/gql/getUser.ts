import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($issuer: String) {
    User(where: { issuer: { _eq: $issuer } }) {
      id
      email
      firstName
      lastName
      bio
      profileImage
      globalTitle
      globalRole
      website
      linkedinLink
      twitterLink
      company
    }
  }
`

export const mockGetUserData = [
  {
    request: {
      query: GET_USER,
      variables: {
        issuer: 'herpderp',
      },
    },
    result: {
      data: {
        User: [
          {
            id: '1',
            email: 'rene@artizen.fund',
            firstName: 'René',
            lastName: 'Pinnell',
            bio: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
            profileImage: 'https://images.com/rene.jpg',
            globalTitle: 'founder',
            globalRole: 'Dude',
            website: 'https://artizen.fund',
            linkedinLink: 'https://linkedin.com',
            twitterLink: 'https://twitter.com',
            company: 'Artizen',
            issuer: 'herpderp',
          },
        ],
      },
    },
  },
]
