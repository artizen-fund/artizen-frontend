import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { UPDATE_USER } from '@gql'
import { Form, Button, SettingsFormHeader } from '@components'
import { UserContext } from '@lib'
import { breakpoint, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/editSettings'

const EditSettings = () => {
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  const [data, setData] = useState<FormState>({
    firstName: loggedInUser?.firstName || initialState.firstName,
    lastName: loggedInUser?.lastName || initialState.lastName,
    email: loggedInUser?.email || initialState.email,
    phoneNumber: loggedInUser?.phoneNumber || initialState.email,
  })

  const [processing, setProcessing] = useState(false)

  const saveChanges = async () => {
    if (!loggedInUser) return
    setProcessing(true)
    await apolloClient.mutate({
      mutation: UPDATE_USER,
      variables: { ...loggedInUser, ...data },
    })
    setProcessing(false)
  }

  return (
    <Wrapper>
      <SettingsFormHeader
        imgPath="/assets/illustrations/settings/profile.png"
        darkImgPath="/assets/illustrations/settings/profile-dark.png"
        title="Account Settings"
        subtitle="Check your settings below."
      />
      <FormWrapper>
        <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}>
          <StyledButton disabled={processing} onClick={() => saveChanges()} stretch level={0}>
            Save Changes
          </StyledButton>
        </Form>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const FormWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'firstName lastName'
    'email email'
    'phoneNumber phoneNumber'
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

  *[id='#/properties/phoneNumber'] {
    grid-area: phoneNumber;
  }
`

const NotificationsBanner = styled.div`
  grid-area: socialLinksBanner;
  margin-top: 20px;
  ${typography.label.l1}
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
`

export default EditSettings
