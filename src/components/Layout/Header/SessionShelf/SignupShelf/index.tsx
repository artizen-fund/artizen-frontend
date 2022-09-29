import { useEffect, useState, useContext } from 'react'
import { useApolloClient, ApolloClient } from '@apollo/client'
import Link from 'next/link'
import styled from 'styled-components'
import { Icon, Form, CheckboxControl } from '@components'
import { loginWithEmail, useMagic, useFormLocalStorage, UserContext } from '@lib'
import { UPDATE_NEW_USER_PROFILE } from '@gql'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/signup'
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
import { IUser } from '@types'

const SignupShelf = ({ setCreateMode }: ISessionShelf) => {
  const LOCALSTORAGE_KEY = 'signupForm'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const { magic } = useMagic()
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  const [sentEmail, setSentEmail] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [readonly, setReadonly] = useState(false)
  const [acceptedToc, setAcceptedToc] = useState(true)

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

  const saveNewUserData = async (user: IUser, data: FormState) => {
    try {
      await apolloClient.mutate({
        mutation: UPDATE_NEW_USER_PROFILE,
        variables: { id: user.id, firstName: data.firstName, lastName: data.lastName },
      })
    } catch (error) {
      console.error('Error saving new user profile', error)
    }
  }

  useEffect(() => {
    return () => {
      if (!!loggedInUser && !!data.firstName && !!data.lastName) {
        saveNewUserData(loggedInUser, data)
      }
    }
  }, [data, loggedInUser])

  return (
    <Wrapper className={submitted ? 'submitted' : ''}>
      <Copy>
        <Headline>Let’s get started by setting up your Artizen account </Headline>
        <InfoRow onClick={() => setCreateMode(false)}>
          <Icon glyph="infoLarge" outline level={1} />
          <SignInDirections>Sign in to your account instead</SignInDirections>
        </InfoRow>
      </Copy>
      <Form
        submitDisabledFromOutside={!acceptedToc || submitted}
        localStorageKey={LOCALSTORAGE_KEY}
        {...{ schema, uischema, initialState, data, setData, readonly }}
      >
        <>
          <SubmitButton stretch onClick={() => handleEmailLogin(apolloClient, data.email, magic)}>
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
        </>
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
      'copy firstName lastName'
      'copy email email'
      'tocCheck submit submit';
    &.submitted {
      grid-template-areas:
        'copy confirmation confirmation'
        'copy confirmation confirmation'
        'tocCheck confirmation confirmation';
    }
    gap: 10px;

    .vertical-layout,
    .vertical-layout-item {
      display: contents;
    }

    *[id='#/properties/email'] {
      grid-area: email;
    }
    *[id='#/properties/firstName'] {
      grid-area: firstName;
    }
    *[id='#/properties/lastName'] {
      grid-area: lastName;
    }
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

export default SignupShelf
