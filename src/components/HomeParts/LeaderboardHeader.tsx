import { useInViewport } from 'react-in-viewport'
import { useRef } from 'react'
import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { PagePadding } from '@components'

const LeaderboardHeader = () => {
  const trigger = useRef<HTMLDivElement>(null)

  const { inViewport } = useInViewport(trigger)

  return (
    <Wrapper shadowVisible={!inViewport}>
      <Trigger ref={trigger} />
      <StyledPagePadding>
        <Content>
          <Copy>
            <Title>Leaderboard</Title>
            <Stats>
              <Stat>
                <Label>Artizen Award</Label>
                <Data>Ξ 23</Data>
              </Stat>
              <Stat>
                <Label>Cycle</Label>
                <Data>Season 2</Data>
              </Stat>
              <Stat>
                <Label>Ends in</Label>
                <Data>13d : 8h : 44m</Data>
              </Stat>
            </Stats>
          </Copy>
          <OfficialSelection src={assetPath('/assets/officialSelection.svg')} />
        </Content>
      </StyledPagePadding>
    </Wrapper>
  )
}

const Trigger = styled.div`
  position: absolute;
  top: -10px;
  width: 1px;
  height: 1px;
`

const Wrapper = styled.header<{ shadowVisible: boolean }>`
  position: sticky;
  z-index: 102;
  top: 0px;
  left: 0;

  padding-top: 76px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 84px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-top: 100px;
  }

  background: ${props => rgba(palette.white, props.shadowVisible ? 0.98 : 1)};
  filter: drop-shadow(
    ${props => (props.shadowVisible ? '0px 4px 16px rgba(0, 0, 0, 0.48)' : '0px 0.5px 0px rgba(217, 219, 224, 1)')}
  );
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, props.shadowVisible ? 0.98 : 1)};
    filter: drop-shadow(
      ${props => (props.shadowVisible ? '0px 4px 16px rgba(0, 0, 0, 0.48)' : '0px 0.5px 0px rgba(114, 124, 140, 0.64)')}
    );
  }
  backdrop-filter: blur(${props => (props.shadowVisible ? 16 : 0)}px);

  border-bottom: 0.5px solid transparent;
  transition: border-color 0.3s 0.15s ease-in-out, background-color 0.3s ease-in-out, filter 0.3s ease-in-out,
    backdrop-filter 0.3s ease-in-out;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  padding: 20px 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const Copy = styled.div``

const Title = styled.h2`
  ${typography.title.l2}
  margin-bottom: 32px;
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 60px;
`

const Stat = styled.div`
  position: relative;
  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -30px;
    width: 1px;
    height: 100%;
    background-color: ${rgba(palette.stone)};
  }
  &:first-child:before {
    display: none;
  }
`

const Label = styled.h3`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Data = styled.div`
  ${typography.title.l4}
`

const OfficialSelection = styled.img`
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
`

export default LeaderboardHeader
