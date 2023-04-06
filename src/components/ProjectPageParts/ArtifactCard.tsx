import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { IArtifactFragment } from '@types'
import { DonationBox } from '@components'

interface IArtifactCard {
  artifact: IArtifactFragment
}

const ArtifactCard = ({ artifact }: IArtifactCard) => (
  <Wrapper>
    <Img src={artifact.artwork} />
    <AllCopy>
      <Copy>
        <h2>Artifact #{artifact.token}</h2>
        <OpenEdition>Open Edition</OpenEdition>
      </Copy>
      <Footer>
        <DonationBox tokenId={artifact.token} />
      </Footer>
    </AllCopy>
  </Wrapper>
)

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
