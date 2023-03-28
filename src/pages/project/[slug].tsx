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
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '@gql'
import { IProjectsQuery } from '@types'

const ProjectPage = () => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const {
    query: { slug },
    asPath,
  } = useRouter()

  const { loading, data, error } = useQuery<IProjectsQuery>(GET_PROJECTS, {
    skip: !slug,
    variables: {
      limit: 1,
      where: {
        titleURL: {
          _eq: slug,
        },
      },
    },
  })

  const project = data?.Projects[0]

  if (!!loading) return <p>…loading…</p>

  const lead = project && project.members?.find(m => m.type === 'lead')?.user

  return (
    <Layout>
      <PagePadding>
        <Wrapper>
          <Side>
            <Header>
              <Topline>
                <RankAndArtifactCount rank={1} count={128} />
                <Button level={2} outline onClick={() => setVisibleModalWithAttrs('share', { destination: asPath })}>
                  Share
                </Button>
              </Topline>
              <h1>{project?.title}</h1>
              <p>{project?.logline}</p>
              {/* <Tags tags={sampleTags} /> */}

              {lead && <CreatorBox member={lead} />}
            </Header>

            {/*<Leaderboard />*/}

            <LongDescription>
              {(project?.metadata as Array<{ title: string; value: string }>).map((metadatum, index) => (
                <div key={`metadatum-${index}`}>
                  <h2>{metadatum.title}</h2>
                  <p>{metadatum.value}</p>
                </div>
              ))}
            </LongDescription>
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
