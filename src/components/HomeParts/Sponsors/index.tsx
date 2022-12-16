import styled from 'styled-components'
import { assetPath } from '@lib'
import { breakpoint } from '@theme'

const Sponsors = () => (
  <Wrapper>
    <Microsoft />
    <ExtendedReality />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  margin-top: 24px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    flex-direction: row;
  }
`

const Microsoft = styled.div`
  width: 94px;
  height: 20px;
  background-image: url(${assetPath('/assets/microsoft.svg')});
  background-size: contain;
  background-repeat: no-repeat;
  @media (prefers-color-scheme: dark) {
    background-image: url(${assetPath('/assets/microsoft-dark.svg')});
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 150px;
    height: 24px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 150px;
    height: 65px;
    background-image: url(${assetPath('/assets/microsoft-presents.svg')});
    @media (prefers-color-scheme: dark) {
      background-image: url(${assetPath('/assets/microsoft-presents-dark.svg')});
    }
  }
`

const ExtendedReality = styled.div`
  width: 201px;
  height: 64px;
  background-size: contain;
  background-repeat: no-repeat;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 275px;
    height: 71px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 275px;
    height: 88px;
  }
  background-image: url(${assetPath('/assets/season-1.svg')});
  @media (prefers-color-scheme: dark) {
    background-image: url(${assetPath('/assets/season-1-dark.svg')});
  }
`

export default Sponsors
