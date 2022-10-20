import styled from 'styled-components'
import { Spinner, Icon } from '@components'
import { typography, breakpoint } from '@theme'

const ProcessingSocialLoginShelf = () => {
  return (
    <Wrapper>
      <Copy>
        <Headline>Finishing social login</Headline>
        <InfoRow>
          <Icon glyph="infoLarge" outline level={1} />
          <SignInDirections>This will only take a moment…</SignInDirections>
        </InfoRow>
      </Copy>
      <StyledSpinner />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'copy processing';
    gap: 10px;
  }
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

const StyledSpinner = styled(props => <Spinner {...props} />)`
  grid-area: processing;
`

export default ProcessingSocialLoginShelf
