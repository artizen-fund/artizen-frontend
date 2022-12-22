import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { rgba, useCloudinary, InvisiFileInput } from '@lib'
import { palette, breakpoint } from '@theme'
import { UPDATE_SELF, GET_SELF } from '@gql'
import { Maybe, IGetSelfQuery, IUpdateSelfMutation } from '@types'

// TODO: look at combining this into a lib with BannerUploadWidget

const AvatarUploadWidget = () => {
  const [updateSelf] = useMutation<IUpdateSelfMutation>(UPDATE_SELF)
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })

  const [newAvatar, setNewAvatar] = useState<File>()
  useEffect(() => {
    if (!newAvatar) return
    uploadAvatar(newAvatar)
  }, [newAvatar])

  const { upload } = useCloudinary()
  const uploadAvatar = async (newAvatar: File) => {
    let profileImage = undefined
    if (newAvatar) {
      const cloudinaryResponse = await upload(newAvatar)
      profileImage = cloudinaryResponse?.secure_url
    }
    await updateSelf({
      variables: { ...loggedInUser?.Users[0], profileImage },
      onError: error => console.error('Error saving new user profile', error),
    })
    // todo: prompt loggedInUser to reload reactive var
  }

  return (
    <ProfileAvatar profileImage={loggedInUser?.Users[0].profileImage}>
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
