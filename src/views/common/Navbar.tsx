import styled from '@emotion/styled'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  useMediaQuery,
  useTheme,
  Theme,
} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import MenuIcon from '@material-ui/icons/Menu'
import { Routes } from 'constants/routes'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { BitButton } from './BitButton'
import { ConnectButton } from './ConnectButton'
import { Sidebar } from './Sidebar'
import { walletStore } from 'stores/walletStore'

const StyledAppBar = styled(AppBar)<{ theme?: Theme }>`
  color: black;
  border-color: black;
  background: white;
  border-style: solid;
  border-width: 0.125em 0;
  position: relative;
  z-index: 1;
  &:before {
    border: inherit;
    border-width: 0 0.125em;
    content: '';
    height: 100%;
    left: -0.125em;
    pointer-events: none;
    position: absolute;
    top: 0;
    right: -0.125em;
    z-index: -1;
  }
`

type Props = {
  children: React.ReactNode
}

export const Navbar = observer((props: Props) => {
  const { children } = props
  const appBarRef = useRef<HTMLDivElement>(null)

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const sidebarHidden = Routes.SIDEBAR_HIDDEN.includes(router.pathname)

  useEffect(() => {
    console.log(appBarRef.current?.clientHeight)
  }, [appBarRef.current])

  const appBarHeight = useMemo(() => {
    return appBarRef.current?.clientHeight ?? 0
  }, [appBarRef.current?.clientHeight])

  return (
    <>
      <StyledAppBar position="fixed" elevation={4} ref={appBarRef}>
        <Toolbar>
          <Typography variant="h1">Star Loot !</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
            {isMobile && !sidebarHidden ? (
              <IconButton edge="start" onClick={() => setSidebarOpen(true)}>
                <MenuIcon fontSize="large" />
              </IconButton>
            ) : (
              <Link href="/" passHref>
                <Box component="a" display="flex">
                  <Image src="/static/logo.png" width="150" height="40" />
                </Box>
              </Link>
            )}
            <Box>
              {walletStore.isConnected && (
                <Link href="/gallery" passHref>
                  <button type="button" className="nes-btn is-secondary">
                    Your Star Loot!
                  </button>
                </Link>
              )}
              <ConnectButton />
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        minHeight={`calc(100vh - ${appBarHeight}px)`}
      >
        {children}
      </Box>
    </>
  )
})
