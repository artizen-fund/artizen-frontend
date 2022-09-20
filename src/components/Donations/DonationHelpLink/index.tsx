import { useContext } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { typography } from '@theme'
import { DonationContext } from '@lib'

const DonationHelpLink = () => {
  const { toggleShelf } = useContext(DonationContext)
  return (
    <Wrapper onClick={() => toggleShelf?.('donationGuide')}>
      <Icon outline glyph="infoLarge" level={1} />
      <Copy>
        Need help? Follow this <em>donation guide</em>.
      </Copy>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`

const Copy = styled.p`
  ${typography.label.l1}

  em {
    font-style: normal;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`

export default DonationHelpLink
