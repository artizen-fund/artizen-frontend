import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { Button } from '@components'
import { UserContext, uploadToCloudinary, InvisiFileInput } from '@lib'
import { UPDATE_USER } from '@gql'

const BannerUploadWidget = () => {
  const { loggedInUser } = useContext(UserContext)

  const [newBanner, setNewBanner] = useState<File>()
  useEffect(() => {
    if (!!newBanner) uploadBanner(newBanner)
  }, [newBanner])

  const [updateUser] = useMutation(UPDATE_USER)
  const uploadBanner = async (newAvatar: File) => {
    if (!loggedInUser) return
    try {
      let bannerImage = undefined
      if (newAvatar) {
        const cloudinaryResponse = await uploadToCloudinary(newAvatar)
        bannerImage = cloudinaryResponse.secure_url
      }
      await updateUser({ variables: { ...loggedInUser, bannerImage } })
    } catch (error) {
      console.error('Error saving new user profile', error)
    }
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
