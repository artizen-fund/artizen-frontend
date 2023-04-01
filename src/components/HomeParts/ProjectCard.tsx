import styled from 'styled-components'
import { rgba, BASE_ARTIFACT_PRICE } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Button, RankAndArtifactCount, DonationBox } from '@components'
import { IProjectFragment } from '@types'
import Link from 'next/link'

interface IProjectCard {
  project?: IProjectFragment
  index: number
}

const ProjectCard = ({ project, index }: IProjectCard) => {
  if (!project) return <></>
  const latestArtifact = project.artifacts[0]
  return (
    <Wrapper>
      <Header>
        <RankAndArtifactCount
          rank={index}
          count={latestArtifact.openEditionCopies_aggregate.aggregate?.sum?.copies || 0}
        />
        <ArtifactNumber>Artifact #{latestArtifact.token}</ArtifactNumber>
      </Header>
      <Copy>
        <Link href={`/project/${project.titleURL!}`}>
          <h2>{project.title}</h2>
        </Link>
        <p>{project.description}</p>
      </Copy>
      <Link href={`/project/${project.titleURL!}`}>
        <Img src={`${latestArtifact.artwork?.replace('/upload', '/upload/w_1000').replace('.png', '.jpg')}`} />
      </Link>
      <Footer>
        <DonationBox tokenId={latestArtifact.token} />
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    width: 300px;
    height: 300px;
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
