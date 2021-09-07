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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Sidebar } from './Sidebar'

const StyledAppBar = styled(AppBar)<{ theme?: Theme }>`
  background: white;
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
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        {children}
      </Sidebar>

      <StyledAppBar position="fixed" elevation={4}>
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
            {isMobile && !sidebarHidden ? (
              <IconButton edge="start" onClick={() => setSidebarOpen(true)}>
                <MenuIcon fontSize="large" />
              </IconButton>
            ) : (
              <Link href="/" passHref>
                <Box component="a" display="flex"></Box>
              </Link>
            )}
            <Box>
              <Button onClick={handleMenuClick} endIcon={<KeyboardArrowDownIcon />}>
                {1}
              </Button>
              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {}}>ออกจากระบบ</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </>
  )
})
