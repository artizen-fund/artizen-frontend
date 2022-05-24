import { useState } from 'react'
import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'
import { Form, Button } from '@components'
import { schema, uischema, initialState } from './form'

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false)
  return (
    <Wrapper className={submitted ? 'submitted' : ''}>
      <Copy>
        <Header>Join us in building the world's largest web3 fund for public goods</Header>
        <Subhead>Sign up for our free newsletter</Subhead>
      </Copy>
      <Form {...{ schema, uischema, initialState }} />
      <StyledButton onClick={() => setSubmitted(!submitted)} outline>
        Submit
      </StyledButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 0px;
  grid-template-areas:
    'copy copy'
    'optIn optIn'
    'firstName lastName'
    'email email'
    'submit submit';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-areas:
      'copy copy firstName lastName'
      'copy copy email email'
      'optIn optIn submit submit';
  }

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

  *[id='#/properties/optIn'] {
    grid-area: optIn;
  }

  &.submitted {
    *[id='#/properties/email'],
    *[id='#/properties/firstName'],
    *[id='#/properties/lastName'],
    *[id='#/properties/optIn'] {
      display: none;
    }
  }
  background: ${rgba(palette.night)};
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

export default Newsletter
