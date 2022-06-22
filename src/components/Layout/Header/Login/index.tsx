import { useMemo, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Icon, Form, CheckboxControl } from '@components'
import { rgba, magic } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from './form'

const Login = () => {
  const LOCALSTORAGE_KEY = 'loginForm'

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
  const [error, setError] = useState<string>()
  const [readonly, setReadonly] = useState(false)
  const [acceptedToc, setAcceptedToc] = useState(true)

  const submit = () => alert('derp')

  const handleLoginWithEmail = async () => {
    setReadonly(true)
    try {
      // Trigger Magic link to be sent to user
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      })
      setMagicLoginIsDone(true)
      // Validate didToken with server
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      })

      // res.status === 200 && Router.reload('/')
      if (res.status === 200) {
        setIsLoggedIn(true)
        redirectBasedOnQuery()
      }
    } catch (error) {
      setDisabled(false) // Re-enable login button - user may have requested to edit their email
      setBtnLoading(false)
      console.log('it goes here', error)
    }
  }

  return (
    <Wrapper>
      <Copy>
        <Headline>Let’s get started by setting up your Artizen account</Headline>
        <InfoRow>
          <Icon glyph="info" outline level={1} />
          <SignInDirections>
            Already have an account?
            <br />
            You can still use this form, it’s magic!
          </SignInDirections>
        </InfoRow>
      </Copy>
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <SubmitButton stretch onClick={() => submit()} disabled={!data.email || !acceptedToc || readonly}>
          Sign In / Sign Up
        </SubmitButton>
      </Form>
      <Alternatives>
        <OrLine />
        <Buttons>
          <Button level={1} outline onClick={() => alert('derp')} stretch>
            Phone
          </Button>
          <Button level={1} outline onClick={() => alert('derp')} stretch>
            Twitter
          </Button>
          <Button level={1} outline onClick={() => alert('derp')} stretch>
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

const Wrapper = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'copy email'
      'copy submit'
      'tocCheck alternatives';
    gap: 10px;

    .vertical-layout,
    .vertical-layout-item {
      display: contents;
    }

    *[id='#/properties/email'] {
      grid-area: email;
    }
  }
`

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
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

const Alternatives = styled.div`
  grid-area: alternatives;
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

export default Login
