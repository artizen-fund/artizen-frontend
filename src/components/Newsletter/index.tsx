import { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import MailchimpSubscribe, { FormHooks, DefaultFormFields } from 'react-mailchimp-subscribe'
import { rgba } from '@lib'
import { Form, Button, PagePadding } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { schema, uischema, initialState } from './form'

const Newsletter = ({ subscribe, status, message }: FormHooks<DefaultFormFields>) => {
  const [data, setData] = useState<any>(initialState)
  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(schema.name)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [schema])

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>()
  const [readonly, setReadonly] = useState(true)
  const herp = `derp`

  useEffect(() => {
    switch (status) {
      case 'sending':
        setReadonly(true)
        setError(undefined)
        break
      case 'success':
        setSubmitted(true)
        break
      case 'error':
        setError(error)
      default:
        setReadonly(false)
    }
  }, [status, error])

  return (
    <PagePadding black>
      <Wrapper className={submitted ? 'submitted' : ''}>
        <Copy>
          <Header>Join us in building the world's largest web3 fund for public goods</Header>
          <Subhead>Sign up for our free newsletter</Subhead>
        </Copy>
        <Form {...{ schema, uischema, initialState, data, setData, readonly }}>
          <StyledButton onClick={() => subscribe(data)} inverted level={0} disabled={!data.EMAIL || !data.OPTIN}>
            Submit
          </StyledButton>
          <Confirmation>
            <div>Congrats, confirmation sent!</div>
            <p>Check your email and follow the steps to confirm your subscription.</p>
          </Confirmation>
        </Form>
      </Wrapper>
    </PagePadding>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const Confirmation = styled.div`
  display: none;
  grid-area: confirmation;
  flex-direction: column;
  justify-content: center;
  div {
    ${typography.title.l4}
    color: ${rgba(palette.moon)};
    margin-bottom: 0.25em;
  }
  p {
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

  *[id='#/properties/FIRSTNAME'] {
    grid-area: firstName;
  }

  *[id='#/properties/LASTNAME'] {
    grid-area: lastName;
  }

  *[id='#/properties/OPTIN'] {
    grid-area: optIn;
  }

  &.submitted {
    *[id='#/properties/EMAIL'],
    *[id='#/properties/FIRSTNAME'],
    *[id='#/properties/LASTNAME'],
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
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

export default () => (
  <MailchimpSubscribe
    url={process.env.NEXT_PUBLIC_MAILCHIMP_SUBCRIPTION_URL!}
    render={props => <Newsletter {...props} />}
  />
)
