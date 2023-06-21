import styled from 'styled-components'
import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { palette, typography } from '@theme'
import { PagePadding, CuratorCheck, Layout, Spinner, Button, Project } from '@components'
import { GET_PROJECTS, LOAD_SEASONS } from '@gql'
import { LayoutContext, rgba } from '@lib'
import { capitalCase } from 'capital-case'

import { IProjectsQuery, ISeasonFragment } from '@types'

export default function ProjectDetails(): JSX.Element {
  const { status } = useSession()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const {
    push,
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
      where: {
        submissions: {
          projectId: {
            _eq: id,
          },
        },
      },
    },
  })

  if (!loading && errorLoadingProject) {
    throw new Error('error loading project details', errorLoadingProject)
  }

  const project = loadedProjectData?.Projects[0]

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
              <Button
                level={2}
                onClick={() => {
                  setVisibleModalWithAttrs('addProjectsToMatchFund', {
                    project,
                  })
                }}
              >
                Add to Match Fund
              </Button>

              <SeasonSubmissionsContainer>
                {!loadingSeasons &&
                  loadedSeasons.Seasons.map((season: ISeasonFragment) => {
                    return (
                      <SeasonItem key={season.id} onClick={() => push(`/admin/seasons/${season.id}`)}>
                        This project was submitted to season: <b>{season.title && capitalCase(season.title)}</b>
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
  grid-template-columns: 60% 20% 20%;
  margin: 20px 0;

  .expand {
    grid-column: 1 / 5;
  }
`

const SeasonSubmissionsContainer = styled.div`
  grid-column: 1 / 5;
`

const SeasonItem = styled.div`
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
