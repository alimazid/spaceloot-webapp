import { useMediaQuery, useTheme } from '@material-ui/core'

export const useResponsive = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'))

  return { isMobile, isTablet }
}
