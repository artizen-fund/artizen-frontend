import Head from 'next/head'
import styled from 'styled-components'
import { breakpoint } from '@theme'
import Header from './Header'
import Footer from './Footer'
import Onionskin from './Onionskin'
import { metatags as copy } from '@copy/common'
import { assetPath } from '@lib'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Head>
        <title>{copy.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        <meta property="og:type" content="website" />

        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/wwx1oja.css" />

        <meta property="og:title" content={copy.title} key="title" />
        <meta name="twitter:title" content={copy.title} />

        <meta property="og:url" content={copy.url} />

        <meta name="description" content={copy.description} />
        <meta name="twitter:description" content={copy.description} />
        <meta property="og:description" content={copy.description} />

        <meta name="keywords" content={copy.keywords} />

        <meta property="og:image" content={assetPath('/assets/metatags/social-share-image.jpg')} />
        <meta name="twitter:image" content={assetPath('/assets/metatags/social-share-image.jpg')} />

        <meta name="twitter:site" content={copy.twitterHandle} />
        <meta name="twitter:card" content="summary_large_image" />

        <link id="icon" rel="icon" href={assetPath('/assets/metatags/favicon-32x32.png')} />
        <link rel="mask-icon" href={assetPath('/assets/metatags/safari-pinned-tab.svg')} color="#1ACC6C" />
        <meta name="theme-color" content="#1ACC6C" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Onionskin />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Main = styled.main`
  padding-top: 64px;
  min-height: 75vh;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 72px;
    min-height: calc(100vh - 595px);
  }
`

export default Layout
