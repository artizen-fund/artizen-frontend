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
import { LayoutContext, createApolloClient, SeasonSubcriptionContext } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_PROJECTS, SUBSCRIBE_SEASONS, SUBSCRIBE_OPEN_EDITIONS, LOAD_OPEN_EDITIONS } from '@gql'
import {
  IProjectsQuery,
  IProjectFragment,
  ISubscribeSeasonsSubscription,
  IOpenEditionsSubscription,
  ISubmissionFragment,
} from '@types'

const ProjectPage = ({ project }: any) => {
  console.log('project  ', project)
  const {
    season: seasonData,
    arrangedSeasonList,
    seasonIsActive,
    totalSales,
    loading: loadingSeason,
  } = useContext(SeasonSubcriptionContext)
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  //this should be only done when the season is active otherwise we should use the season from the project
  const { data: openEditionsSub } = useSubscription<IOpenEditionsSubscription>(SUBSCRIBE_OPEN_EDITIONS, {
    skip: seasonIsActive,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        artifactId: { _eq: project?.artifacts[0].id },
      },
    },
  })

  const { data: openEditionsQuery } = useQuery(LOAD_OPEN_EDITIONS, {
    skip: !seasonIsActive,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        artifactId: { _eq: project?.artifacts[0].id },
      },
    },
  })

  const openEditions = openEditionsSub || openEditionsQuery

  const {
    query: { slug },
    asPath,
  } = useRouter()

  console.log('seasonData', seasonData)

  const lead = project.members?.find((m: any) => m.type === 'lead')?.user

  const rank =
    seasonData?.submissions
      ?.sort(
        (s1: ISubmissionFragment, s2: ISubmissionFragment) =>
          s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
          s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!,
      )
      .findIndex(submission => submission.project?.id === project.id) || 0

  console.log('openEditions?.OpenEditionCopies', openEditions?.OpenEditionCopies)

  const count = openEditions?.OpenEditionCopies.reduce((x: any, edition: any) => x + edition.copies!, 0) || 0

  console.log('lead', lead)

  return (
    <Layout>
      <PagePadding>
        <Wrapper>
          <Side>
            <Header>
              {/* {loading && <ProjectDescriptionShimmer />} */}

              <>
                <Topline>
                  <div>
                    {!loadingSeason && (
                      //TODO: Update the total sales and match fund pooled vars
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
                        projectTitle: project.title,
                        artizenHandle: lead?.artizenHandle,
                        twitterHandle: lead?.twitterHandle,
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
            </Header>

            {/* {loading && <ProjectLeaderboardShimmer />} */}
            {openEditions && seasonData && (
              <Leaderboard
                openEditions={openEditions}
                isWinner={rank === 0}
                count={count}
                totalSales={totalSales ? totalSales : 0}
                matchFundPooled={seasonData?.matchFundPooled}
              />
            )}

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
            <ArtifactCard artifact={project.artifacts[0]} project={project} seasonIsActive={seasonIsActive || false} />
          </Side>
        </Wrapper>
      </PagePadding>
    </Layout>
  )
}

// const ProjectPage = () => {

//   const { isSeasonActive } = useDateHelpers()

//   const { setVisibleModalWithAttrs } = useContext(LayoutContext)

//   const {
//     query: { slug },
//     asPath,
//   } = useRouter()

//   const { loading, data } = useQuery<IProjectsQuery>(GET_PROJECTS, {
//     skip: !slug,
//     variables: {
//       limit: 1,
//       where: {
//         titleURL: {
//           _eq: slug,
//         },
//       },
//     },
//   })

//   //TODO: this code does assume that the project has been submitted to the active season which will not be the case when the season ends
//   const { loading: loadingSeason, data: seasonData } = useSubscription<ISubscribeSeasonsSubscription>(
//     SUBSCRIBE_SEASONS,
//     {
//       fetchPolicy: 'no-cache',
//       variables: {
//         where: {
//           id: { _eq: seasonId },
//         },
//       },
//     },
//   )

//   const project = data?.Projects[0]

// const { data: openEditions } = useSubscription<IOpenEditionsSubscription>(SUBSCRIBE_OPEN_EDITIONS, {
//   fetchPolicy: 'no-cache',
//   variables: {
//     where: {
//       artifactId: { _eq: project?.artifacts[0].id },
//     },
//   },
// })

//   if (!!loadingSeason || !seasonData || !project) {
//     // todo: we have a loading placeholder somewhere
//     return <></>
//   }

//   const seasonIsActive = isSeasonActive(seasonData.Seasons[0].startingDate, seasonData.Seasons[0]?.endingDate)

//   const lead = project.members?.find(m => m.type === 'lead')?.user

//   const rank = seasonData.Seasons[0].submissions
//     ?.sort(
//       (s1: ISubmissionFragment, s2: ISubmissionFragment) =>
//         s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
//         s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!,
//     )
//     .findIndex(submission => submission.project?.id === project.id)

//   //TODO: This make this to refresh
//   // const projectSubmissions = seasonData.Seasons[0].submissions?.filter(
//   //   submission => submission.project?.id === project.id,
//   // )

//   console.log('seasonIsActive', seasonIsActive)

// const count = openEditions?.OpenEditionCopies.reduce((x, edition) => x + edition.copies!, 0) || 0

//   return (
//     <Layout>
//       <PagePadding>
//         <Wrapper>
//           <Side>
//             <Header>
//               {loading && <ProjectDescriptionShimmer />}
//               {!loading && (
//                 <>
//                   <Topline>
//                     <div>
//                       <RankAndArtifactCount rank={rank} count={count} seasonIsActive={seasonIsActive} />
//                     </div>

//                     <Button
//                       level={2}
//                       outline
//                       onClick={() =>
//                         setVisibleModalWithAttrs('share', {
//                           mode: 'project',
//                           destination: asPath,
//                           projectTitle: project.title,
//                           artizenHandle: project?.members?.find(m => m.type === 'lead')?.user?.artizenHandle,
//                           twitterHandle: project?.members?.find(m => m.type === 'lead')?.user?.twitterHandle,
//                         })
//                       }
//                     >
//                       Share
//                     </Button>
//                   </Topline>
//                   <h1>{project.title}</h1>
//                   <p>{project.logline}</p>
//                   <Tags tags={project.impactTags?.split(',') || []} />

//                   {lead && <CreatorBox user={lead} />}
//                 </>
//               )}
//             </Header>

//             {loading && <ProjectLeaderboardShimmer />}
//             {!loading && <Leaderboard openEditions={openEditions} />}

//             <LongDescription>
//               {(project.metadata as Array<{ title: string; value: string }>).map((metadatum, index) => (
//                 <div key={`metadatum-${index}`}>
//                   <h2>{metadatum.title}</h2>
//                   <p>{metadatum.value}</p>
//                 </div>
//               ))}
//             </LongDescription>
//           </Side>

//           <Side>
//             {/* TODO: Artifacts should be an object instead of an array  */}
//             {/* This is wrong, we need to use the artifact from the submission */}
//             <ArtifactCard artifact={project.artifacts[0]} project={project} {...{ seasonIsActive }} />
//           </Side>
//         </Wrapper>
//       </PagePadding>
//     </Layout>
//   )
// }

export async function getStaticPaths() {
  const apolloClient = createApolloClient()
  const projects = await apolloClient.query({
    query: GET_PROJECTS,
  })

  const paths = projects.data.Projects.map((project: IProjectFragment) => ({
    params: { slug: project.titleURL },
  }))

  console.log('path hereeee  ', paths[0])

  return { paths, fallback: false }
}

interface IGetStaticPropsParams {
  slug: string
}

export async function getStaticProps({ params: { slug } }: { params: IGetStaticPropsParams }) {
  //{ paths: { slug } }: { paths: IGetStaticPropsParams }
  console.log('params  in getStaticProps', slug)
  // const apolloClient = createApolloClient()
  // const queryProject = await apolloClient.query({
  //   query: GET_PROJECTS,
  //   variables: {
  //     limit: 1,
  //     where: {
  //       titleURL: {
  //         _eq: slug,
  //       },
  //     },
  //   },
  // })

  console.log('tags here  ', GET_PROJECTS)

  const fethcall = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `query projects($limit: Int, $where: Projects_bool_exp) {
        Projects(limit: $limit, where: $where) {
          id
          title
          titleURL
          logline
          description
          creationDate
          completionDate
          walletAddress
          metadata
          impactTags
          impact
          titleURL
          submissions {
            id
          }
          members {
            id
            type
            user {
              id
              publicAddress
              profileImage
              createdAt
              twitterHandle
              discordHandle
              artizenHandle
              hideFromLeaderboard
              website
              instagramHandle
              bannerImage
              bio
              externalLink
              claimed
            }
          }
          artifacts {
            id
            name
            description
            artwork
            video
            edition
            blockchainAddress
            dateMinting
            token
            createdAt
            openEditionCopies {
              value
              copies
              user {
                id
                artizenHandle
                profileImage
              }
              
              
            }
            openEditionCopies_aggregate {
              aggregate {
                sum {
                  copies
                }
              }
            }
          }
        }
      }`,
      variables: {
        where: {
          titleURL: {
            _eq: slug,
          },
        },
      },
    }),
  })

  const project = await fethcall.json()

  console.log('project getStaticProps  ', project.data.Projects[0])

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      project: project.data.Projects[0],
    },
  }
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
