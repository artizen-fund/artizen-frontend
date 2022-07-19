import { useMemo, useState } from 'react'
import { useApolloClient, ApolloClient } from '@apollo/client'
import type { Magic } from 'magic-sdk'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Icon, Form, CheckboxControl } from '@components'
import { rgba, createSession, useMagic } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from './form'

const LoginShelf = () => {
  const LOCALSTORAGE_KEY = 'loginForm'
  const { magic } = useMagic()
  const apolloClient = useApolloClient()

  const [data, setData] = useState<FormState>(initialState)
  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [])

  const [submitted, setSubmitted] = useState(false)
  const [readonly, setReadonly] = useState(false)
  const [acceptedToc, setAcceptedToc] = useState(true)


  const handleLogin = async (
    magic: Magic, 
    apolloClient: ApolloClient<object>,
    provider?: string, 
    email?: string,
  ) => {
    setReadonly(true)
    setSubmitted(true)

    const loginWithEmail = email ? { email,magic } : undefined
    const loginWithSocial = provider ? {provider,magic } : undefined

    

    try {
      createSession(
        apolloClient,
        loginWithEmail,
        loginWithSocial,
      )
      setSubmitted(true)
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
            stretch onClick={
            () => {
              if(!data.email) return
              handleLogin(magic, apolloClient, undefined, data.email)

            }

        } disabled={!data.email || !acceptedToc || readonly}>
          Sign In / Sign Up
        </SubmitButton>
        <Confirmation>
          <Icon glyph="tick" outline level={2} color="moss" />
          <div>
            <h1>Done, confirmation sent!</h1>
            <p>We emailed a magic link to {data.email}. Click the link Sign in or sign up.</p>
          </div>
          <Reset onClick={() => reset()}>Didn’t receive an email?</Reset>
        </Confirmation>
      </Form>
      <Alternatives>
        <OrLine />
        <Buttons>
          <Button level={1} outline onClick={() => alert('derp')} stretch>
            Phone
          </Button>
          <Button
            level={1} outline onClick={

              () => {
                
                handleLogin(magic, apolloClient, 'twitter', undefined)
              } 
            
          } stretch>
            Twitter
          </Button>
          <Button
                level={1} outline onClick={
               () => {
                handleLogin(magic, apolloClient, 'discord', undefined)
              } 

          } stretch>
            Discord
          </Button>
        </Buttons>
      </Alternatives>
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

const Alternatives = styled.div`
  grid-area: alternatives;
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
      'tocCheck alternatives';
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
    ${SubmitButton}, ${Alternatives} {
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

const OrLine = styled.div`
  position: relative;
  margin: 1em 0;

  text-align: center;
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
  text-transform: uppercase;

  &:before {
    content: ' ';
    position: absolute;
    z-index: 0;
    left: 0;
    top: 40%;
    width: 100%;
    height: 1px;
    background: ${rgba(palette.stone)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.barracuda, 0.64)};
    }
  }
  &:after {
    position: relative;
    z-index: 1;
    content: ' or ';
    margin-inline: auto;
    padding: 0 10px;
    background: ${rgba(palette.white)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.slate)};
    }
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
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
