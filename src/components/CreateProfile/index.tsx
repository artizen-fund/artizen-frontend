import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { Form, AvatarForm, CheckboxControl, CloseButton, Button } from '@components'
import { CheckWrapper, Check, CheckMessage, Confirmation, Copy, Headline } from '../Layout/Header/SessionShelf/_common'
import { rgba, loggedInUserVar, LayoutContext } from '@lib'
import { schema, uischema, adminSchema, adminUIschema, FormState, FormStateAdmin } from '@forms/createProfile'
import { typography, palette, breakpoint } from '@theme'
import useCreateProfile from './lib'
import { createProfile as copy } from '@copy/common'

interface IAttibutes {
  action?: 'update' | 'create'
  sendWelcomeEmail: boolean
  callback?: () => void
  scope: 'admin' | 'frontend'
  initialState?: FormStateAdmin
}

const CreateProfile = () => {
  const [processing, setProcessing] = useState(false)
  const { visibleModal, toggleModal, modalAttrs } = useContext(LayoutContext)

  const { action, initialState, scope, callback, sendWelcomeEmail }: IAttibutes = modalAttrs

  const [acceptedToc, setAcceptedToc] = useState(true)

  const loggedInUser = useReactiveVar(loggedInUserVar)

  const newInitialState: FormStateAdmin | FormState = initialState
    ? {
        artizenHandle: initialState.artizenHandle,
        email: initialState.email,
        twitterHandle: initialState.twitterHandle || '',
        externalLink: initialState.externalLink || '',
        publicAddress: initialState.publicAddress,
      }
    : {}

  const { updateProfile, createProfile, additionalErrors, data, setData, setImageFile } =
    useCreateProfile(newInitialState)

  const updateProfileCallback = async () => {
    setProcessing(true)

    try {
      const updatedProfile = await updateProfile(modalAttrs?.initialState?.id, sendWelcomeEmail)
      const profileImage = updatedProfile?.profileImage || modalAttrs?.initialState?.profileImage

      if (modalAttrs?.callback) {
        modalAttrs?.callback({ ...updatedProfile, profileImage })
      }

      setProcessing(false)
      toggleModal()
      window.location.assign(`${window.location.protocol}//${window.location.host}/`)
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

      window.location.assign(`${window.location.protocol}//${window.location.host}/`)
    } catch (error) {
      setProcessing(false)
      alert(`Error saving new user profile ${error}`)
    }
  }

  return !loggedInUser ? (
    <></> /* TODO: we have a new spinner for this in a separate PR */
  ) : (
    <Wrapper visible={visibleModal === 'createProfile'}>
      <FormWrapper scope={modalAttrs?.scope}>
        {scope === 'admin' && <CloseButtonStyled visible={true} onClick={() => toggleModal()} />}

        {modalAttrs?.scope !== 'admin' && (
          <Copy>
            <Headline>{copy.headline}</Headline>
            <SubTitle>{copy.subtitle}</SubTitle>
          </Copy>
        )}

        <AvatarForm setFile={setImageFile} initialState={modalAttrs?.initialState?.profileImage} />
        <Form
          schema={modalAttrs?.scope === 'admin' ? adminSchema : schema}
          uischema={modalAttrs?.scope === 'admin' ? adminUIschema : uischema}
          {...{
            data,
            setData,
            additionalErrors,
          }}
          readonly={processing}
          submitDisabledFromOutside={!acceptedToc}
        >
          <SubmitButton
            onClick={() => (action === 'update' ? updateProfileCallback() : createProfileC())}
            stretch
            disabled={processing}
            level={1}
          >
            {processing ? 'Saving' : copy.saveLabel}
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

const CloseButtonStyled = styled(props => <CloseButton {...props} />)`
  position: absolute;
  top: 0;
  right: 0;
`

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

const FormWrapper = styled.div<{ scope: string }>`
  position: relative;
  z-index: 9999;
  overflow-y: scroll;
  max-width: calc(100vw - 30px);
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${props =>
    props.scope !== 'admin' &&
    `
    grid-template-areas:
    'copy copy'
    'avatarForm avatarForm'
    'artizenHandle twitterHandle'
    'email email'
    'externalLink externalLink'
    'tocCheck tocCheck'
    'submit submit'
    'why why';
    `}

  ${props =>
    props.scope === 'admin' &&
    `
    grid-template-areas:
    'copy copy'
    'avatarForm avatarForm'
    'artizenHandle twitterHandle'
    'email email'
    'externalLink externalLink'
    'publicAddress publicAddress'
    'tocCheck tocCheck'
    'submit submit'
    'why why';
    `}

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

  *[id='#/properties/publicAddress'] {
    grid-area: publicAddress;
  }

  &.submitted {
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
