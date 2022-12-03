import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '@gql'
import { Form, Button, SettingsFormHeader } from '@components'
import { UserContext } from '@lib'
import { breakpoint, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/createGrants'

const CreateGrants = () => {
  const [updateUser] = useMutation(UPDATE_USER)
  const { loggedInUser } = useContext(UserContext)

  const [data, setData] = useState<FormState>({
    firstName: loggedInUser?.firstName || initialState.firstName,
    lastName: loggedInUser?.lastName || initialState.lastName,
    email: loggedInUser?.email || initialState.email,
  })

  const [processing, setProcessing] = useState(false)
  // todo: replace processing with [loading] from useMutation

  const saveChanges = async () => {
    if (!loggedInUser) return
    setProcessing(true)
    await updateUser({ variables: { ...loggedInUser, ...data } })
    setProcessing(false)
  }

  return (
    <FormWrapper>
      <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}>
        <StyledButton disabled={processing} onClick={() => saveChanges()} stretch level={0}>
          Save Changes
        </StyledButton>
      </Form>
    </FormWrapper>
  )
}

const Wrapper = styled.div``

const FormWrapper = styled.div`
  padding: 100px;
  .group-layout legend {
    display: block;
    margin: 0 0 10px;
    font-size: 30px;
  }
  // display: grid;
  // justify-items: stretch;
  // gap: 10px;
  // grid-template-areas:
  //   'startDate startDate'
  //   'season season'
  //   @media only screen and (min-width: ${breakpoint.desktop}px) {
  //   gap: 16px;
  // }
  // .vertical-layout,
  // .vertical-layout-item {
  //   display: contents;
  // }
  * [id='#/properties/startDate'] {
    grid-area: startDate;
  }

  *[id='#/properties/season'] {
    grid-area: season;
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

export default CreateGrants
