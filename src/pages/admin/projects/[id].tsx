import styled from 'styled-components'
import { use, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useQuery, useMutation } from '@apollo/client'
import { palette, typography } from '@theme'
import { PagePadding, CuratorCheck, Layout, Spinner, Button, Project } from '@components'
import { GET_PROJECTS, LOAD_SEASONS, UPDATE_SUBMISSION_IN_MATCH_FUND } from '@gql'
import { LayoutContext, rgba, useDateHelpers } from '@lib'
import { capitalCase } from 'capital-case'

import { IProjectsQuery, ISeasonFragment } from '@types'

export default function ProjectDetails(): JSX.Element {
  const { status } = useSession()
  const { isOpenForSubmissions, getSeasonStatus } = useDateHelpers()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const [setSubmissionInMatchFund] = useMutation(UPDATE_SUBMISSION_IN_MATCH_FUND, {
    onError: error => {
      console.log('setSubmissionInMatchFund error  ', error)
    },
  })

  const {
    push,
    reload,
    query: { id },
  } = useRouter()

  const {
    loading,
    data: loadedProjectData,
    error: errorLoadingProject,
  } = useQuery<IProjectsQuery>(GET_PROJECTS, {
    skip: !id,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  const {
    loading: loadingSeasons,
    data: loadedSeasons,
    error: errorLoadingSeasons,
  } = useQuery(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: [
        {
          startingDate: 'desc',
        },
      ],
      where: {
        submissions: {
          projectId: {
            _eq: id,
          },
        },
      },
    },
  })

  const setStatusClose = (submissionInMatchFundId: string) => async () => {
    const data = await setSubmissionInMatchFund({
      variables: {
        where: {
          id: {
            _eq: submissionInMatchFundId,
          },
        },
        _set: {
          status: 'closed',
        },
      },
    })

    console.log('data  ', data)

    if (data) {
      reload()
    }
  }

  if (!loadingSeasons && errorLoadingSeasons) {
    throw new Error('error loading seasons', errorLoadingSeasons)
  }

  if (!loading && errorLoadingProject) {
    throw new Error('error loading project details', errorLoadingProject)
  }

  const project = loadedProjectData?.Projects[0]

  console.log('loadedSeasons  ', loadedSeasons)

  return (
    <Layout>
      <CuratorCheck />
      <StyledPagePadding>
        {status !== 'authenticated' || loading ? (
          <Spinner minHeight="75vh" />
        ) : (
          <>
            <ProjectContainer>
              <div>
                <Title>{project?.title && capitalCase(project?.title)}</Title>
                <Button
                  glyph="external"
                  glyphOnly
                  level={2}
                  outline
                  onClick={() => {
                    push(`/project/${project?.titleURL}`)
                  }}
                >
                  Open Project Page
                </Button>
              </div>

              <Button
                level={2}
                onClick={() => {
                  setVisibleModalWithAttrs('submitProjectModal', {
                    project,
                  })
                }}
              >
                Submit to a Season
              </Button>

              <SeasonSubmissionsContainer>
                Submissions List:
                {!loadingSeasons &&
                  loadedSeasons.Seasons.map((season: ISeasonFragment) => {
                    const projectSubmission = season.submissions.find(submission => submission.projectId === id)
                    const submissionInMatchFundsArray =
                      projectSubmission?.matchFunds.filter(
                        submissionInMatchFund => submissionInMatchFund.status === 'active',
                      ) || []
                    return (
                      <SeasonItem key={season.id}>
                        <div style={{ cursor: 'pointer' }} onClick={() => push(`/admin/seasons/${season.id}`)}>
                          Project is part of:&nbsp;
                          <b>{season.title && capitalCase(season.title)}</b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          Season Status: {getSeasonStatus(season.startingDate, season.endingDate)?.toLocaleUpperCase()}
                        </div>

                        {submissionInMatchFundsArray.length > 0 && (
                          <div style={{ margin: '12px 0 8px 0' }} className="extend">
                            <>Project is in the following match funds: </>
                            <ul>
                              {submissionInMatchFundsArray.map(submissionInMatchFund => {
                                return (
                                  <MatchFundListItem key={submissionInMatchFund.id}>
                                    <a
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => push(`/admin/matchfunds/${submissionInMatchFund.matchFund.id}`)}
                                      key={submissionInMatchFund.id}
                                    >
                                      {capitalCase(submissionInMatchFund.matchFund.name)}
                                    </a>
                                    <Button
                                      glyph="cross"
                                      glyphOnly
                                      onClick={setStatusClose(submissionInMatchFund.id)}
                                      level={2}
                                      outline
                                    >
                                      Close
                                    </Button>
                                  </MatchFundListItem>
                                )
                              })}
                            </ul>
                          </div>
                        )}

                        {isOpenForSubmissions(season.startingDate, season.endingDate) && (
                          <div
                            className="button expand"
                            onClick={() => {
                              setVisibleModalWithAttrs('addProjectsToMatchFund', {
                                projectSubmission,
                              })
                            }}
                          >
                            Add to Match Fund
                          </div>
                        )}
                      </SeasonItem>
                    )
                  })}
              </SeasonSubmissionsContainer>

              {loadedProjectData && (
                <ProjectWrapper className="expand">
                  <Project projectData={loadedProjectData?.Projects[0]} displayType="full" />
                </ProjectWrapper>
              )}
            </ProjectContainer>
          </>
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const MatchFundListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 32px;
  padding: 10px;
  border: 1px solid ${rgba(palette.black, 0.1)};
  margin: 10px 0;
`

const ProjectWrapper = styled.div`
  background: ${rgba(palette.white)};
  padding: 20px;

  background-color: ${rgba(palette.stone, 0.24)};
  ${typography.body.l3}

  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
  }
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  margin: 20px 0;

  .expand {
    grid-column: 1 / 3;
  }
`

const SeasonSubmissionsContainer = styled.div`
  grid-column: 1 / 3;
`

const SeasonItem = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  padding: 10px;
  border: 1px dotted ${rgba(palette.uiWarning, 0.5)};
  border-radius: 5px;
  margin: 10px 0;

  .button {
    cursor: pointer;
    padding: 5px;
    font-size: 0.8rem;
    border-radius: 10px;
    border: 1px dotted ${rgba(palette.uiWarning, 1)};
    text-align: center;
    &:hover {
      background: ${rgba(palette.uiWarning, 0.1)};
    }
  }

  .extend {
    grid-column: 1 / 3;
  }
`

const SeasonItemButton = styled.div`
  display: flex
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border: 1px dotted ${rgba(palette.uiWarning, 0.5)};
  border-radius: 5px;
  margin: 10px 0;
  ${typography.body.l3}

  &:hover {
    background: ${rgba(palette.uiWarning, 0.1)};
  }

  `

const Title = styled.h1`
  font-size: 1.5rem;

  float: left;
  font-weight: 600;
  margin: 0 10px 0 0;
  padding: 0;
  color: ${palette.night};
`
