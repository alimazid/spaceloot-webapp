import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from 'GlobalStyle'
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core'
import { theme } from 'theme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { Navbar } from 'views/common/Navbar'

const App = ({ Component, pageProps }: AppProps) => {
  // return <Component {...pageProps} />;
  return (
    <>
      <Head>
        <title>Terra Loot</title>
      </Head>
      <GlobalStyle />
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <EmotionThemeProvider theme={theme}>
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
          </EmotionThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </>
  )
}

export default App
