import styled from 'styled-components'
import { typography, breakpoint } from '@theme'

const LongDescription = () => (
  <Wrapper>
    <h2>What are you making? </h2>
    <p>
      Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non
      magna.
    </p>
    <h2>What are you making? </h2>
    <p>
      Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non
      magna.
    </p>
    <h2>What are you making? </h2>
    <p>
      Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non
      magna.
    </p>
  </Wrapper>
)

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
