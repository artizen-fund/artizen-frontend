import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useApolloClient, useQuery } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { CHECK_FOR_EXISTING_ARTIZENHANDLE, UPDATE_USER_PROFILE } from '@gql'
import { ICheckForExistingArtizenHandleQuery } from '@types'
import { Form, Button, Spinner, SettingsFormHeader } from '@components'
import { UserContext, rgba } from '@lib'
import { breakpoint, typography, palette } from '@theme'
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
      <SettingsFormHeader
        imgPath="/assets/illustrations/donations/donation.png"
        title="Account Settings"
        subtitle="Check your settings below."
      />
      <FormWrapper>
        {!loggedInUser ? (
          <Spinner />
        ) : (
          <Form {...{ schema, uischema, initialState, data, setData, additionalErrors }} readonly={processing}>
            <StyledButton disabled={processing} onClick={() => saveChanges()} stretch level={0}>
              Save Changes
            </StyledButton>
          </Form>
        )}
        <NotificationsBanner>Receive email notifications for the following</NotificationsBanner>
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
