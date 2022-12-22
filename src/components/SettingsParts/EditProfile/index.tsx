import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { CHECK_FOR_EXISTING_ARTIZENHANDLE, UPDATE_USER, GET_SELF } from '@gql'
import { ICheckForExistingArtizenHandleQuery, IGetSelfQuery } from '@types'
import { Form, Button, SettingsFormHeader } from '@components'
import { breakpoint, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/editProfile'

const EditProfile = () => {
  const [updateUser] = useMutation(UPDATE_USER)
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })

  const [data, setData] = useState<FormState>(initialState)
  useEffect(() => {
    setData({
      artizenHandle: loggedInUser?.Users[0].artizenHandle || initialState.artizenHandle,
      bio: loggedInUser?.Users[0].bio || initialState.bio,
      twitterHandle: loggedInUser?.Users[0].twitterHandle || initialState.twitterHandle,
      instagramHandle: loggedInUser?.Users[0].instagramHandle || initialState.instagramHandle,
      discordHandle: loggedInUser?.Users[0].discordHandle || initialState.discordHandle,
      website: loggedInUser?.Users[0].website || initialState.website,
    })
  }, [loggedInUser])

  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])
  const [readonly, setReadonly] = useState(false)
  // todo: replace readonly with [loading] from useMutation

  const saveChanges = async () => {
    if (!loggedInUser) return
    setReadonly(true)
    // todo: replace this force-lowercase with a mutation event in hasura
    await updateUser({ variables: { ...loggedInUser, ...data, artizenHandle: data.artizenHandle?.toLowerCase() } })
    setReadonly(false)
  }

  const [newArtizenHandle] = useDebounce(data.artizenHandle, 500)
  useQuery<ICheckForExistingArtizenHandleQuery>(CHECK_FOR_EXISTING_ARTIZENHANDLE, {
    variables: {
      where: {
        _and: [
          { artizenHandle: { _eq: newArtizenHandle?.toLowerCase() } },
          { id: { _neq: loggedInUser?.Users[0].id } },
        ],
      },
    },
    onError: error => console.error('error ', error),
    fetchPolicy: 'no-cache',
    onCompleted: async response => {
      const errors: Array<ErrorObject> = []
      if (response.Users.length > 0) {
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
