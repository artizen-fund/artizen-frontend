import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useReactiveVar } from '@apollo/client'
import { rgba, uploadToCloudinary, InvisiFileInput, loggedInUserVar } from '@lib'
import { palette, breakpoint } from '@theme'
import { UPDATE_USER } from '@gql'
import { Maybe } from '@types'

// TODO: look at combining this into a lib with BannerUploadWidget

const AvatarUploadWidget = () => {
  const loggedInUser = useReactiveVar(loggedInUserVar)
  const [updateUser] = useMutation(UPDATE_USER)

  const [newAvatar, setNewAvatar] = useState<File>()
  useEffect(() => {
    if (!newAvatar || !loggedInUser) return
    uploadAvatar(newAvatar)
  }, [newAvatar, loggedInUser])

  const uploadAvatar = async (newAvatar: File) => {
    let profileImage = undefined
    if (newAvatar) {
      const cloudinaryResponse = await uploadToCloudinary(newAvatar)
      profileImage = cloudinaryResponse.secure_url
    }
    await updateUser({
      variables: { ...loggedInUser, profileImage },
      onError: error => console.error('Error saving new user profile', error),
    })
    // todo: prompt loggedInUser to reload reactive var
  }

  return (
    <ProfileAvatar profileImage={loggedInUser?.profileImage}>
      <InvisiFileInput setFile={setNewAvatar} />
    </ProfileAvatar>
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
