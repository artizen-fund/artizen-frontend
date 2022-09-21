import { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { DonationContext } from '@lib'
import { typography } from '@theme'
import { donationComplete } from '@copy/donations'

const DonationComplete = () => {
  const { toggleShelf, setDonationStage } = useContext(DonationContext)
  const dismiss = () => {
    toggleShelf?.()
    setDonationStage?.('setAmount')
  }
  return (
    <Wrapper>
      <Image src={donationComplete.imageUrl} />
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

const Image = styled.img`
  max-width: 100%;
`

const Title = styled.h3`
  ${typography.title.l4}
`

const Copy = styled.p`
  ${typography.body.l3}
`

export default DonationComplete
