import { observer } from 'mobx-react-lite'
import { Box, Typography, List } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'

export const LootGallery = observer(() => {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
      <Box marginRight="40px">
        <LootBox></LootBox>
      </Box>
      <Box marginRight="40px">
        <LootBox></LootBox>
      </Box>
      <Box marginRight="40px">
        <LootBox></LootBox>
      </Box>
    </Box>
  )
})
