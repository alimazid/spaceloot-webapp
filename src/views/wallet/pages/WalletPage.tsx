import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@material-ui/core'
import { LootGallery } from 'views/loot/LootGallery'

export const WalletPage = observer(() => {
  return (
    <Box width="100%" minHeight="50vh" marginTop="64px">
      <Typography variant="h1" align="center">Your StarLoots!</Typography>
      <Typography align="center">0x12345</Typography>
      <LootGallery />
    </Box>
  )
})
