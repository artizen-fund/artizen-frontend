import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { Form, AvatarForm, CheckboxControl, CloseButton, Button } from '@components'
import { ICheckForExistingArtizenHandleQuery, IUpdateUsersMutation } from '@types'
import { rgba, loggedInUserVar, LayoutContext, uploadToCloudinary } from '@lib'
import { UPDATE_USER, CHECK_FOR_EXISTING_ARTIZENHANDLE } from '@gql'
import { schema, uischema, initialState, FormState } from '@forms/createProfile'
import { CheckWrapper, Check, CheckMessage, Confirmation, Copy, Headline } from '../Layout/Header/SessionShelf/_common'
import { typography, palette } from '@theme'

const CreateProfile = () => {
  const loggedInUser = useReactiveVar(loggedInUserVar)

  const { visibleModal, toggleModal } = useContext(LayoutContext)
  const [data, setData] = useState<FormState>(initialState)
  const [readonly, setReadonly] = useState(false)
  const [acceptedToc, setAcceptedToc] = useState(true)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const [imageFile, setImageFile] = useState<File>()

  const [updateUser] = useMutation<IUpdateUsersMutation>(UPDATE_USER)
  // todo: replace readOnly with [loading] from useMutation
  const submit = async () => {
    setReadonly(true)
    if (!loggedInUser) return
    try {
      let profileImage = undefined
      if (imageFile) {
        const cloudinaryResponse = await uploadToCloudinary(imageFile)
        profileImage = cloudinaryResponse.secure_url
      }
      // todo: replace the force-lowercase with a mutation event in hasura
      // todo: insert hideFromLeaderboard preference if we have it already

      // firstName: {
      // lastName: {
      // email: {
      // artizenHandle: {
      await updateUser({
        variables: {
          id: loggedInUser.id,
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
          ...data,
          artizenHandle: data.artizenHandle?.toLowerCase() || loggedInUser.artizenHandle,
          profileImage,
        },
      })

      await fetch('/api/syncCourier', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: loggedInUser.id,
          email: data.email,
        }),
      })

      toggleModal?.()
    } catch (error) {
      console.error('Error saving new user profile', error)
    }
    setReadonly(false)
  }

  const [newArtizenHandle] = useDebounce(data.artizenHandle, 500)
  useQuery<ICheckForExistingArtizenHandleQuery>(CHECK_FOR_EXISTING_ARTIZENHANDLE, {
    variables: {
      where: {
        _and: [{ artizenHandle: { _eq: newArtizenHandle?.toLowerCase() } }, { id: { _neq: loggedInUser?.id } }],
      },
    },
    onError: error => console.error('error ', error),
    fetchPolicy: 'no-cache',
    onCompleted: async ({ Users }) => {
      const errors: Array<ErrorObject> = []
      if (Users.length > 0) {
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

  return !loggedInUser ? (
    <></>
  ) : (
    <Wrapper visible={visibleModal === 'createProfile'}>
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
        <Form
          {...{ schema, uischema, initialState, data, setData, readonly, additionalErrors }}
          submitDisabledFromOutside={!acceptedToc}
        >
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
              I agree to Artizen’s <Link href="/toc">Terms &amp; Conditions</Link>
            </CheckMessage>
          </Check>
        </CheckWrapper>
      </FormWrapper>
    </Wrapper>
  )
}

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const FormWrapper = styled.div<{ hasFirstName: boolean; hasLastName: boolean; hasUsername: boolean }>`
  position: relative;
  z-index: 9999;
  max-width: calc(100vw - 100px); /* TODO: this is wrong */
  padding: 50px;
  background: white;
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.black)};
  }

  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas:
    'copy avatarForm avatarForm'
    'copy firstName lastName'
    'copy artizenHandle artizenHandle'
    'copy email email'
    'tocCheck submit submit';
  &.submitted {
    grid-template-areas:
      'copy avatarForm avatarForm'
      'copy confirmation confirmation'
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
    grid-area: firstName;
  }
  *[id='#/properties/lastName'] {
    grid-area: lastName;
  }
  *[id='#/properties/artizenHandle'] {
    grid-area: artizenHandle;
  }
  *[id='#/properties/email'] {
    grid-area: email;
  }

  &.submitted {
    *[id='#/properties/firstName'],
    *[id='#/properties/lastName'],
    *[id='#/properties/email'],
    *[id='#/properties/artizenHandle'],
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

export default CreateProfile
