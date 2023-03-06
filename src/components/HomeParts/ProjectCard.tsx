import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Button, Glyph, DonationBox } from '@components'
import numeral from 'numeral'

const ProjectCard = (props: any) => (
  <Wrapper>
    <Header>
      <Left>
        <Rank>{numeral(1).format('Oo')}</Rank>
        <Count>
          <span>128 minted</span> <Glyph glyph="trend" level={2} color="barracuda" />
        </Count>
      </Left>
      <ArtifactNumber>Artifact #28</ArtifactNumber>
    </Header>
    <Copy>
      <h2>Project Name</h2>
      <p>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec id elit
        non mi porta gravida at eget metus.
      </p>
    </Copy>
    <Img />
    <Footer>
      <Cost>
        <div>cost</div>
        <Amount>
          <span>Ξ 23.61</span>
        </Amount>
      </Cost>
      <DonationBox blockchainId="abc123" />
      <NumberInput>1</NumberInput>
      <Button level={1} onClick={() => alert('todo')}>
        Mint
      </Button>
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`

const Rank = styled.div`
  color: ${rgba(palette.algae)};
  ${typography.title.l4}
`

const Count = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};

  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -8px;
    width: 1px;
    height: 100%;
    background-color: ${rgba(palette.stone)};
  }
`

const ArtifactNumber = styled.div`
  color: ${rgba(palette.barracuda)};
  ${typography.label.l1}
`

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

export default ProjectCard
