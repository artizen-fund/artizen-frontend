import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { PagePadding, CuratorCheck, Layout, Spinner, Button } from '@components'
import { GET_PROJECTS } from '@gql'
import { LayoutContext } from '@lib'
import { IProjectsQuery } from '@types'

const ProjectDetails = () => {
  const { status } = useSession()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

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

  // useEffect(() => {
  //   if (!errorLoadingProject) return
  //   console.error('errorLoadingProject', errorLoadingProject)
  // }, [errorLoadingProject])

  if (!loading || errorLoadingProject) {
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
            <Button
              level={2}
              onClick={() => {
                setVisibleModalWithAttrs('submitProjectModal', {
                  projectId: project?.id,
                })
              }}
            >
              Submit
            </Button>
            <h1>Project Details</h1>
            <p>Title: {project?.title}</p>
            {/* <ViewProject project={loadedProjectData?.Projects[0]} /> */}
            {/* <Link href="/admin/projects">↩ back to list</Link> */}
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
