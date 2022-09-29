import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { Form, AvatarForm, CheckboxControl, CloseButton } from '@components'
import { UserContext, DonationContext, uploadToCloudinary } from '@lib'
import { UPDATE_NEW_USER_PROFILE } from '@gql'
import { schema, uischema, initialState, FormState } from '@forms/postDonationData'
import {
  CheckWrapper,
  Check,
  CheckMessage,
  SubmitButton,
  Confirmation,
  Copy,
  Headline,
} from '../../Layout/Header/SessionShelf/_common'
import { typography } from '@theme'

const PostDonationData = () => {
  const { loggedInUser } = useContext(UserContext)
  const { visibleModal, toggleModal } = useContext(DonationContext)
  const apolloClient = useApolloClient()
  const [data, setData] = useState<FormState>(initialState)
  const [readonly, setReadonly] = useState(false)
  const [acceptedToc, setAcceptedToc] = useState(true)

  const [imageFile, setImageFile] = useState<File>()

  if (!loggedInUser) return <></>

  const submit = async () => {
    setReadonly(true)
    if (!loggedInUser) return
    try {
      let profileImage = undefined
      if (imageFile) {
        const cloudinaryResponse = await uploadToCloudinary(imageFile)
        profileImage = cloudinaryResponse.secure_url
      }
      const variables = { id: loggedInUser.id, ...data, profileImage }
      await apolloClient.mutate({
        mutation: UPDATE_NEW_USER_PROFILE,
        variables,
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

        <Copy>
          <Headline>Before we drop you in, let’s complete your profile.</Headline>
          <SubTitle>
            Adding a username and profile picture will help people put a face to your name and recognize you in the
            community.
          </SubTitle>
        </Copy>

        <AvatarForm setFile={setImageFile} />
        <Form {...{ schema, uischema, initialState, data, setData, readonly }} submitDisabledFromOutside={!acceptedToc}>
          <SubmitButton onClick={() => submit()} stretch disabled={readonly}>
            Save Changes
          </SubmitButton>
        </Form>

        <CheckWrapper>
          <Check>
            <CheckboxControl
              data={acceptedToc}
              path="not-used"
              handleChange={() => setAcceptedToc(!acceptedToc)}
              label=""
            />
            <CheckMessage>
              I agree to Artizen’s{' '}
              <Link href="/toc">
                <a>Terms &amp; Conditions</a>
              </Link>
            </CheckMessage>
          </Check>
        </CheckWrapper>
      </FormWrapper>
    </Wrapper>
  )
}

const FormWrapper = styled.div<{ hasFirstName: boolean; hasLastName: boolean; hasUsername: boolean }>`
  position: relative;
  z-index: 9999;
  max-width: calc(100vw - 100px); /* TODO: this is wrong */
  padding: 50px;
  background: white;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas:
    'copy avatarForm avatarForm'
    'copy firstName lastName'
    'copy artizenHandle artizenHandle'
    'tocCheck submit submit';
  &.submitted {
    grid-template-areas:
      'copy avatarForm avatarForm'
      'copy confirmation confirmation'
      'copy confirmation confirmation'
      'tocCheck confirmation confirmation';
  }
  gap: 20px;

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/firstName'] {
    display: ${props => (props.hasFirstName ? 'none' : 'block')};
    grid-area: firstName;
  }
  *[id='#/properties/lastName'] {
    display: ${props => (props.hasLastName ? 'none' : 'block')};
    grid-area: lastName;
  }
  *[id='#/properties/artizenHandle'] {
    display: ${props => (props.hasUsername ? 'none' : 'block')};
    grid-area: artizenHandle;
  }

  &.submitted {
    *[id='#/properties/firstName'],
    *[id='#/properties/lastName'],
    *[id='#/properties/email'],
    ${SubmitButton} {
      display: none;
    }
    ${Confirmation} {
      display: flex;
    }
  }
`

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 105;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  ${FormWrapper} {
    pointer-events: ${props => (props.visible ? 'all' : 'none')};
  }
`

const SubTitle = styled.h2`
  ${typography.body.l2}
`

export default PostDonationData
