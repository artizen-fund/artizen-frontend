import { useContext } from 'react'
import styled from 'styled-components'
import { rgba, LayoutContext } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { IArtifactFragment, IProjectFragment } from '@types'
import { DonationBox } from '@components'

interface IArtifactCard {
  artifact: IArtifactFragment
  project: IProjectFragment
  seasonIsActive: boolean
}

const ArtifactCard = ({ artifact, project, seasonIsActive }: IArtifactCard) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  return (
    <Wrapper>
      <Img
        src={artifact.artwork}
        onClick={() =>
          setVisibleModalWithAttrs('media', {
            videoFile: artifact.video,
            imageFile: artifact.artwork?.replace('/upload', '/upload/w_1000').replace('.png', '.jpg'),
          })
        }
      />
      <AllCopy>
        <Copy>
          <h2>Artifact #{artifact.token}</h2>
          <OpenEdition>Open Edition</OpenEdition>
        </Copy>
        {seasonIsActive && (
          <Footer>{artifact.token && <DonationBox tokenId={artifact.token} project={project} />}</Footer>
        )}
      </AllCopy>
    </Wrapper>
  )
}

const AllCopy = styled.div`
  padding: 0 20px 20px 20px;
  @media only screen an (min-width: ${breakpoint.tablet}px) {
    padding: 0;
    display: contents;
  }
`

const Wrapper = styled.article`
  grid-area: card;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen an (min-width: ${breakpoint.tablet}px) {
    padding: 40px;
  }
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
  }
`

const OpenEdition = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Copy = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0.5em 0;
    ${typography.title.l2}
  }
  p {
    margin: 1em 0;
    ${typography.body.l3}
  }
`

const Img = styled.img`
  width: 100%;
  height: auto;
  background: ${rgba(palette.algae)};
  border-radius: 16px 16px 0 0;
  @media only screen an (min-width: ${breakpoint.tablet}px) {
    border-radius: 16px;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`

export default ArtifactCard
