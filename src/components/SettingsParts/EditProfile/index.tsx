import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useApolloClient, useQuery } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { CHECK_FOR_EXISTING_ARTIZENHANDLE, UPDATE_USER_PROFILE } from '@gql'
import { ICheckForExistingArtizenHandleQuery } from '@types'
import { Form, Button, Spinner } from '@components'
import { UserContext } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/editProfile'

const EditProfile = () => {
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  const [data, setData] = useState<FormState>({
    artizenHandle: loggedInUser?.artizenHandle || initialState.artizenHandle,
    firstName: loggedInUser?.firstName || initialState.firstName,
    lastName: loggedInUser?.lastName || initialState.lastName,
    email: loggedInUser?.email || initialState.email,
    bio: loggedInUser?.bio || initialState.bio,
    twitterLink: loggedInUser?.twitterLink || initialState.twitterLink,
    twitterHandle: loggedInUser?.twitterHandle || initialState.twitterHandle,
    instagramHandle: loggedInUser?.instagramHandle || initialState.instagramHandle,
    discordHandle: loggedInUser?.discordHandle || initialState.discordHandle,
    website: loggedInUser?.website || initialState.website,
  })

  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])
  const [processing, setProcessing] = useState(false)

  const saveChanges = async () => {
    if (!loggedInUser) return
    setProcessing(true)
    await apolloClient.mutate({
      mutation: UPDATE_USER_PROFILE,
      variables: { id: loggedInUser.id, ...data },
    })
    setProcessing(false)
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
      {!loggedInUser ? (
        <Spinner />
      ) : (
        <Form {...{ schema, uischema, initialState, data, setData, additionalErrors }} readonly={processing}>
          <StyledButton disabled={processing} onClick={() => saveChanges()} stretch level={1}>
            Save Changes
          </StyledButton>
        </Form>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'artizenHandle artizenHandle'
    'firstName lastName'
    'email email'
    'phoneNumber phoneNumber'
    'bio bio'
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

  *[id='#/properties/firstName'] {
    grid-area: firstName;
  }

  *[id='#/properties/lastName'] {
    grid-area: lastName;
  }

  *[id='#/properties/email'] {
    grid-area: email;
  }

  *[id='#/properties/phoneNumber'] {
    grid-area: phoneNumber;
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

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
`

export default EditProfile
