import styled from 'styled-components'
import { typography, breakpoint } from '@theme'

const LongDescription = (props: any) => <Wrapper {...props} />

const Wrapper = styled.div`
  grid-area: description;

  margin: 32px 0;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    margin: 0;
  }

  h2 {
    margin: 1em 0;
    ${typography.label.l2}
  }

  p {
    margin: 1em 0;
    ${typography.body.l2}
  }
`

export default LongDescription
