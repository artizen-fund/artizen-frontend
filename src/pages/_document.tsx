import { Fragment } from 'react'
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class DocumentWithStyledComponents extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <Fragment key="styled-components-insert">
            {initialProps.styles}
            {sheet.getStyleElement()}
            <link rel="stylesheet" href="https://use.typekit.net/wwx1oja.css" />
          </Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }
}
