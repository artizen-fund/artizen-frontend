import { useState } from 'react'
import { useApolloClient, ApolloClient } from '@apollo/client'
import { OAuthProvider } from '@magic-ext/oauth'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Icon, Form, CheckboxControl } from '@components'
import { rgba, loginWithEmail, useMagic, useFormLocalStorage } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from './form'

const LoginShelf = () => {
  const LOCALSTORAGE_KEY = 'loginForm'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const { magic } = useMagic()
  const apolloClient = useApolloClient()

  const [sentEmail, setSentEmail] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [readonly, setReadonly] = useState(false)
  const [acceptedToc, setAcceptedToc] = useState(true)

  const handleSocialLogin = async (provider: OAuthProvider, magic?: MagicInstance) => {
    if (!magic) {
      throw 'Error: magic session not initialized.'
    }
    await magic.oauth.loginWithRedirect({
      provider, // google, apple, etc
      redirectURI: new URL('/', window.location.origin).href, // required redirect to finish social login
    })
  }

  const handleEmailLogin = async (apolloClient: ApolloClient<object>, email?: string, magic?: MagicInstance) => {
    if (!magic) {
      throw 'Error: magic session not initialized.'
    }
    if (!email) {
      throw 'Error: email is missing'
    }
    setReadonly(true)
    setSubmitted(true)
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
    setSubmitted(false)
    setReadonly(false)
  }

  return (
    <Wrapper className={submitted ? 'submitted' : ''}>
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
        <SubmitButton
          stretch
          onClick={() => handleEmailLogin(apolloClient, data.email, magic)}
          disabled={!data.email || !acceptedToc || readonly}
        >
          Sign In / Sign Up
        </SubmitButton>
        {sentEmail && (
          <Confirmation>
            <Icon glyph="tick" outline level={2} color="moss" />
            <div>
              <h1>Done, confirmation sent!</h1>
              <p>
                We emailed a magic link to {data.email}.<br />
                Click the link Sign in or sign up.
              </p>
            </div>
            <Reset onClick={() => reset()}>Didn’t receive an email?</Reset>
          </Confirmation>
        )}
      </Form>
      <TocWrapper>
        <TocCheck>
          <CheckboxControl
            data={acceptedToc}
            path="not-used"
            handleChange={() => setAcceptedToc(!acceptedToc)}
            label=""
          />
          <TocMessage>
            I agree to Artizen’s
            <Link href="/toc">
              <a> Terms &amp; Conditions</a>
            </Link>
          </TocMessage>
        </TocCheck>
      </TocWrapper>
    </Wrapper>
  )
}

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const Confirmation = styled.div`
  display: none;
  grid-area: confirmation;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  h1 {
    ${typography.title.l4}
    color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon)};
    }
  }
  p {
    ${typography.label.l1}
    color: ${rgba(palette.barracuda)};
  }
  text-align: center;
`

const Reset = styled.p`
  cursor: pointer;
  border-bottom: 2px solid ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    border-bottom: 2px solid ${rgba(palette.moon)};
  }
`

const Wrapper = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'copy email'
      'copy submit'
      'tocCheck .';
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

const Copy = styled.div`
  grid-area: copy;
`

const Headline = styled.h1`
  ${typography.title.l2};
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1em 0 2em 0;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    margin: 1em 0 0 0;
  }
`

const SignInDirections = styled.p`
  ${typography.label.l1};
`

const TocWrapper = styled.div`
  display: contents;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    grid-area: tocCheck;
  }
`

const TocCheck = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    justify-content: start;
  }
  a {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`

const TocMessage = styled.p`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

export default LoginShelf
