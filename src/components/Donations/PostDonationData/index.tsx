import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Form, Button, AvatarForm } from '@components'
import { useFormLocalStorage, UserContext, DonationContext } from '@lib'
import { UPDATE_NEW_USER_PROFILE } from '@gql'
import { schema, uischema, initialState, FormState } from '@forms/postDonationData'

const PostDonationData = () => {
  const { visibleModal, toggleModal } = useContext(DonationContext)
  const LOCALSTORAGE_KEY = 'postdonationdata'
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)
  const [readonly, setReadonly] = useState(false)

  const submit = async () => {
    setReadonly(true)
    if (!loggedInUser) return
    try {
      await apolloClient.mutate({
        mutation: UPDATE_NEW_USER_PROFILE,
        variables: { id: loggedInUser.id, ...data },
      })
      toggleModal?.()
    } catch (error) {
      console.error('Error saving new user profile', error)
    }
    setReadonly(false)
  }

  return (
    <Wrapper visible={visibleModal === 'postDonationData'}>
      <FormWrapper hasFirstName={!!loggedInUser?.firstName} hasLastName={!!loggedInUser?.lastName} hasUsername={false}>
        <CloseButton onClick={() => toggleModal?.()} />
        <AvatarForm />
        <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
          <Button onClick={() => submit()}>Submit</Button>
        </Form>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
  transition: opacity 0.3s ease-in-out;
`

const FormWrapper = styled.div<{ hasFirstName: boolean; hasLastName: boolean; hasUsername: boolean }>`
  position: relative;

  *[id='#/properties/firstName'] {
    display: ${props => (props.hasFirstName ? 'none' : 'block')};
    grid-area: email;
  }
  *[id='#/properties/lastName'] {
    display: ${props => (props.hasLastName ? 'none' : 'block')};
    grid-area: email;
  }
  *[id='#/properties/username'] {
    display: ${props => (props.hasUsername ? 'none' : 'block')};
    grid-area: email;
  }
}
`

const CloseButton = styled.div``

export default PostDonationData
