import { useState, useEffect } from 'react'
import styled from 'styled-components'
import MailchimpSubscribe, { FormHooks, NameFormFields } from 'react-mailchimp-subscribe'
import { rgba } from '@lib'
import Link from 'next/link'
import { Button, PagePadding, Icon } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { newsletter } from '@copy/common'

const Newsletter = ({ subscribe }: FormHooks<NameFormFields>) => {
  return (
    <StyledPagePadding black>
      <Wrapper>
        <Copy>
          <Header>{newsletter.headline}</Header>
          <Subhead>{newsletter.subhead}</Subhead>
        </Copy>
        <Link href="https://artizenfund.substack.com/">
          <StyledButton onClick={() => {}} inverted level={0}>
            {newsletter.buttonLabel}
          </StyledButton>
        </Link>
      </Wrapper>
    </StyledPagePadding>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)``

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: submit;
  height: 24px;
`

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-areas:
    'copy copy'
    'submit submit';

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas: 'copy copy submit submit';
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
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
  return <MailchimpSubscribe render={props => <Newsletter {...props} />} />
}

export default MailChimpForm
