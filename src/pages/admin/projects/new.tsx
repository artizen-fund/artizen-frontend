import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ILoadGrantsQuery, IProjectFragment } from '@types'
import styled from 'styled-components'
import { palette } from '@theme'
import { CuratorCheck, Layout, NewProjectForm, Spinner, PagePadding, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createProjects'

const ProjectDetails = () => {
  const { status } = useSession()
  const [processing, setProcessing] = useState(false)
  const [tempGenericProject, setTempGenericProject] = useState<FormState>(initialState)

  const saveProject = () => {
    // console.warn('saveProject')
  }

  return (
    <Layout>
      <CuratorCheck />
      <PagePadding>
        {status !== 'authenticated' ? (
          <Spinner />
        ) : (
          <Wrapper>
            <Title className="extent">New Project</Title>
            <NewProjectForm addData={setTempGenericProject} tempValue={tempGenericProject} processing={processing} />
            <NewProjectMembers />
            <StyledButton onClick={saveProject} stretch level={0}>
              {/* {processing ? 'Saving...' : 'Save Draft'} */}
            </StyledButton>
          </Wrapper>
        )}
      </PagePadding>
    </Layout>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  grid-column: 1 / span 12;
  margin-top: 20px;
`

const Wrapper = styled.div`
  width: 100%;
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

export default ProjectDetails
