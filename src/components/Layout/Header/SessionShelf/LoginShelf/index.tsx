import { useState } from 'react'
import { useApolloClient, ApolloClient } from '@apollo/client'
import styled from 'styled-components'
import { Icon, Form, CheckboxControl } from '@components'
import { loginWithEmail, useMagic, useFormLocalStorage } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/login'
import {
  Copy,
  Headline,
  SignInDirections,
  InfoRow,
  SubmitButton,
  Confirmation,
  Reset,
  CheckWrapper,
  Check,
  CheckMessage,
  ISessionShelf,
} from '../_common'

const LoginShelf = ({ setCreateMode }: ISessionShelf) => {
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
        <Headline>Sign in using the email associated with your Artizen account</Headline>
        <InfoRow onClick={() => setCreateMode(true)}>
          <Icon glyph="infoLarge" outline level={1} />
          <SignInDirections>Sign up for an account instead</SignInDirections>
        </InfoRow>
      </Copy>
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <>
          <SubmitButton stretch onClick={() => handleEmailLogin(apolloClient, data.email, magic)}>
            Sign In
          </SubmitButton>
          {sentEmail && (
            <Confirmation>
              <Icon glyph="tick" outline level={2} color="moss" />
              <div>
                <h1>Done, confirmation sent!</h1>
                <p>
                  We emailed a magic link to {data.email}.<br />
                  Click the link sign in.
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

const Wrapper = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'copy email'
      'copy .'
      'tocCheck submit';
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
    ${SubmitButton} {
      display: none;
    }
    ${Confirmation} {
      display: flex;
    }
  }
`

export default LoginShelf
