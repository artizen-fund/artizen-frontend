import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useApolloClient, useQuery } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { CHECK_FOR_EXISTING_ARTIZENHANDLE, UPDATE_USER_PROFILE } from '@gql'
import { ICheckForExistingArtizenHandleQuery } from '@types'
import { Form, Button, SettingsFormHeader } from '@components'
import { UserContext } from '@lib'
import { breakpoint, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/editProfile'

const EditProfile = () => {
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  const [data, setData] = useState<FormState>({
    artizenHandle: loggedInUser?.artizenHandle || initialState.artizenHandle,
    bio: loggedInUser?.bio || initialState.bio,
    twitterHandle: loggedInUser?.twitterHandle || initialState.twitterHandle,
    instagramHandle: loggedInUser?.instagramHandle || initialState.instagramHandle,
    discordHandle: loggedInUser?.discordHandle || initialState.discordHandle,
    website: loggedInUser?.website || initialState.website,
  })

  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])
  const [readonly, setReadonly] = useState(false)

  const saveChanges = async () => {
    if (!loggedInUser) return
    setReadonly(true)
    await apolloClient.mutate({
      mutation: UPDATE_USER_PROFILE,
      variables: { id: loggedInUser.id, ...data },
    })
    setReadonly(false)
  }

  const [newArtizenHandle] = useDebounce(data.artizenHandle, 500)
  useQuery<ICheckForExistingArtizenHandleQuery>(CHECK_FOR_EXISTING_ARTIZENHANDLE, {
    variables: { id: loggedInUser?.id, artizenHandle: newArtizenHandle },
    onError: error => console.error('error ', error),
    fetchPolicy: 'no-cache',
    onCompleted: async ({ User }) => {
      const errors: Array<ErrorObject> = []
      if (User.length > 0) {
        errors.push({
          instancePath: '/artizenHandle',
          message: 'Handle is already in use',
          schemaPath: '#/properties/artizenHandle',
          keyword: '',
          params: {},
        })
      }
      setAdditionalErrors(errors)
    },
  })

  return (
    <Wrapper>
      <SettingsFormHeader
        imgPath="/assets/illustrations/settings/profile.png"
        darkImgPath="/assets/illustrations/settings/profile-dark.png"
        title="Public Profile"
        subtitle="Your public profile is visible to everyone"
      />
      <FormWrapper>
        <Form {...{ schema, uischema, initialState, data, setData, additionalErrors, readonly }}>
          <StyledButton onClick={() => saveChanges()} stretch level={0}>
            Save Changes
          </StyledButton>
        </Form>
        <SocialLinksBanner>Social Links</SocialLinksBanner>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const FormWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'artizenHandle artizenHandle'
    'email email'
    'bio bio'
    'socialLinksBanner socialLinksBanner'
    'website website'
    'twitterHandle twitterHandle'
    'instagramHandle instagramHandle'
    'discordHandle discordHandle'
    'saveChanges saveChanges';

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/artizenHandle'] {
    grid-area: artizenHandle;
  }

  *[id='#/properties/bio'] {
    grid-area: bio;
  }

  *[id='#/properties/website'] {
    grid-area: website;
  }

  *[id='#/properties/twitterHandle'] {
    grid-area: twitterHandle;
  }

  *[id='#/properties/discordHandle'] {
    grid-area: discordHandle;
  }

  *[id='#/properties/instagramHandle'] {
    grid-area: instagramHandle;
  }
`

const SocialLinksBanner = styled.div`
  grid-area: socialLinksBanner;
  margin-top: 20px;
  ${typography.label.l1}
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
`

export default EditProfile
