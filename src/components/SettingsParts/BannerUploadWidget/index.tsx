import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@components'
import { useCloudinary, InvisiFileInput } from '@lib'
import { UPDATE_SELF, GET_SELF } from '@gql'
import { IGetSelfQuery, IUpdateSelfMutation } from '@types'

// TODO: look at combining this into a lib with AvatarUploadWidget

const BannerUploadWidget = () => {
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })
  const [updateSelf] = useMutation<IUpdateSelfMutation>(UPDATE_SELF)

  const [newBanner, setNewBanner] = useState<File>()
  useEffect(() => {
    if (!newBanner) return
    uploadBanner(newBanner)
  }, [newBanner])

  const { upload } = useCloudinary()
  const uploadBanner = async (newAvatar: File) => {
    let bannerImage = undefined
    if (newAvatar) {
      const cloudinaryResponse = await upload(newAvatar)
      bannerImage = cloudinaryResponse.secure_url
    }
    await updateSelf({
      variables: { ...loggedInUser?.Users[0], bannerImage },
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
