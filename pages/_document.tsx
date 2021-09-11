import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core'

class CustomDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@spaceloot_nft" />
          <meta name="twitter:creator" content="@spaceloot_nft" />
          <meta property="og:url" content="https://spaceloot.xyz/" />
          <meta property="og:title" content="SpaceLootNFT" />
          <meta
            property="og:description"
            content="A Starship-themed on-chain randomized loot on Terra."
          />
          <meta property="og:image" content="https://spaceloot.xyz/static/bg.jpeg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}

export default CustomDocument
