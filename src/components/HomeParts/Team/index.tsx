import styled from 'styled-components'
import { PagePadding } from '@components'
import { assetPath, rgba } from '@lib'
import { breakpoint, typeface, typography, palette } from '@theme'
import { team } from '@copy/home'

const Team = () => (
  <PagePadding>
    <Wrapper>
      <Headline>{team.title}</Headline>
      <ul>
        {team.curators.map((person, i) => (
          <TeamMember key={`person-${i}`}>
            <img src={assetPath(`${person.portrait}?fm=webp`)} alt={person.name} />
            <Description>
              <Name>{person.name}</Name>
              <Title>{person.title}</Title>
            </Description>
          </TeamMember>
        ))}
      </ul>
    </Wrapper>
  </PagePadding>
)

const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ul {
    margin: 50px auto auto auto;
    display: grid;
    grid-template-columns: repeat(2, 150px);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
    }
  }
`

const Headline = styled.h2`
  ${typography.title.l2}
`

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  img {
    max-width: 100%;
  }
  width: 150px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 175px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 222px;
  }
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
`

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px 0 24px 0;
`

const Name = styled.div`
  ${typography.label.l1}
`

const Title = styled.div`
  ${typography.label.l2}
  font-family: ${typeface.mackinacPro};
  font-weight: 500;
`

export default Team
