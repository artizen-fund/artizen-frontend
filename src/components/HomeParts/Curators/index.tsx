import styled from 'styled-components'
import { PagePadding } from '@components'
import { assetPath, rgba } from '@lib'
import { breakpoint, typeface, typography, palette } from '@theme'
import { curators } from '@copy/home'

const Curators = () => (
  <PagePadding>
    <Wrapper>
      <Headline>{curators.title}</Headline>
      <Copy>{curators.copy}</Copy>
      <ul>
        {curators.curators.map((curator, i) => (
          <a href={curator.link} target="_blank" rel="noreferrer" key={`curator-${i}`}>
            <Curator>
              <img src={assetPath(`${curator.portrait}?fm=webp`)} alt={curator.name} />
              <Description>
                <Name>{curator.name}</Name>
                <Title>{curator.title}</Title>
              </Description>
            </Curator>
          </a>
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

const Copy = styled.p`
  ${typography.body.l2}
`

const Curator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
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
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }

  transition: box-shadow 0.25s ease-in-out;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  }
`

const Description = styled.div`
  padding: 22px 16px;
`

const Name = styled.div`
  ${typography.label.l1}
`

const Title = styled.div`
  ${typography.label.l2}
  font-family: ${typeface.mackinacPro};
  font-weight: 500;
`

export default Curators
