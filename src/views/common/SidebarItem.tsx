import styled from '@emotion/styled'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { useEffect, useState } from 'react'

const StyledListItem = styled((props: ListItemProps) => (
  // @ts-ignore
  <ListItem {...props} />
))`
  .MuiListItemIcon-root {
    min-width: 40px;
  }
`

type SubItem = {
  icon?: React.ReactNode
  label: string
  props?: ListItemProps
}

type Item = SubItem & {
  items?: SubItem[]
}

export type Props = {
  item: Item
}

export const SidebarItem = (props: Props) => {
  const { item } = props
  const [isExpanded, setExpanded] = useState(false)

  const handleClick = () => {
    // item.props?.onClick?.(null)
    setExpanded((isExpanded) => !isExpanded)
  }

  useEffect(() => {
    // if (item.items?.some((subItem) => subItem.props.selected)) {
    //   setExpanded(true)
    // }
  }, [item])

  return (
    <>
      <StyledListItem {...item.props} onClick={handleClick} button>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: { fontWeight: 500 } }}
          primary={item.label}
        />
        {item.items && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
      </StyledListItem>
      {item.items && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.items.map((subItem) => (
              <StyledListItem
                key={subItem.label}
                {...subItem.props}
                button
                style={{ padding: '4px 2rem' }}
              >
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText primary={subItem.label} />
              </StyledListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
