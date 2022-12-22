import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_SELF, GET_SELF } from '@gql'
import { Form, Button, SettingsFormHeader } from '@components'
import { breakpoint, typography } from '@theme'
import { IGetSelfQuery, IUpdateSelfMutation } from '@types'
import { schema, uischema, initialState, FormState } from '@forms/editSettings'

const EditSettings = () => {
  const [updateUser, { loading }] = useMutation<IUpdateSelfMutation>(UPDATE_SELF)
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })

  const [data, setData] = useState<FormState>(initialState)
  useEffect(() => {
    setData({
      firstName: loggedInUser?.Users[0].firstName || initialState.firstName,
      lastName: loggedInUser?.Users[0].lastName || initialState.lastName,
      email: loggedInUser?.Users[0].email || initialState.email,
    })
  }, [loggedInUser])

  const saveChanges = async () => {
    if (!loggedInUser) return
    await updateUser({ variables: { ...loggedInUser.Users[0], ...data } })
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
        <Form {...{ schema, uischema, initialState, data, setData }} readonly={loading}>
          <StyledButton disabled={loading} onClick={() => saveChanges()} stretch level={0}>
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
