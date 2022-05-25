import styled from 'styled-components'
import { breakpoint } from '@theme'

/* Notes on use…

This component is designed to be extended in all instances.
  ex. const Sidebar = styled(props => <StickyContent {...props} />)
      const Canvas = styled(props => <StickyCanvas {...props} />)

The desired layout should then be designed in Sidebar and Canvas components.
Consider all the styles here to be default parameters.

Note that the default top figures in StickyContent will place the content directly under the <Header />.
If you desire a bit of space, you'll need to override those styles at all responsive sized.
 */

const StickyContent = styled.div`
  position: sticky;
  min-width: 30%;
  left: 0;
  top: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    top: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 88px;
  }
`

const StickyCanvas = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export { StickyContent, StickyCanvas }
