import { observer } from 'mobx-react-lite'
import { Box, Typography, List } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'

export const LootGallery = observer(() => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
      maxWidth="1100px"
    >
      <Box mt={2}>
        <LootBox />
      </Box>
      <Box mt={2}>
        <LootBox />
      </Box>
      <Box mt={2}>
        <LootBox />
      </Box>
    </Box>
  )
})
