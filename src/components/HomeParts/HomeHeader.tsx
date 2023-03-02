import styled from 'styled-components'
import { PagePadding, Button } from '@components'
import { header } from '@copy/home'
import { typography, breakpoint } from '@theme'

const HomeHeader = () => {
  const scrollToLeaderboard = () => alert('todo')
  return (
    <PagePadding>
      <Header>
        <Poster src="/assets/noGrant.jpg" />
        <Copy>
          <h1>{header.title}</h1>
          <h2>{header.subtitle}</h2>
          <Button level={0} onClick={scrollToLeaderboard}>
            {header.buttonLabel}
          </Button>
        </Copy>
      </Header>
    </PagePadding>
  )
}

const Poster = styled.img`
  position: relative;
  z-index: 1;
  max-width: 50%;
  flex: 1;
  display: block;
  border-radius: 16px 16px 0 0;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
`

const Copy = styled.header`
  flex: 1;
  h1 {
    ${typography.title.l1};
  }
  h2 {
    margin-top: 0.5em;
    ${typography.body.l1};
  }
`

export default HomeHeader
