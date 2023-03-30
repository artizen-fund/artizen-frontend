import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { rgba } from '@lib'
import styled from 'styled-components'
import { Button, Layout, Spinner, Table, TableCell, PagePadding, Project, CuratorCheck } from '@components'
import { GET_PROJECTS } from '@gql'
import { IProjectsQuery, IProjectFragment } from '@types'
import { palette, typography } from '@theme'

const Projects = () => {
  const router = useRouter()
  const {
    loading,
    data: loadedProjectData,
    error: errorLoadingProject,
  } = useQuery<IProjectsQuery>(GET_PROJECTS, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (!errorLoadingProject) return
  }, [errorLoadingProject])

  const openProject = (target: string) => () => {
    router.push(`/admin/projects/${target}`)
  }

  const sideItem = (
    <Button onClick={openProject('new')} level={2} outline>
      Create new Project
    </Button>
  )

  return (
    <Layout>
      <StyledPagePadding>
        <CuratorCheck />
        {loading ? (
          <Spinner />
        ) : (
          <Wrapper>
            <Header>Project List</Header>
            <Button level={2} onClick={openProject('new')}>
              Add New Project
            </Button>
            <ProjectList className="doubleLeght">
              {loadedProjectData?.Projects.map((project: IProjectFragment) => {
                return (
                  <ProjectWrapper key={project.id} onClick={openProject(project.id)}>
                    <Project projectData={project} displayType="brief" />
                  </ProjectWrapper>
                )
              })}
            </ProjectList>
          </Wrapper>
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  cursor: pointer;
  background-color: ${rgba(palette.stone, 0.24)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
  }
`

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  ${typography.title.l3}
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 100%;
  cursor: pointer;
  align-items: center;

  .doubleLeght {
    grid-column: span 2;
  }
`

const StyledTableCell = styled(TableCell)`
  padding: 1rem;
  cursor: pointer;
`

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

export default Projects
