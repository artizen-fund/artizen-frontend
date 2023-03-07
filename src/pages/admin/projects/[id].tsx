import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { palette } from '@theme'
import { PagePadding, CuratorCheck, Layout, Spinner, Button } from '@components'
import { GET_PROJECTS } from '@gql'
import { LayoutContext } from '@lib'
import { IProjectsQuery } from '@types'

export default function ProjectDetails(): JSX.Element {
  const { status } = useSession()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const {
    query: { id },
  } = useRouter()

  console.log('query   ', id)

  const {
    loading,
    data: loadedProjectData,
    error: errorLoadingProject,
  } = useQuery(GET_PROJECTS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  console.log('loadedProjectData  ', loadedProjectData)

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
            <Title>{project?.title}</Title>
            <Button
              level={2}
              onClick={() => {
                setVisibleModalWithAttrs('submitProjectModal', {
                  projectId: project?.id,
                })
              }}
            >
              Submit to a Season
            </Button>

            {/* <ViewProject project={loadedProjectData?.Projects[0]} /> */}
            {/* <Link href="/admin/projects">↩ back to list</Link> */}
          </ProjectContainer>
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 20px 0;
`

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 100;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`
