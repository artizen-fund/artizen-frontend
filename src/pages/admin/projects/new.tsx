import { useSession } from 'next-auth/react'
import { CuratorCheck, Layout, NewProjectForm, Spinner, PagePadding } from '@components'

const ProjectDetails = () => {
  const { status } = useSession()
  console.log('status', status)
  return (
    <Layout>
      <CuratorCheck />
      <PagePadding>{status !== 'authenticated' ? <Spinner /> : <NewProjectForm />}</PagePadding>
    </Layout>
  )
}

export default ProjectDetails
