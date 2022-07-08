import { cloneElement, Children } from 'react'
import styled from 'styled-components'
import { IAlternatingPanel } from '../AlternatingPanel'
import { PagePadding } from '@components'
import { breakpoint } from '@theme'

interface IAlternatingPanels {
  children: Array<React.ReactElement<IAlternatingPanel>>
}

const AlternatingPanels = ({ children }: IAlternatingPanels) => (
  <PagePadding>
    <Wrapper>{Children.map(children, (child, i) => cloneElement(child, { imageOnRight: !!(i % 2) }))}</Wrapper>
  </PagePadding>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 50px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 65px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 85px;
  }
`

export default AlternatingPanels
