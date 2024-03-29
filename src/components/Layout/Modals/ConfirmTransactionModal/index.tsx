import { useContext } from 'react'
import styled from 'styled-components'
import { LayoutContext, rgba } from '@lib'
import { CloseButton } from '@components'
import { typography, breakpoint, palette } from '@theme'

const ConfirmTransactionModal = () => {
  const { toggleModal } = useContext(LayoutContext)
  // todo: it would be good if we could automatically detect when
  //   user turns down Metamask or WalletConnect
  return (
    <Wrapper>
      <Image light="/assets/illustrations/guide/05.png" dark="/assets/illustrations/guide/05-dark.png" />
      <h1>Confirm the transaction in your wallet</h1>
      <p>When you’re ready, confirm the transaction in your wallet.</p>
      <CloseButton onClick={() => toggleModal()} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 40px 25px;
  max-width: calc(100vw - 20px);
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    padding: 40px;
    max-width: 507px;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: none;
    width: 416px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 65px;
    width: 568px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 80px;
    width: 840px;
  }
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }

  text-align: center;

  h1 {
    margin-top: 1em;
    ${typography.title.l2}
  }
  p {
    margin-top: 1em;
    ${typography.body.l3}
  }
`

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

export default ConfirmTransactionModal
