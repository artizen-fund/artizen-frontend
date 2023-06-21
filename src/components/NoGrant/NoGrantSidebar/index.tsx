import styled from 'styled-components'
import { StickyContent, StickyCanvas, Button } from '@components'
import { breakpoint, palette, typography } from '@theme'
// import { IGetAdjacentGrantQuery } from '@types'
import { rgba } from '@lib'
import { useQuery } from '@apollo/client'
// import { GET_ADJACENT_GRANT } from '@gql'
import Link from 'next/link'

const NoGrantSidebar = () => {
  return (
    <Wrapper>
      <Bar>
        <Copy>
          <GrantDate>No active project yet</GrantDate>
        </Copy>
      </Bar>
      <Body>
        <Header>New season coming soon</Header>

        <Message>
          Season #01 raised $30,000+ for creators around the world. Apply today for season #02 to get your project
          funded.
        </Message>

        <Button href=" https://vote.artizen.fund/submit">Apply for funding</Button>

        <HowItWorks href="/derp">Or see how it works here</HowItWorks>
      </Body>
    </Wrapper>
  )
}

const HowItWorks = styled(props => <Link {...props} />)`
  display: block;
  margin-top: 1em;
  text-align: center;
  ${typography.label.l1}
  text-decoration: underline;
`

const Bar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
`

const Wrapper = styled(props => <StickyContent {...props} />)`
  grid-area: sidebar;
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
    border-bottom: 1px solid rgba(114, 124, 140, 0.12);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 0px 0px 16px 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 100%;
    top: 92px;
    padding: 40px;
    border-radius: 16px 16px 16px 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 108px;
  }
`

const Body = styled.div`
  padding: 24px;
`

const Header = styled.h3`
  ${typography.title.l2}
  text-align: center;
`

const Message = styled.p`
  ${typography.body.l1}
  margin: 1em 0;
  text-align: center;
`

const Copy = styled.header`
  text-align: center;
`

const GrantDate = styled.div`
  ${typography.title.l4}
`

export default NoGrantSidebar
