import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ILoadGrantsQuery, IProjectFragment } from '@types'
import styled from 'styled-components'
import { CuratorCheck, Layout, NewProjectForm, Spinner, PagePadding, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/createProjects'

const ProjectDetails = () => {
  const { status } = useSession()
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
          <>
            <NewProjectForm addData={setTempGenericProject} />
            <StyledButton onClick={saveProject} stretch level={0}>
              {/* {processing ? 'Saving...' : 'Save Draft'} */}
            </StyledButton>
          </>
        )}
      </PagePadding>
    </Layout>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  grid-column: 1 / span 12;
  margin-top: 20px;
`

export default ProjectDetails
