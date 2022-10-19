import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_AVATAR = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUserAvatar($id: uuid, $profileImage: String) {
    update_User(where: { id: { _eq: $id } }, _set: { profileImage: $profileImage }) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`

export const UPDATE_USER_BANNER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUserBanner($id: uuid, $bannerImage: String) {
    update_User(where: { id: { _eq: $id } }, _set: { bannerImage: $bannerImage }) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
