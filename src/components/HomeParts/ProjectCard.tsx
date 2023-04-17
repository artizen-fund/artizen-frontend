import { useContext } from 'react'
import styled from 'styled-components'
import { rgba, LayoutContext } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { RankAndArtifactCount, DonationBox } from '@components'
import { IProjectFragment } from '@types'
import Link from 'next/link'

interface IProjectCard {
  project?: IProjectFragment
  index: number
}

const ProjectCard = ({ project, index }: IProjectCard) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  if (!project) return <></>
  const latestArtifact = project.artifacts[0]
  return (
    <Wrapper>
      <AllCopy>
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
          <p>{project.logline}</p>
        </Copy>
      </AllCopy>
      <Img
        src={`${latestArtifact.artwork?.replace('/upload', '/upload/w_1000').replace('.png', '.jpg')}`}
        onClick={() =>
          setVisibleModalWithAttrs('media', {
            videoFile: latestArtifact.video,
            imageFile: latestArtifact.artwork?.replace('/upload', '/upload/w_1000').replace('.png', '.jpg'),
          })
        }
      />
      <Footer>
        <DonationBox tokenId={latestArtifact.token} />
      </Footer>
    </Wrapper>
  )
}

const AllCopy = styled.div`
  grid-area: copy;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 20px 0 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 0;
  }
`

const StyledLink = styled(props => <Link {...props} />)`
  grid-area: art;
`

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'art' 'copy' 'footer';
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-areas: 'copy' 'art' 'footer';
    padding: 40px;
  }
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
    ${typography.title.l3}
  }
  p {
    ${typography.body.l3}
  }
  @media only screen and (max-width: 743px) {
    p {
      display: none;
    }
  }
`

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  background: ${rgba(palette.algae)};
  border-radius: 16px 16px 0 0;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
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
  cursor: pointer;
`

const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  padding: 0 20px 20px 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 0;
    gap: 20px;
  }
`

export default ProjectCard
