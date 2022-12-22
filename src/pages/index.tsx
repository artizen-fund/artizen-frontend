import styled from 'styled-components'
import { Layout, Button } from '@components'
import { assetPath, rgba } from '@lib'
import { typography, breakpoint, palette } from '@theme'

const Index = () => (
  <Layout>
    <Content>
      <Box>
        <Image />
        <h1>Hang tight!</h1>
        <p>You’re being redirected to another page. This might take a few seconds! Or click the button, that works.</p>
        <Button href="/grants/today" level={1} outline>
          Go to today’s grant
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

  margin: 35px 10px;
  padding: 20px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    margin: 60px auto;
    padding: 30px;
    max-width: 507px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 685px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 40px;
    max-width: 760px;
  }

  h1 {
    ${typography.title.l2}
  }
  p {
    ${typography.body.l2}
    max-width: 420px;
  }

  background: #ffffff;
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
`

const Image = styled.div`
  width: 100%;
  height: 148px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 204px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 320px;
  }

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${assetPath('/assets/illustrations/404-and-redirect/redirect.png')});
  @media (prefers-color-scheme: dark) {
    background-image: url(${assetPath('/assets/illustrations/404-and-redirect/redirect-dark.png')});
  }
`

export default Index
