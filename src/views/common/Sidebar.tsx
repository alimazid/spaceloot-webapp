import styled from '@emotion/styled'
import { Box, Drawer, List, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'
import MoonIcon from '@material-ui/icons/Brightness2'
import { Routes } from 'constants/routes'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { SidebarItem, Props as SidebarItemProps } from './SidebarItem'

const StyledDrawer = styled(Drawer)`
  width: 240px;
  flex-shrink: 0;
  & > .MuiDrawer-paper {
    width: 240px;
  }
`

const StyledToolbar = styled(Toolbar)`
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = (props: Props) => {
  const { isOpen, onClose, children } = props

  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const items: SidebarItemProps['item'][] = useMemo(
    () => [
      {
        label: 'Menu',
        icon: <MoonIcon />,
        items: [
          {
            label: 'Sub Menu',
            icon: <MoonIcon />,
            props: {
              selected: router.pathname === '/',
              onClick: () => router.push('/'),
            },
          },
        ],
      },
      {
        label: 'Utility',
        icon: <MoonIcon />,
        props: {
          selected: router.pathname.startsWith('/utility'),
          onClick: () => router.push('/utility'),
        },
      },
      {
        label: 'Design System',
        icon: <MoonIcon />,
        props: {
          selected: router.pathname.startsWith('/design'),
          onClick: () => router.push('/design'),
        },
      },
    ],
    [router]
  )

  const handleLogoClick = () => {
    router.push('/')
  }

  useEffect(() => {
    router.events.on('routeChangeStart', onClose)
    return () => router.events.off('routeChangeStart', onClose)
  }, [router, onClose])

  if (Routes.SIDEBAR_HIDDEN.includes(router.pathname)) {
    return <>{children}</>
  }

  return (
    <Box display="flex" minHeight="100vh">
      <StyledDrawer
        anchor="left"
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpen}
        ModalProps={{ keepMounted: true }}
        onClose={onClose}
      >
        <StyledToolbar onClick={handleLogoClick}>
          {/* {isMobile && <Logo height={44} width={null} />} */}
        </StyledToolbar>
        <List>
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </List>
      </StyledDrawer>
      <Box>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
