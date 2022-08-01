import styled from 'styled-components'
import { Icon } from '@components'
import { typography } from '@theme'

const DonationHelpLink = () => (
  <Wrapper>
    <Icon outline glyph="info" level={2} />
    <Copy>Need help? We’ve prepared a useful guide to donating.</Copy>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`

const Copy = styled.p`
  ${typography.label.l1}
`

export default DonationHelpLink
