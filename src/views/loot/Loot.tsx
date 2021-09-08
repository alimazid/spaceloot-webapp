import { observer } from 'mobx-react-lite'
import { Box, Typography, List, ListItem } from '@material-ui/core'

export const Loot = observer(() => {
  return (
    <Box width="350px" height="280px" margin="0 auto">
      <Typography>#1234</Typography>
      <ul>
        <li>Lorem Ipsum</li>
        <li>Dolor sit amet</li>
        <li>Quis nostrud exercitation</li>
        <li>Duis aute irure</li>
        <li>Excepteur sint occaecat</li>
        <li>Officia deserunt mollit anim</li>
        <li>Incididunt ut labore</li>
      </ul>
    </Box>
  )
})
