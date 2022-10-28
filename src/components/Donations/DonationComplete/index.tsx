import { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { LayoutContext, assetPath, useProcessDonation } from '@lib'
import { typography } from '@theme'
import { donationComplete } from '@copy/donations'

const DonationComplete = () => {
  const { toggleShelf, setDonationStage, setDonationStatus } = useContext(LayoutContext)
  const { disconnect } = useProcessDonation()
  const dismiss = () => {
    disconnect?.()
    setDonationStatus?.('completed')
    toggleShelf?.()
    setDonationStage?.('setAmount')
  }
  return (
    <Wrapper>
      <Image src={assetPath('/assets/illustrations/donations/last-step.png?fm=webp')} />
      <Image dark src={assetPath('/assets/illustrations/donations/last-step-dark.png?fm=webp')} />
      <Title>{donationComplete.title}</Title>
      <Copy>{donationComplete.copy}</Copy>
      <Button onClick={() => dismiss()} level={2}>
        Continue to Leaderboard
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Image = styled.img<{ dark?: boolean }>`
  max-width: 100%;
  @media (prefers-color-scheme: light) {
    display: ${props => (props.dark ? 'none' : 'block')};
  }
  @media (prefers-color-scheme: dark) {
    display: ${props => (props.dark ? 'block' : 'none')};
  }
`

const Title = styled.h3`
  ${typography.title.l4}
`

const Copy = styled.p`
  ${typography.body.l3}
`

export default DonationComplete
