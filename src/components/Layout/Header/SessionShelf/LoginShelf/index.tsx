import { useState } from 'react'
import { useApolloClient, ApolloClient } from '@apollo/client'
import styled from 'styled-components'
import { Icon, Form, CheckboxControl, Button } from '@components'
import { loginWithEmail, useMagic, useFormLocalStorage } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/login'
import {
  Copy,
  Headline,
  SignInDirections,
  InfoRow,
  Confirmation,
  Reset,
  CheckWrapper,
  Check,
  CheckMessage,
} from '../_common'

const LoginShelf = () => {
  const LOCALSTORAGE_KEY = 'loginForm'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const { magic } = useMagic()
  const apolloClient = useApolloClient()

  const [sentEmail, setSentEmail] = useState(false)
  const [readonly, setReadonly] = useState(false)
  const [recordEmail, setRecordEmail] = useState(true)

  const handleEmailLogin = async (apolloClient: ApolloClient<object>, email?: string, magic?: MagicInstance) => {
    if (!magic) {
      throw 'Error: magic session not initialized.'
    }
    if (!email) {
      throw 'Error: email is missing'
    }
    setReadonly(true)
    try {
      setSentEmail(true)
      await loginWithEmail(apolloClient, magic, email)
      setReadonly(false)
    } catch (error) {
      console.error(error)
      setReadonly(false)
    }
  }

  const reset = () => {
    setReadonly(false)
  }

  return (
    <Wrapper className={readonly ? 'submitted' : ''}>
      <Copy>
        <Headline>Let’s get started by setting up your Artizen account</Headline>
        <InfoRow>
          <Icon glyph="infoLarge" outline level={1} />
          <SignInDirections>
            Already have an account?
            <br />
            You can still use this form, it’s magic!
          </SignInDirections>
        </InfoRow>
      </Copy>
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <>
          <StyledButton stretch onClick={() => handleEmailLogin(apolloClient, data.email, magic)}>
            Sign In
          </StyledButton>
          {sentEmail && (
            <Confirmation>
              <Icon glyph="tick" outline level={2} color="moss" />
              <div>
                <h1>Done, confirmation sent!</h1>
                <p>
                  We emailed a magic link to {data.email}.<br />
                  Click the link to sign in or sign up.
                </p>
              </div>
              <Reset onClick={() => reset()}>Didn’t receive an email?</Reset>
            </Confirmation>
          )}
        </>
      </Form>
      <CheckWrapper>
        <Check>
          <CheckboxControl
            data={recordEmail}
            path="not-used"
            handleChange={() => setRecordEmail(!recordEmail)}
            label=""
          />
          <CheckMessage>Remember my email address.</CheckMessage>
        </Check>
      </CheckWrapper>
    </Wrapper>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: buttons;
  margin-top: 15px;
`

const Wrapper = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'copy email'
      'copy buttons'
      'tocCheck buttons';
    &.submitted {
      grid-template-areas:
        'copy confirmation'
        'copy confirmation'
        'tocCheck confirmation';
    }
    gap: 10px;

    .vertical-layout,
    .vertical-layout-item {
      display: contents;
    }

    *[id='#/properties/email'] {
      grid-area: email;
    }
  }

  &.submitted {
    *[id='#/properties/email'],
    ${StyledButton} {
      display: none;
    }
    ${Confirmation} {
      display: flex;
    }
  }
`

export default LoginShelf
