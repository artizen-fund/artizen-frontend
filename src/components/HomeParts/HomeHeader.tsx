import styled from 'styled-components'
import { PagePadding, Button, HomeAnimation } from '@components'
import { header } from '@copy/home'
import { typography, breakpoint } from '@theme'

const HomeHeader = () => {
  const scrollToLeaderboard = () => alert('todo')
  return (
    <PagePadding>
      <Header>
        <HomeAnimation />
        <Copy>
          <div>
            <h1>{header.title}</h1>
            <h2>{header.subtitle}</h2>
          </div>
          <Button level={0} onClick={scrollToLeaderboard}>
            {header.buttonLabel}
          </Button>
        </Copy>
      </Header>
    </PagePadding>
  )
}

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  div {
    margin-bottom: 60px;
  }
`

export default HomeHeader
