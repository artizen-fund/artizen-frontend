import { useContext } from 'react'
import styled from 'styled-components'
import { rgba, LayoutContext, titleCase } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { RankAndArtifactCount, DonationBox } from '@components'
import { IProjectFragment } from '@types'
import Link from 'next/link'

interface IProjectCard {
  project?: IProjectFragment
  index: number
  totalSales: number
  matchFundPooled: number
  seasonIsActive?: boolean
}

const ProjectCard = ({ seasonIsActive, project, index, totalSales, matchFundPooled }: IProjectCard) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  if (!project) return <></>
  const latestArtifact = project.artifacts[0]
  const artist = project.members.find(m => m.type === 'lead')?.user
  const arrayOfOpenEdtionClean =
    latestArtifact.openEditionCopies.filter(({ status }: any) => status === 'confirmed') || []

  const count = arrayOfOpenEdtionClean.reduce((x: any, edition: any) => x + edition.copies!, 0) || 0

  return (
    <Wrapper>
      <AllCopy>
        <Header>
          <RankAndArtifactCount rank={index} totalSales={totalSales} matchFundPooled={matchFundPooled} count={count} />
          <ArtifactNumber>{count} Minted</ArtifactNumber>
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
        <Img
          src={`${latestArtifact.artwork?.replace('.png', '.jpg')}`}
          onClick={() =>
            setVisibleModalWithAttrs('media', {
              videoFile: latestArtifact.video,
              imageFile: latestArtifact.artwork?.replace('.png', '.jpg'),
            })
          }
        />
      </ImageWrapper>
      {seasonIsActive && <Footer>{<DonationBox tokenId={latestArtifact.token} {...{ project }} />}</Footer>}
    </Wrapper>
  )
}

const Artist = styled.div`
  position: absolute;
  z-index: 2;
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
  align-items: flex-end;
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

const ImageWrapper = styled.div`
  position: relative;
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
    width: 306px;
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
  align-self: end;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 0;
    gap: 20px;
  }
`

export default ProjectCard
