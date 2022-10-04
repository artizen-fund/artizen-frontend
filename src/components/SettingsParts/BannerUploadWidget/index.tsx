import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Button } from '@components'
import { UserContext, uploadToCloudinary, InvisiFileInput } from '@lib'
import { UPDATE_USER_BANNER } from '@gql'

const BannerUploadWidget = () => {
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  const [newBanner, setNewBanner] = useState<File>()
  useEffect(() => {
    if (!!newBanner) uploadBanner(newBanner)
  }, [newBanner])

  const uploadBanner = async (newAvatar: File) => {
    if (!loggedInUser) return
    try {
      let bannerImage = undefined
      if (newAvatar) {
        const cloudinaryResponse = await uploadToCloudinary(newAvatar)
        bannerImage = cloudinaryResponse.secure_url
      }
      const variables = { id: loggedInUser.id, bannerImage }
      await apolloClient.mutate({
        mutation: UPDATE_USER_BANNER,
        variables,
      })
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
