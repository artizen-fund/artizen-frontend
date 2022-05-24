import { useState } from 'react'
import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { Form, Button } from '@components'
import { schema, uischema, initialState } from './form'

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false)
  return (
    <Wrapper className={submitted ? 'submitted' : ''}>
      <Instructions>
        <p>Join us in building the world's largest web3 fund for public goods</p>
        <p>Sign up for our free newsletter</p>
      </Instructions>
      <Form {...{ schema, uischema, initialState }} />
      <StyledButton onClick={() => setSubmitted(!submitted)}>Submit</StyledButton>
      <Thanks>Thank you Thank you</Thanks>
    </Wrapper>
  )
}

const Thanks = styled.div`
  grid-area: g;
`

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-areas: 'a a' 'b b' 'c d' 'e e' 'f f';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-areas: 'a a c d' 'a a e e' 'b b f f';
  }
  &.submitted {
    grid-template-areas: 'a a' 'b b' 'g g' 'g g' 'g g';
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      grid-template-areas: 'a a g g' 'a a g g' 'b b g g';
    }
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/email'] {
    grid-area: e;
  }

  *[id='#/properties/firstName'] {
    grid-area: c;
  }

  *[id='#/properties/lastName'] {
    grid-area: d;
  }

  *[id='#/properties/optIn'] {
    grid-area: b;
  }

  &.submitted {
    *[id='#/properties/email'],
    *[id='#/properties/firstName'],
    *[id='#/properties/lastName'],
    *[id='#/properties/optIn'] {
      display: none;
    }
  }
`

const Instructions = styled.div`
  grid-area: a;
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: f;
`

export default Newsletter
