import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from 'GlobalStyle'
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core'
import { theme } from 'theme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { Navbar } from 'views/common/Navbar'
import { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSetup } from 'hooks/useSetup'
import ReactGA from 'react-ga'
BigNumber.config({ EXPONENTIAL_AT: 78 })

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string, {})
    ReactGA.pageview(window.location.pathname + window.location.search)
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const ready = useSetup()

  return (
    <>
      <Head>
        <title>SpaceLoot!</title>
        <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <EmotionThemeProvider theme={theme}>
            {ready && <Navbar>
              <Component {...pageProps} />
            </Navbar>}
          </EmotionThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </>
  )
}

export default App
