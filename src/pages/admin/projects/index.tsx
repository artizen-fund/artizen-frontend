// create a new function component called Projects
// load all the projects from the database using the useQuery hook
// display a spinner while loading
// display an error message if there is an error
// display a message if there are no projects
// display the projects in a table
// add a button to create a new project

// src/pages/admin/projects/index.tsx
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Button, Layout, Spinner, Table, TableCell } from '@components'
import { GET_PROJECTS } from '@gql'
import { IProjectsQuery, IProjectFragment } from '@types'
import { palette } from '@theme'

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
    console.error('errorLoadingProject', errorLoadingProject)
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
      <Wrapper>
        {loading ? (
          <Spinner />
        ) : (
          <Table title="Project List" {...{ sideItem }}>
            {loadedProjectData?.Projects.map((project: IProjectFragment) => {
              return (
                <StyledTableCell onClick={openProject(project.id)} key={project.id} highlight>
                  <Title>{project.title}</Title>
                </StyledTableCell>
              )
            })}
          </Table>
        )}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  border-radius: 0.5rem;

  width: 100%;

  cursor: pointer;
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

export default Projects
