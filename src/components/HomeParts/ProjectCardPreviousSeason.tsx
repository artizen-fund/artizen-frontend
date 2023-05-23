import { useContext } from 'react'
import styled from 'styled-components'
import { rgba, LayoutContext } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { RankAndArtifactCount, DonationBox } from '@components'
import { titleCase } from 'title-case'
import { IProjectFragment } from '@types'
import Link from 'next/link'

interface IProjectCard {
  project?: IProjectFragment
  index: number
}

const ProjectCardPreviousSeason = ({ project, index }: IProjectCard) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  if (!project) return <></>
  const latestArtifact = project.artifacts[0]
  const artist = project.members.find(m => m.type === 'lead')?.user
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
            <h2>{project.title && titleCase(project.title)}</h2>
          </Link>
          <p>{project.logline}</p>
        </Copy>
      </AllCopy>
      <ImageWrapper>
        {artist && (
          <Artist>
            <Avatar src={artist.profileImage} />
            <div>{artist.artizenHandle}</div>
          </Artist>
        )}
        <ArtistBoxGradient />
        <Img
          src={`${latestArtifact.artwork?.replace('/upload', '/upload/w_1000').replace('.png', '.jpg')}`}
          onClick={() =>
            setVisibleModalWithAttrs('media', {
              videoFile: latestArtifact.video,
              imageFile: latestArtifact.artwork?.replace('/upload', '/upload/w_1000').replace('.png', '.jpg'),
            })
          }
        />
      </ImageWrapper>
    </Wrapper>
  )
}

const ArtistBoxGradient = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%);
  z-index: 2;
  display: flex;
  position: absolute;
  bottom: 6px;
  flex-direction: row;
  height: 100px;
  align-items: center;
  width: 100%;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    bottom: 0;
  }
`

const Artist = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 16px;
  left: 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  color: white;
  ${typography.label.l2}
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.14));
`

const AllCopy = styled.div`
  grid-area: copy;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 20px 0 20px;
  margin: 0 0 20px 0;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 0;
    gap: 20px;
  }
`

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'art' 'copy';
  gap: 10px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-areas: 'copy' 'art';
    padding: 40px;
    gap: 20px;
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

const ImageWrapper = styled.div`
  position: relative;
  grid-area: art;
  align-self: end;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
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

export default ProjectCardPreviousSeason
