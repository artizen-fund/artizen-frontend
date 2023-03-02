// create a functional component that will display the project details
// gets a project id as a query parameter via useRouter query
// loads the project from the database using the useQuery hook
// displays a spinner while loading
// displays an error message if there is an error
// displays the project details
// adds a button to go back to the project list

// src/pages/admin/projects/[id].tsx
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { PagePadding, CuratorCheck, Layout, Spinner } from '@components'
import { GET_PROJECTS } from '@gql'
import { IProjectsQuery } from '@types'

const ProjectDetails = () => {
  const { status } = useSession()

  const {
    query: { id },
  } = useRouter()

  const {
    loading,
    data: loadedProjectData,
    error: errorLoadingProject,
  } = useQuery<IProjectsQuery>(GET_PROJECTS, {
    skip: id === undefined,
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  useEffect(() => {
    if (!errorLoadingProject) return
    console.error('errorLoadingProject', errorLoadingProject)
  }, [errorLoadingProject])

  return (
    <Layout>
      <CuratorCheck />
      <StyledPagePadding>
        {status !== 'authenticated' || loading ? (
          <Spinner minHeight="75vh" />
        ) : (
          <>
            {/* <ViewProject project={loadedProjectData?.Projects[0]} /> */}
            <Link href="/admin/projects">↩ back to list</Link>
          </>
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 600px;
  min-height: 75vh;
  margin: auto;
`

export default ProjectDetails
