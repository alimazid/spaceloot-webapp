import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from 'GlobalStyle'
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core'
import { theme } from 'theme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { Navbar } from 'views/common/Navbar'
import { useEffect } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

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
