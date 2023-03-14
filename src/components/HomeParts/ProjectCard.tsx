import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Button, RankAndArtifactCount, DonationBox } from '@components'

const ProjectCard = (props: any) => (
  <Wrapper>
    <Header>
      <RankAndArtifactCount rank={1} count={128} />
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
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`

const Cost = styled.div`
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`
const Amount = styled.div`
  white-space: nowrap;
  ${typography.label.l0}
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`

export default ProjectCard
