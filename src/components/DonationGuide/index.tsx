import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette, ResponsiveSize } from '@theme'

import guideMap from './guide'

const DonationGuide = () => {
  return (
    <>
      <Wrapper>
        <h1>design Donation guide here</h1>
        <Icon glyph="face" />
      </Wrapper>
      <CloseButton />
      <Onionskin />
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 1001;
  top: 75px;
  left: 50px;
  height: calc(100vh - 75px);
  width: calc(100vw - 100px);

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 50px;
  padding: 50px;

  border: 1px dashed ${rgba(palette.uiAlert)};
`

const Onionskin = styled.div`
  z-index: 1000;
`

const CloseButton = styled.div`
  position: fixed;
  z-index: 1002;
  top: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  background: magenta;
  border-radius: 9999px;

  cursor: pointer;
`

export default DonationGuide
