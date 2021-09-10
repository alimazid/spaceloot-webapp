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

const RootBox = styled(Box)<{ appBarHeight?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`

export const Navbar = observer((props: Props) => {
  const { children } = props

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    if (!walletStore.isConnected && Routes.CONNECTED_ONLY.includes(router.pathname)) {
      router.push('/')
    }
  }, [walletStore.isConnected, router.pathname])

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <RootBox>
      <StyledAppBar position="fixed" elevation={4}>
        <Toolbar>
          {/* <Typography variant="h1">Star Loot !</Typography> */}
          <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
            {isMobile ? (
              <IconButton edge="start" onClick={() => setSidebarOpen(true)}>
                <MenuIcon fontSize="large" />
              </IconButton>
            ) : (
              <Link href="/" passHref>
                <Box component="a" display="flex">
                  <h2 style={{ margin: 0 }}>SpaceLoot!</h2>
                </Box>
              </Link>
            )}
            <Box>
              {walletStore.isConnected && router.pathname !== '/gallery' && (
                <Link href="/gallery" passHref>
                  <button
                    type="button"
                    className="nes-btn is-secondary"
                    style={{ marginRight: 16 }}
                  >
                    Your SpaceLoots!
                  </button>
                </Link>
              )}
              {walletStore.isConnected && router.pathname !== '/' && (
                <Link href="/" passHref>
                  <button
                    type="button"
                    className="nes-btn is-secondary"
                    style={{ marginRight: 16 }}
                  >
                    Home~
                  </button>
                </Link>
              )}
              <ConnectButton />
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {children}
    </RootBox>
  )
})
