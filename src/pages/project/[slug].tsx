import { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  Layout,
  PagePadding,
  Button,
  RankAndArtifactCount,
  Tags,
  ArtifactCard,
  CreatorBox,
  LongDescription,
} from '@components'
import { LayoutContext } from '@lib'
import { typography, breakpoint } from '@theme'

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
          <Side>
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
          </Side>
          <Side>
            <ArtifactCard />
          </Side>
        </Wrapper>
      </PagePadding>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'header' 'card' 'description';
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
  }
`

const Side = styled.div`
  display: contents;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: block;
    flex: 1;
  }
`

const Header = styled.header`
  grid-area: header;
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

export default ProjectPage
