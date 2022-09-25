import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Form, Button } from '@components'
import { useFormLocalStorage, UserContext } from '@lib'
import { breakpoint } from '@theme'
import { UPDATE_USER_PROFILE } from '@gql'
import { schema, uischema, initialState, FormState } from '@forms/editProfile'

const EditProfile = () => {
  const LOCALSTORAGE_KEY = 'editprofile'

  const apolloClient = useApolloClient()
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)
  const { loggedInUser, loading } = useContext(UserContext)
  useEffect(() => {
    if (loading || !loggedInUser) return
    setData({
      firstName: loggedInUser.firstName || initialState.firstName,
      lastName: loggedInUser.lastName || initialState.lastName,
      email: loggedInUser.email || initialState.email,
      bio: loggedInUser.bio || initialState.bio,
      twitterLink: loggedInUser.twitterLink || initialState.twitterLink,
      website: loggedInUser.website || initialState.website,
    })
  }, [loading, loggedInUser])

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

  return (
    <Wrapper>
      <Form
        localStorageKey={LOCALSTORAGE_KEY}
        {...{ schema, uischema, initialState, data, setData }}
        readonly={processing}
      >
        <StyledButton disabled={processing} onClick={() => saveChanges()} stretch level={1}>
          Save Changes
        </StyledButton>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'firstName lastName'
    'email email'
    'bio bio'
    'twitterLink website'
    'saveChanges saveChanges';

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
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

  *[id='#/properties/bio'] {
    grid-area: bio;
  }

  *[id='#/properties/twitterLink'] {
    grid-area: twitterLink;
  }

  *[id='#/properties/website'] {
    grid-area: website;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
`

export default EditProfile
