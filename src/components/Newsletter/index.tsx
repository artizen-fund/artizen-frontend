import { useState, useMemo } from 'react'
import styled from 'styled-components'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import type { FormHooks, DefaultFormFields } from 'react-mailchimp-subscribe'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'
import { Form, Button, PagePadding } from '@components'
import { schema, uischema, initialState } from './form'

const Newsletter = ({ subscribe, status, message, ...props }: FormHooks<DefaultFormFields>) => {
  const [data, setData] = useState<any>(undefined)
  useMemo(() => {
    setData(initialState)
    if (typeof localStorage === 'undefined') {
      setData(initialState)
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
  return (
    <PagePadding black>
      <Wrapper className={submitted ? 'submitted' : ''}>
        <Copy>
          <Header>Join us in building the world's largest web3 fund for public goods</Header>
          <Subhead>Sign up for our free newsletter</Subhead>
        </Copy>
        <Form {...{ schema, uischema, initialState, data, setData }} processing={true}>
          <StyledButton onClick={() => subscribe(data)} outline size="l0">
            Submit
          </StyledButton>
        </Form>
      </Wrapper>
    </PagePadding>
  )
}
/*
              status={status}
message={message}
onSubmitted={(formData) => subscribe(formData)}
*/

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy copy'
    'optIn optIn'
    'firstName lastName'
    'email email'
    'submit submit';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas:
      'copy copy firstName lastName'
      'copy copy email email'
      'optIn optIn submit submit';
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
    *[id='#/properties/OPTIN'] {
      display: none;
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

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

export default () => (
  <MailchimpSubscribe
    url={process.env.NEXT_PUBLIC_MAILCHIMP_SUBCRIPTION_URL!}
    render={props => <Newsletter {...props} />}
  />
)
