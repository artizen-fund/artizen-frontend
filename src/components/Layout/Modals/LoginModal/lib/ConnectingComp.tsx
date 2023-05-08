import { useContext } from 'react'
import styled from 'styled-components'
import { LayoutContext, rgba } from '@lib'
import { CloseButton } from '@components'
import { typography, breakpoint, palette } from '@theme'

const ConnectingComp = () => {
  return (
    <>
      <Image light="/assets/illustrations/guide/05.png" dark="/assets/illustrations/guide/05-dark.png" />
      <h1>Confirm the connection in your wallet</h1>
      <p>When you’re ready, confirm the connection in your wallet.</p>
    </>
  )
}

const Image = styled.div<{ light: string; dark: string }>`
  width: 100%;
  height: 130px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  background-image: url(${props => props.light});
  @media (prefers-color-scheme: dark) {
    background-image: url(${props => props.dark});
  }
`

export default ConnectingComp
