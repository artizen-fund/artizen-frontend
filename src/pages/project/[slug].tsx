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
  Leaderboard,
  ProjectDescriptionShimmer,
  ProjectLeaderboardShimmer,
} from '@components'
import { LayoutContext, SeasonContext, useDateHelpers } from '@lib'
import { typography, breakpoint } from '@theme'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_PROJECTS, SUBSCRIBE_SEASONS, SUBSCRIBE_OPEN_EDITIONS } from '@gql'
import { IProjectsQuery, ISubscribeSeasonsSubscription, IOpenEditionsSubscription, ISubmissionFragment } from '@types'

const ProjectPage = () => {
  const { seasonId } = useContext(SeasonContext)
  const { isSeasonActive } = useDateHelpers()

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

  //TODO: this code does assume that the project has been submitted to the active season which will not be the case when the season ends
  const { loading: loadingSeason, data: seasonData } = useSubscription<ISubscribeSeasonsSubscription>(
    SUBSCRIBE_SEASONS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        where: {
          id: { _eq: seasonId },
        },
      },
    },
  )

  const project = data?.Projects[0]

  const { data: openEditions } = useSubscription<IOpenEditionsSubscription>(SUBSCRIBE_OPEN_EDITIONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        artifactId: { _eq: project?.artifacts[0].id },
      },
    },
  })

  if (!!loadingSeason || !seasonData || !project) {
    // todo: we have a loading placeholder somewhere
    return <></>
  }

  const seasonIsActive = isSeasonActive(seasonData.Seasons[0].startingDate, seasonData.Seasons[0]?.endingDate)

  const lead = project.members?.find(m => m.type === 'lead')?.user

  const rank = seasonData.Seasons[0].submissions
    ?.sort(
      (s1: ISubmissionFragment, s2: ISubmissionFragment) =>
        s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
        s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!,
    )
    .findIndex(submission => submission.project?.id === project.id)

  //TODO: This make this to refresh
  // const projectSubmissions = seasonData.Seasons[0].submissions?.filter(
  //   submission => submission.project?.id === project.id,
  // )

  const count = openEditions?.OpenEditionCopies.reduce((x, edition) => x + edition.copies!, 0) || 0
  return (
    <Layout>
      <PagePadding>
        <Wrapper>
          <Side>
            <Header>
              {loading && <ProjectDescriptionShimmer />}
              {!loading && (
                <>
                  <Topline>
                    <RankAndArtifactCount rank={rank} count={count} />
                    <Button
                      level={2}
                      outline
                      onClick={() =>
                        setVisibleModalWithAttrs('share', {
                          mode: 'project',
                          destination: asPath,
                          projectTitle: project.title,
                          artizenHandle: project?.members?.find(m => m.type === 'lead')?.user?.artizenHandle,
                          twitterHandle: project?.members?.find(m => m.type === 'lead')?.user?.twitterHandle,
                        })
                      }
                    >
                      Share
                    </Button>
                  </Topline>
                  <h1>{project.title}</h1>
                  <p>{project.logline}</p>
                  <Tags tags={project.impactTags?.split(',') || []} />

                  {lead && <CreatorBox user={lead} />}
                </>
              )}
            </Header>

            {loading && <ProjectLeaderboardShimmer />}
            {!loading && <Leaderboard openEditions={openEditions} />}

            <LongDescription>
              {(project.metadata as Array<{ title: string; value: string }>).map((metadatum, index) => (
                <div key={`metadatum-${index}`}>
                  <h2>{metadatum.title}</h2>
                  <p>{metadatum.value}</p>
                </div>
              ))}
            </LongDescription>
          </Side>

          <Side>
            {/* TODO: Artifacts should be an object instead of an array  */}
            {/* This is wrong, we need to use the artifact from the submission */}
            <ArtifactCard artifact={project.artifacts[0]} project={project} {...{ seasonIsActive }} />
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
