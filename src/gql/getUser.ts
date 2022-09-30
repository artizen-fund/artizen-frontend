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
      company
      street1
      city
      state
      zip
      country
      website
      linkedinLink
      twitterLink
      twitterHandle
      instagramHandle
      discordHandle
      bannerImage
      artizenHandle
      created_at
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
            company: 'Artizen',
            issuer: 'herpderp',
            street1: '10 Derp Street',
            city: 'Derp City',
            state: 'CA',
            zip: '11111',
            country: 'US',
            website: 'https://artizen.fund',
            linkedinLink: 'https://linkedin.com',
            twitterLink: 'https://twitter.com/herpderp',
            twitterHandle: 'nene',
            instagramHandle: 'nene',
            discordHandle: 'nene',
            bannerImage: 'https://images.com/rene.jpg',
            artizenHandle: 'nene',
            created_at: 'nene',
          },
        ],
      },
    },
  },
]
