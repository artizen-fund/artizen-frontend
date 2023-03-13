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

  console.log('loadedSeasons  ', loadedSeasons)

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
          <ProjectContainer>
            <Title>{project?.title && capitalCase(project?.title)}</Title>
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
              {!loadingSeasons &&
                loadedSeasons.Seasons.map((season: ISeasonFragment) => {
                  return (
                    <SeasonItem key={season.id} onClick={() => push(`/admin/seasons/${season.id}`)}>
                      This project was submitted to season: <b>{season.title}</b>
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
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const ProjectWrapper = styled.div`
  background: ${rgba(palette.white)};
  padding: 20px;

  background-color: ${rgba(palette.night)};
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
  grid-template-columns: repeat(30px);
  grid-gap: 20px;
  margin: 20px 0;

  .expand {
    grid-column: 1 / 3;
  }
`

const SeasonSubmissionsContainer = styled.div`
  grid-column: 1 / 3;
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
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`
