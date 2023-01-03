import { useState, useEffect } from 'react'
import styled from 'styled-components'
import MailchimpSubscribe, { FormHooks, NameFormFields } from 'react-mailchimp-subscribe'
import { rgba, assert, useFormLocalStorage } from '@lib'
import { Form, Button, PagePadding, Icon } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/newsletter'
import { newsletter } from '@copy/common'

const Newsletter = ({ subscribe, status, message }: FormHooks<NameFormFields>) => {
  const LOCALSTORAGE_KEY = 'newsletter'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>()
  const [readonly, setReadonly] = useState(false)

  const [buttonLabel, setButtonLabel] = useState<string | undefined>(newsletter.buttonLabel)

  useEffect(() => {
    switch (status) {
      case 'sending':
        setButtonLabel(newsletter.buttonSending)
        setReadonly(true)
        setError(undefined)
        break
      case 'success':
        setButtonLabel(undefined)
        setSubmitted(true)
        break
      case 'error':
        setButtonLabel('try again')
        setError(error)
      default:
        setButtonLabel(newsletter.buttonLabel)
        setReadonly(false)
    }
  }, [status, error])

  return (
    <StyledPagePadding black>
      <Wrapper className={submitted ? 'submitted' : ''}>
        <Copy>
          <Header>{newsletter.headline}</Header>
          <Subhead>{newsletter.subhead}</Subhead>
        </Copy>
        <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
          <StyledButton
            onClick={() => subscribe(data as NameFormFields)}
            inverted
            level={0}
            disabled={!data.EMAIL || !data.OPTIN}
          >
            {buttonLabel}
          </StyledButton>
          <Confirmation>
            <Icon glyph="tick" level={1} outline color="uiSuccess" />
            <div>{newsletter.responseHeadline}</div>
            <p>{newsletter.responseSubhead}</p>
          </Confirmation>
        </Form>
      </Wrapper>
    </StyledPagePadding>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)``

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: submit;
  margin-top: 14px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    margin-top: 25px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    margin-top: 29px;
  }
`

const Confirmation = styled.div`
  display: none;
  grid-area: confirmation;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  > div {
    ${typography.title.l4}
    color: ${rgba(palette.moon)};
    margin-bottom: 0.25em;
  }
  p {
    max-width: 300px;
    ${typography.label.l1}
    color: ${rgba(palette.barracuda)};
  }
  text-align: center;
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy copy'
    'optIn optIn'
    'firstName lastName'
    'email email'
    'submit submit';
  &.submitted {
    grid-template-areas:
      'copy'
      'optIn'
      'confirmation';
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas:
      'copy copy firstName lastName'
      'copy copy email email'
      'optIn optIn submit submit';
    &.submitted {
      grid-template-areas:
        'copy copy confirmation confirmation'
        'copy copy confirmation confirmation'
        'optIn optIn confirmation confirmation';
    }
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/EMAIL'] {
    grid-area: email;
  }

  *[id='#/properties/FNAME'] {
    grid-area: firstName;
  }

  *[id='#/properties/LNAME'] {
    grid-area: lastName;
  }

  *[id='#/properties/OPTIN'] {
    grid-area: optIn;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      padding-top: 28px;
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      padding-top: 32px;
    }
  }

  &.submitted {
    *[id='#/properties/EMAIL'],
    *[id='#/properties/FNAME'],
    *[id='#/properties/LNAME'],
    ${StyledButton} {
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

const Header = styled.div`
  ${typography.title.l2}
  color: ${rgba(palette.white)};
`

const Subhead = styled.div`
  margin-top: 0.65em;
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const MailChimpForm = () => {
  const NEXT_PUBLIC_MAILCHIMP_SUBCRIPTION_URL = assert(
    process.env.NEXT_PUBLIC_MAILCHIMP_SUBCRIPTION_URL,
    'NEXT_PUBLIC_MAILCHIMP_SUBCRIPTION_URL',
  )
  return <MailchimpSubscribe url={NEXT_PUBLIC_MAILCHIMP_SUBCRIPTION_URL} render={props => <Newsletter {...props} />} />
}

export default MailChimpForm
