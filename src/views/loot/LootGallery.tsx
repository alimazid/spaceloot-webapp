import { observer } from 'mobx-react-lite'
import { Box, Typography, List } from '@material-ui/core'
import { Loot } from 'views/loot/Loot'

export const LootGallery = observer(() => {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
      <Loot></Loot>
      <Loot></Loot>
      <Loot></Loot>
    </Box>
  )
})
