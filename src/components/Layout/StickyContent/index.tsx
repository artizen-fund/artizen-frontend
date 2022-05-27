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

This design expects that sticky content will not be used on sub-laptop sizes; that could be inaccurate.
 */

const StickyContent = styled.div`
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    position: sticky;
    left: 0;
    top: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 88px;
  }
`

const StickyCanvas = styled.section`
  position: relative;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

export { StickyContent, StickyCanvas }
