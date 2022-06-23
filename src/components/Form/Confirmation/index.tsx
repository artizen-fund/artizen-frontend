import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette } from '@theme'

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
export default Confirmation
