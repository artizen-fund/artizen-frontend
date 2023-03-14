import { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {
  Layout,
  PagePadding,
  Button,
  RankAndArtifactCount,
  Tags,
  Leaderboard,
  ArtifactCard,
  CreatorBox,
  LongDescription,
} from '@components'
import { rgba, LayoutContext } from '@lib'
import { typography, breakpoint, palette } from '@theme'

const ProjectPage = () => {
  const { setVisibleModal } = useContext(LayoutContext)

  const {
    query: { slug },
  } = useRouter()

  const sampleCreator = {
    name: 'Creator name',
    avatar: undefined,
    twitterHandle: 'eric_wvgg',
    url: 'https://wvgg.co',
  }

  const sampleTags = ['Documentary', 'Sci-Fi', 'Empowering Women']

  return (
    <Layout>
      <PagePadding>
        <Wrapper>
          <Left>
            <Header>
              <Topline>
                <RankAndArtifactCount rank={1} count={128} />
                <Button level={2} outline onClick={() => setVisibleModal('share')}>
                  Share
                </Button>
              </Topline>
              <h1>Project Title</h1>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                Curabitur blandit tempus porttitor.
              </p>
              <Tags tags={sampleTags} />

              <CreatorBox {...sampleCreator} />
            </Header>

            {/*<Leaderboard />*/}

            <LongDescription />
          </Left>
          <Right>
            <ArtifactCard />
          </Right>
        </Wrapper>
      </PagePadding>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
`

const Left = styled.article`
  flex: 1;
`

const Header = styled.header`
  h1 {
    margin-top: 1em;
    ${typography.title.l2}
  }
  p {
    margin-top: 1em;
    ${typography.body.l2}
  }
`

const Topline = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: space-between;
  }
`

const Right = styled.aside`
  flex: 1;
`

export default ProjectPage
