import styled from 'styled-components'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { faq } from '@copy/admin'
import { useQuery, useMutation } from '@apollo/client'
import { palette, typography } from '@theme'
import { PagePadding, CuratorCheck, Layout, Spinner, Button, Project, Faq, Breadcrumbs } from '@components'
import { GET_PROJECTS, LOAD_SEASONS, UPDATE_SUBMISSION_IN_MATCH_FUND } from '@gql'
import { LayoutContext, rgba, useDateHelpers } from '@lib'
import { startCase } from 'lodash'

import { IProjectsQuery, ISeasonFragment } from '@types'

export default function ProjectDetails(): JSX.Element {
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

  return (
    <Layout>
      <CuratorCheck />
      <StyledPagePadding>
        {project && (
          <Breadcrumbs
            schema={[
              {
                path: '/admin',
                name: 'Admin',
                isActive: false,
              },
              {
                path: '/admin/projects',
                name: 'Projects',
                isActive: false,
              },
              {
                path: `/admin/projects/${id}`,
                name: `${startCase(project?.title ? project?.title : '')}`,
                isActive: true,
              },
            ]}
          />
        )}
        {loading ? (
          <Spinner minHeight="75vh" />
        ) : (
          <>
            <ProjectContainer>
              <div>
                <Title>{project?.title && startCase(project?.title)}</Title>
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

              <StyledButton
                level={2}
                stretch
                onClick={() => {
                  setVisibleModalWithAttrs('submitProjectModal', {
                    project,
                  })
                }}
              >
                Submit to a Season
              </StyledButton>

              <SeasonSubmissionsContainer>
                Submissions List:
                {!loadingSeasons &&
                  loadedSeasons.Seasons.map((season: ISeasonFragment) => {
                    const projectSubmission = season.submissions.find(submission => submission.projectId === id)
                    const submissionInMatchFundsArray =
                      projectSubmission?.matchFunds.filter(
                        submissionInMatchFund => submissionInMatchFund.status === 'active',
                      ) || []

                    const seasonStatus = getSeasonStatus(season.startingDate, season.endingDate)
                    const isSeasonOpen = isOpenForSubmissions(season.startingDate, season.endingDate)
                    return (
                      <SeasonItem key={season.id}>
                        <div style={{ cursor: 'pointer' }} onClick={() => push(`/admin/seasons/${season.id}`)}>
                          <Label>Project is part of: </Label>
                          <b>{season.title && startCase(season.title)}</b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Label>Season Status: </Label>
                          <b>{seasonStatus.toLocaleUpperCase()}</b>
                        </div>

                        {submissionInMatchFundsArray.length > 0 && (
                          <div style={{ margin: '12px 0 8px 0' }} className="extend">
                            <Label>Project is in the following match funds: </Label>
                            <ul>
                              {submissionInMatchFundsArray.map(submissionInMatchFund => {
                                return (
                                  <MatchFundListItem key={submissionInMatchFund.id}>
                                    <a
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => push(`/admin/matchfunds/${submissionInMatchFund.matchFund.id}`)}
                                      key={submissionInMatchFund.id}
                                    >
                                      {startCase(submissionInMatchFund.matchFund.name)}
                                    </a>
                                    {isSeasonOpen && (
                                      <Button
                                        glyph="cross"
                                        glyphOnly
                                        onClick={setStatusClose(submissionInMatchFund.id)}
                                        level={2}
                                        outline
                                      >
                                        Close
                                      </Button>
                                    )}
                                  </MatchFundListItem>
                                )
                              })}
                            </ul>
                          </div>
                        )}

                        {isSeasonOpen && (
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
      <div className="doubleWith">
        <Faq copy={faq} />
      </div>
    </Layout>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  max-height: 50px;
`

const Label = styled.span`
  ${typography.label.l3}
`

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
  font-weight: 100;

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
  background: ${rgba(palette.white, 0.8)};
  border: 1px dotted ${rgba(palette.uiWarning, 1)};
  border-radius: 5px;
  margin: 10px 0;

  .button {
    cursor: pointer;
    padding: 5px;
    max-height: 50px;
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

const Title = styled.h1`
  font-size: 1.5rem;

  float: left;
  font-weight: 600;
  margin: 0 10px 0 0;
  padding: 0;
  color: ${palette.night};
  margin-bottom: 18px;
`
