import styled from 'styled-components'
import { assetPath, rgba } from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { homeRibbon as copy } from '@copy/home'

const HomeRibbon = () => (
  <Wrapper>
    {copy.map((item, i) => (
      <Item key={`ribbon-item-${i}`}>
        <Title>{item.title}</Title>
        <Copy>{item.copy}</Copy>
      </Item>
    ))}
  </Wrapper>
)

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  background-color: ${rgba(palette.night)};
`

const Item = styled.li`
  position: relative;
  padding: 0 25px;
  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background-color: ${rgba(palette.stone, 0.24)};
  }
`

const Title = styled.h2`
  color: ${rgba(palette.white)};
  ${typography.title.l4}
`

const Copy = styled.p`
  color: ${rgba(palette.barracuda)};
  ${typography.label.l1}
`

export default HomeRibbon
