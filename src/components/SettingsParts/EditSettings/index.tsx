import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useMutation, useReactiveVar } from '@apollo/client'
import { UPDATE_USER } from '@gql'
import { Form, Button, SettingsFormHeader, Spinner } from '@components'
import { loggedInUserVar } from '@lib'
import { breakpoint, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/editSettings'

const EditSettings = () => {
  const [updateUser] = useMutation(UPDATE_USER)
  const loggedInUser = useReactiveVar(loggedInUserVar)

  const [data, setData] = useState<FormState>()
  useEffect(() => {
    // set initialState
    if (!!data || !loggedInUser) return
    setData({
      ...initialState,
      artizenHandle: loggedInUser?.artizenHandle || initialState.artizenHandle,
      email: loggedInUser?.email || initialState.email,
    })
  }, [loggedInUser])

  const [processing, setProcessing] = useState(false)
  // todo: replace processing with [loading] from useMutation

  const saveChanges = async () => {
    if (!loggedInUser) return
    setProcessing(true)
    await updateUser({ variables: { ...loggedInUser, ...data } })
    setProcessing(false)
  }

  return !loggedInUser || !data ? (
    <Spinner minHeight="85vh" />
  ) : (
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
    'artizenHandle'
    'phoneNumber'
    'saveChanges';

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

  *[id='#/properties/email'] {
    grid-area: email;
  }

  *[id='#/properties/phoneNumber'] {
    grid-area: phoneNumber;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
`

export default EditSettings
