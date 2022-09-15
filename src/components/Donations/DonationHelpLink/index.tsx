import styled from 'styled-components'
import { Icon } from '@components'
import { typography } from '@theme'

const DonationHelpLink = () => (
  <Wrapper>
    <Icon outline glyph="info" level={2} />
    <Copy>
      Need help? Follow this <em>donation guide</em>.
    </Copy>
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

  em {
    font-style: normal;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`

export default DonationHelpLink
