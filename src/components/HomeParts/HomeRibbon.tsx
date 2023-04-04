import styled from 'styled-components'
import { assetPath, rgba } from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { homeRibbon as copy } from '@copy/home'
import { PagePadding } from '@components'

const HomeRibbon = () => (
  <Wrapper>
    <List>
      {copy.map((item, i) => (
        <Item key={`ribbon-item-${i}`}>
          <Title>{item.title}</Title>
          <Copy>{item.copy}</Copy>
        </Item>
      ))}
    </List>
  </Wrapper>
)

const Wrapper = styled(props => <PagePadding {...props} />)`
  background-color: ${rgba(palette.night)};
`

const List = styled.ul`
  display: flex;
  gap: 15px;
  flex-direction: column;
  padding: 0px 0;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 80px 0;
  }
`

const Item = styled.li`
  display: block;
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
