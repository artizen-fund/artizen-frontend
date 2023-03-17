import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { Form, AvatarForm, CheckboxControl, CloseButton, Button } from '@components'
import { CheckWrapper, Check, CheckMessage, Confirmation, Copy, Headline } from '../Layout/Header/SessionShelf/_common'
import { rgba, loggedInUserVar, LayoutContext } from '@lib'
import { schema, uischema, FormState } from '@forms/createProfile'
import { typography, palette, breakpoint } from '@theme'
import useCreateProfile from './lib'
import { createProfile as copy } from '@copy/common'

interface FormStateAdmin extends FormState {
  publicAddress: string
}

interface IAttibutes {
  action?: 'update' | 'create'
  callback?: () => void
  scope: 'admin' | 'frontend'
  initialState: FormStateAdmin
}

const CreateProfile = () => {
  const [processing, setProcessing] = useState(false)
  const { visibleModal, toggleModal, modalAttrs } = useContext(LayoutContext)

  const {
    action,
    initialState: {
      artizenHandle,
      firstName,
      lastName,
      email,
      twitterHandle,
      externalUrl,
      wallet,
      profileImage,
      publicAddress,
    },
    scope,
    callback,
  }: IAttibutes = modalAttrs

  const [acceptedToc, setAcceptedToc] = useState(true)

  const loggedInUser = useReactiveVar(loggedInUserVar)

  // const action = modalAttrs?.action

  console.log('modalAttrs?.initialState   ', modalAttrs?.initialState)

  const newInitialState: FormStateAdmin | FormState = modalAttrs?.initialState
    ? {
        artizenHandle,
        firstName,
        lastName,
        email,
        twitterHandle,
        externalUrl,
        wallet,
        profileImage,
        publicAddress,
      }
    : {}

  const { updateProfile, createProfile, additionalErrors, data, setData, setImageFile } =
    useCreateProfile(newInitialState)

  console.log('newInitialState  ', newInitialState)

  const finalUischema =
    modalAttrs?.scope === 'admin'
      ? {
          ...uischema,
          ...{
            elements: [
              ...uischema.elements,
              {
                type: 'Control',
                scope: '#/properties/publicAddress',
                label: 'Enter an public address',
              },
            ],
          },
        }
      : uischema

  const finalSchema =
    modalAttrs?.scope === 'admin'
      ? {
          ...schema,
          ...{
            properties: {
              ...schema.properties,
              publicAddress: {
                type: 'string',
                minLength: 2,
              },
            },
          },
        }
      : schema

  console.log('schema.required?', schema.required)
  console.log('finalSchema  ', finalSchema)

  const updateProfileC = async () => {
    setProcessing(true)
    try {
      await updateProfile()
      setProcessing(false)
      toggleModal()
    } catch (error) {
      setProcessing(false)
      console.error('Error update user profile', error)
    }
  }

  const createProfileC = async () => {
    setProcessing(true)
    try {
      const newProfile = await createProfile()
      modalAttrs?.callback(newProfile)

      setProcessing(false)
      toggleModal()
    } catch (error) {
      setProcessing(false)
      console.error('Error saving new user profile', error)
    }
  }

  return !loggedInUser ? (
    <></> /* TODO: we have a new spinner for this in a separate PR */
  ) : (
    <Wrapper visible={visibleModal === 'createProfile'}>
      <FormWrapper
        hasFirstName={!!loggedInUser?.firstName}
        hasLastName={!!loggedInUser?.lastName}
        hasUsername={false}
        scope={modalAttrs?.scope}
      >
        <CloseButton onClick={() => toggleModal()} />

        {modalAttrs?.scope !== 'admin' && (
          <Copy>
            <Headline>{copy.headline}</Headline>
            <SubTitle>{copy.subtitle}</SubTitle>
          </Copy>
        )}

        <AvatarForm setFile={setImageFile} initialState={profileImage as string} />
        <Form
          {...{ schema: finalSchema, uischema: finalUischema, data, setData, additionalErrors }}
          readonly={processing}
          submitDisabledFromOutside={!acceptedToc}
        >
          <SubmitButton
            onClick={() => (action === 'update' ? updateProfileC() : createProfileC())}
            stretch
            disabled={processing}
            level={1}
          >
            {copy.saveLabel}
          </SubmitButton>
        </Form>

        {scope !== 'admin' && (
          <CheckWrapper>
            <Check>
              <CheckboxControl
                data={acceptedToc}
                path="not-used"
                handleChange={() => setAcceptedToc(!acceptedToc)}
                label=""
              />
              <CheckMessage>
                <Link href="/toc">{copy.tocMessage}</Link>
              </CheckMessage>
            </Check>
          </CheckWrapper>
        )}
      </FormWrapper>
    </Wrapper>
  )
}

/* 
  Not using the normal Modal wrapper because we don't want a Close button
  and too much work to implement that feature right now /shrug
  */
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

  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const FormWrapper = styled.div<{ hasFirstName: boolean; hasLastName: boolean; hasUsername: boolean; scope: string }>`
  position: relative;
  z-index: 9999;

  overflow-y: scroll;
  max-width: calc(100vw - 30px);

  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'copy copy'
    'avatarForm avatarForm'
    'firstName lastName'
    'artizenHandle twitterHandle'
    'email email'
    'externalLink externalLink'
    '${props => props.scope === 'admin' && `publicAddress publicAddress`}'
    'tocCheck tocCheck'
    'submit submit'
    'why why';
  gap: 10px;
  margin-top: 15px;
  padding: 25px;

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    padding: 40px;
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 20px;
    margin-top: 0;
    width: 416px;
    max-width: none;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 568px;
    padding: 50px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 840px;
    padding: 80px;
  }

  background: white;
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.black)};
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
  *[id='#/properties/artizenHandle'] {
    grid-area: artizenHandle;
  }
  *[id='#/properties/email'] {
    grid-area: email;
  }

  *[id='#/properties/twitterHandle'] {
    grid-area: twitterHandle;
  }

  *[id='#/properties/externalLink'] {
    grid-area: externalLink;
  }

  *[id='#/properties/wallet'] {
    grid-area: wallet;
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

const SubTitle = styled.h2`
  ${typography.body.l2}
`

const Why = styled.p`
  margin: 1em auto;
  ${typography.label.l1}
  text-align: center;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  grid-area: why;
`

export default CreateProfile
