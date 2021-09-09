import styled from '@emotion/styled'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
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
import { useState } from 'react'
import { ConnectButton } from './ConnectButton'
import { Sidebar } from './Sidebar'
import { walletStore } from 'stores/walletStore'

const StyledAppBar = styled(AppBar)<{ theme?: Theme }>`
  background: #222;
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
`

type Props = {
  children: React.ReactNode
}

export const Navbar = observer((props: Props) => {
  const { children } = props

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

  return (
    <>
      <StyledAppBar position="fixed" elevation={4}>
        <Toolbar>
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
                <Link href="/wallet" passHref>
                  Your StarLoots
                </Link>
              )}
              <ConnectButton />
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {children}
    </>
  )
})
