import styled from 'styled-components'
import { Layout, Button } from '@components'
import { typography } from '@theme'

const Page = () => (
  <Layout>
    <Content>
      <Box>
        <h1>Now, that’s not good!</h1>
        <p>
          Looks like the page you’re looking for doesn’t exist. There might be a typo in the url address or the page
          might have moved. Let’s get you to an actual existing page instead.
        </p>
        <Button href="/grants/today" level={1} outline>
          Go back to the hompage
        </Button>
      </Box>
    </Content>
  </Layout>
)

const Content = styled.div`
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding: 20px;
  max-width: 700px;
  h1 {
    ${typography.title.l2}
  }
  p {
    ${typography.body.l2}
  }
`

export default Page
