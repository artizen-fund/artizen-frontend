import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Button, RankAndArtifactCount, DonationBox } from '@components'
import { IProjectFragment } from '@types'

interface IProjectCard {
  project?: IProjectFragment
  index: number
}

const BASE_ARTIFACT_PRICE = 0.01

const ProjectCard = ({ project, index }: IProjectCard) => {
  if (!project) return <></>
  const latestArtifact = project.artifacts[0]
  return (
    <Wrapper>
      <Header>
        <RankAndArtifactCount
          rank={index + 1}
          count={latestArtifact.openEditionCopies_aggregate.aggregate?.count || 0}
        />
        <ArtifactNumber>Artifact #{latestArtifact.token}</ArtifactNumber>
      </Header>
      <Copy>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </Copy>
      <Img src={latestArtifact.artwork} />
      <Footer>
        <DonationBox tokenId={latestArtifact.token} />
      </Footer>
    </Wrapper>
  )
}

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

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 50px;
  background: green;
  border-radius: 16px;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 382px;
    height: 382px;
  }
  @media only screen and (min-width: ${breakpoint.laptopXL}px) {
    width: 510px;
    height: 510px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 440px;
    height: 440px;
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`

export default ProjectCard
