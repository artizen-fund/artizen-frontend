import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Button, ArtifactCount, DonationBox, Rank } from '@components'

const ArtifactCard = (props: any) => (
  <Wrapper>
    <Img />
    <Copy>
      <h2>Project Name</h2>
      <OpenEdition>Open Edition</OpenEdition>
    </Copy>
    <Footer>
      <Cost>
        <div>cost</div>
        <Amount>
          <span>Ξ 23.61</span>
        </Amount>
      </Cost>
      <DonationBox blockchainId="abc123" />
    </Footer>
  </Wrapper>
)

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
`

const OpenEdition = styled.div``

const Copy = styled.div`
  h2 {
    ${typography.title.l2}
  }
  p {
    ${typography.body.l3}
  }
`

const Img = styled.div`
  width: 100%;
  height: 50px;
  background: green;
  border-radius: 16px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`

const Cost = styled.div`
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`
const Amount = styled.div`
  ${typography.label.l0}
  color: ${rgba(palette.night)};
`

const NumberInput = styled.div``

export default ArtifactCard
