import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { Icon, Form, CheckboxControl, Button } from '@components'
import { useFormLocalStorage } from '@lib'
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
import { loginCopy } from '@copy/common'

const LoginShelf = () => {
  const LOCALSTORAGE_KEY = 'loginForm'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const apolloClient = useApolloClient()

  const [sentEmail, setSentEmail] = useState(false)
  const [readonly, setReadonly] = useState(false)
  const [recordEmail, setRecordEmail] = useState(true)

  useEffect(() => {
    // unset above error upon input change
    setAdditionalErrors([])
  }, [data.email])

  const reset = () => setReadonly(false)

  return (
    <Wrapper className={readonly ? 'submitted' : ''}>
      <Copy>
        <Headline>{loginCopy.headline}</Headline>
        <InfoRow>
          <Icon glyph="infoLarge" outline level={1} />
          <SignInDirections>{loginCopy.directions}</SignInDirections>
        </InfoRow>
      </Copy>
      <Form
        localStorageKey={LOCALSTORAGE_KEY}
        {...{ schema, uischema, initialState, data, setData, readonly, additionalErrors }}
      >
        <>
          <StyledButton stretch onClick={() => alert('todo: login')}>
            {loginCopy.signinButton}
          </StyledButton>
          {sentEmail && (
            <Confirmation>
              <Icon glyph="tick" outline level={2} color="moss" />
              <div>
                <h1>{loginCopy.confirmationHeadline}</h1>
                <p>{loginCopy.confirmationCopy(data.email!)}</p>
              </div>
              <Reset onClick={() => reset()}>{loginCopy.resetButton}</Reset>
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
          <CheckMessage>{loginCopy.rememberEmailCheck}</CheckMessage>
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
