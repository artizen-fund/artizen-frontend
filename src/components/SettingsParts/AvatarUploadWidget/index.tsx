import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { rgba, UserContext, uploadToCloudinary, InvisiFileInput } from '@lib'
import { palette, breakpoint } from '@theme'
import { UPDATE_USER } from '@gql'
import { Maybe } from '@types'

const AvatarUploadWidget = () => {
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  const [newAvatar, setNewAvatar] = useState<File>()
  useEffect(() => {
    if (!!newAvatar) uploadAvatar(newAvatar)
  }, [newAvatar])

  const uploadAvatar = async (newAvatar: File) => {
    if (!loggedInUser) return
    try {
      let profileImage = undefined
      if (newAvatar) {
        const cloudinaryResponse = await uploadToCloudinary(newAvatar)
        profileImage = cloudinaryResponse.secure_url
      }
      const variables = { id: loggedInUser.id, profileImage }
      await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables,
      })
    } catch (error) {
      console.error('Error saving new user profile', error)
    }
  }
  return (
    <InvisiFileInput setFile={setNewAvatar}>
      <ProfileAvatar profileImage={loggedInUser?.profileImage} />
    </InvisiFileInput>
  )
}

const ProfileAvatar = styled.div<{ preview?: string; profileImage?: Maybe<string> }>`
  position: absolute;
  z-index: 1;
  width: 104px;
  height: 104px;
  left: calc(50% - 52px);
  bottom: -52px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 132px;
    height: 132px;
    left: calc(50% - 66px);
    bottom: -66px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 160px;
    height: 160px;
    left: calc(50% - 80px);
    bottom: -80px;
  }

  border-radius: 9999px;
  border: 4px solid ${rgba(palette.white)};
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    border-width: 6px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    border-width: 8px;
  }
  background: ${rgba(palette.stone)};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${props =>
    !!props.preview
      ? `
        background-image: url('${props.preview}');
      `
      : !!props.profileImage
      ? `
        background-image: url('${props.profileImage}');
      `
      : `
        background-image: none;
      `}
`

export default AvatarUploadWidget
