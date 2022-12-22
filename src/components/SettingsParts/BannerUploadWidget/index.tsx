import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Button } from '@components'
import { useCloudinary, InvisiFileInput, loggedInUserVar } from '@lib'
import { UPDATE_USER } from '@gql'

// TODO: look at combining this into a lib with AvatarUploadWidget

const BannerUploadWidget = () => {
  const loggedInUser = useReactiveVar(loggedInUserVar)
  const [updateUser] = useMutation(UPDATE_USER)

  const [newBanner, setNewBanner] = useState<File>()
  useEffect(() => {
    if (!newBanner || !loggedInUser) return
    uploadBanner(newBanner)
  }, [newBanner, loggedInUser])

  const { upload } = useCloudinary()
  const uploadBanner = async (newAvatar: File) => {
    let bannerImage = undefined
    if (newAvatar) {
      const cloudinaryResponse = await upload(newAvatar)
      bannerImage = cloudinaryResponse.secure_url
    }
    await updateUser({
      variables: { ...loggedInUser, bannerImage },
      onError: error => console.error('Error saving new user profile', error),
    })
  }

  return (
    <InvisiFileInput setFile={setNewBanner}>
      <UploadBannerButton level={1} glyph="palette">
        Upload Banner
      </UploadBannerButton>
    </InvisiFileInput>
  )
}

const UploadBannerButton = styled(props => <Button {...props} />)`
  position: absolute;
  top: 10px;
  left: 0;
`

export default BannerUploadWidget
