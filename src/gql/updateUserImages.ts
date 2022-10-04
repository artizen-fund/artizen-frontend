import { gql } from '@apollo/client'

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($id: uuid, $profileImage: String) {
    update_User(where: { id: { _eq: $id } }, _set: { profileImage: $profileImage }) {
      returning {
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
  }
`
