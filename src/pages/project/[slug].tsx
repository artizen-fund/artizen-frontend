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
  ProjectSponsors,
} from '@components'
import { LayoutContext, getTwitterHandler, createApolloClient, SeasonSubcriptionContext, titleCase } from '@lib'
import { typography, breakpoint } from '@theme'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_PROJECTS, SUBSCRIBE_OPEN_EDITIONS, LOAD_OPEN_EDITIONS } from '@gql'
import { IProjectFragment, IOpenEditionsSubscription, ISubmissionFragment } from '@types'
import Projects from '../admin'

const ProjectPage = () => {
  const {
    asPath,
    query: { slug },
  } = useRouter()

  // console.log('project  ', project)

  const { data, loading } = useQuery(GET_PROJECTS, {
    skip: !slug,
    variables: {
      where: {
        titleURL: {
          _eq: slug,
        },
      },
    },
  })

  const project: any = data?.Projects?.length > 0 && data?.Projects[0]

  const {
    season: seasonData,
    seasonIsActive,
    totalSales,
    loading: loadingSeason,
    arrangedSeasonList,
  } = useContext(SeasonSubcriptionContext)
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  //this should be only done when the season is active otherwise we should use the season from the project
  const { data: openEditionsSub } = useSubscription<IOpenEditionsSubscription>(SUBSCRIBE_OPEN_EDITIONS, {
    skip: !project || !seasonIsActive,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        artifactId: { _eq: project && project.artifacts[0].id },
      },
    },
  })

  const { data: openEditionsQuery } = useQuery(LOAD_OPEN_EDITIONS, {
    skip: !project || seasonIsActive,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        artifactId: { _eq: project && project?.artifacts[0].id },
      },
    },
  })

  const openEditions = openEditionsSub || openEditionsQuery

  const lead = project?.members?.find((m: any) => m.type === 'lead')?.user

  const rank = arrangedSeasonList?.findIndex(submission => submission.project?.id === project.id) || 0

  console.log('project rank::::      ', rank)

  const arrayOfOpenEdtionClean =
    openEditions?.OpenEditionCopies.filter(({ status }: any) => {
      console.log('data in here::::', status)
      return status === 'confirmed'
    }) || []
  console.log('arrayOfOpenEdtionClean:::::::: ', arrayOfOpenEdtionClean)
  const count = arrayOfOpenEdtionClean.reduce((x: any, edition: any) => x + edition.copies!, 0) || 0

  console.log('count in here::::::  ', count)

  return (
    <Layout>
      <PagePadding>
        {loading && <ProjectDescriptionShimmer />}
        {project && (
          <Wrapper>
            <Side>
              <Header>
                {loadingSeason && <ProjectDescriptionShimmer />}
                <>
                  <Topline>
                    <div>
                      {!loadingSeason && (
                        <RankAndArtifactCount
                          rank={rank}
                          count={count}
                          seasonIsActive={seasonIsActive}
                          totalSales={totalSales ? totalSales : 0}
                          matchFundPooled={seasonData?.matchFundPooled}
                        />
                      )}
                    </div>

                    <Button
                      level={2}
                      outline
                      onClick={() =>
                        setVisibleModalWithAttrs('share', {
                          mode: 'project',
                          destination: asPath,
                          projectTitle: titleCase(project.title),
                          artizenHandle: lead?.artizenHandle,
                          twitterHandle: getTwitterHandler(lead?.twitterHandle),
                        })
                      }
                    >
                      Share
                    </Button>
                  </Topline>
                  <>
                    <h1>{project.title}</h1>
                    <p>{project.logline}</p>
                    <Tags tags={project.impactTags?.split(',') || []} />
                    {lead && <CreatorBox user={lead} />}
                  </>
                </>
              </Header>

              {loadingSeason && <ProjectLeaderboardShimmer />}
              {openEditions && seasonData && (
                <>
                  <Leaderboard
                    openEditions={{ OpenEditionCopies: arrayOfOpenEdtionClean }}
                    isWinner={rank === 0}
                    count={count}
                    totalSales={totalSales ? totalSales : 0}
                    matchFundPooled={seasonData?.matchFundPooled}
                  />
                  <ProjectSponsors projectId={project.id} />
                </>
              )}
              {project?.metadata && project?.metadata.length > 0 && (
                <LongDescription>
                  {(project.metadata as Array<{ title: string; value: string }>).map((metadatum, index) => (
                    <div key={`metadatum-${index}`}>
                      <h2>{metadatum.title}</h2>
                      <p>{metadatum.value}</p>
                    </div>
                  ))}
                </LongDescription>
              )}
            </Side>
            {project.artifacts && project.artifacts.length > 0 && (
              <Side>
                <ArtifactCard
                  count={count}
                  artifact={project.artifacts[0]}
                  project={project}
                  seasonIsActive={seasonIsActive || false}
                />
              </Side>
            )}
          </Wrapper>
        )}
      </PagePadding>
    </Layout>
  )
}

// export const getServerSideProps = async (context: any) => {
//   const { slug } = context.params

//   console.log('slug     ', slug)

//   const apolloClient = createApolloClient()
//   const projects = await apolloClient.query({
//     query: GET_PROJECTS,
//     variables: {
//       where: {
//         titleURL: {
//           _eq: slug,
//         },
//       },
//     },
//   })

//   return {
//     props: {
//       project: projects.data.Projects[0],
//     },
//   }
// }

// export async function getStaticPaths() {
//   const apolloClient = createApolloClient()
//   const projects = await apolloClient.query({
//     query: GET_PROJECTS,
//   })

//   const paths = projects.data.Projects.map((project: IProjectFragment) => {
//     return {
//       params: { slug: project.titleURL },
//     }
//   })

//   return { paths, fallback: true }
// }

// interface IGetStaticPropsParams {
//   slug: string
// }

// export async function getStaticProps({ params: { slug } }: { params: IGetStaticPropsParams }) {
//   console.log('params  in getStaticProps', slug)

//   const apolloClient = createApolloClient()
//   const projects = await apolloClient.query({
//     query: GET_PROJECTS,
//     variables: {
//       where: {
//         titleURL: {
//           _eq: slug,
//         },
//       },
//     },
//   })

//   return {
//     props: {
//       project: projects.data.Projects[0],
//     },
//   }
// }

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
