import { observer } from 'mobx-react-lite'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { Loot } from 'views/loot/Loot'
import { LootGallery } from 'views/loot/LootGallery'

export const HomePage = observer(() => {
  return (
    <Box width="100%" minHeight="50vh" marginTop="64px">
      <Typography variant="h1" align="center">Your StarLoots!</Typography>
      <Typography align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
      <Typography align="center">Input Loot ID to browse or to claim:</Typography>

      <Box margin="0 auto" display="flex" alignItems="center">
        <TextField id="loot-id" label="Loot ID" />
        <Button variant="contained" color="primary">Claim!</Button>
      </Box>
      <Loot/>

      <Typography variant="h2" align="center">Recently Claimed</Typography>
      <LootGallery />
    </Box>
  )
})
