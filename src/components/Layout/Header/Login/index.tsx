import { useMemo, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Icon, Form, CheckboxControl } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
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

  return (
    <Wrapper>
      <Headline>Let’s get started by setting up your Artizen account</Headline>
      <InfoRow>
        <Icon glyph="info" outline level={1} />
        <SignInDirections>
          Already have an account?
          <br />
          You can still use this form, it’s magic!
        </SignInDirections>
      </InfoRow>
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <Button stretch onClick={() => submit()} disabled={!data.email || !acceptedToc}>
          Sign In / Sign Up
        </Button>
      </Form>
      <OrLine />
      <Alternatives>
        <Button outline onClick={() => alert('derp')} stretch>
          Telegram
        </Button>
        <Button outline onClick={() => alert('derp')} stretch>
          Twitter
        </Button>
        <Button outline onClick={() => alert('derp')} stretch>
          Discord
        </Button>
      </Alternatives>
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
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
  }
  &:after {
    position: relative;
    z-index: 1;
    content: ' or ';
    margin-inline: auto;
    padding: 0 10px;
    background: ${rgba(palette.white)};
  }
`

const Alternatives = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`

const TocCheck = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
