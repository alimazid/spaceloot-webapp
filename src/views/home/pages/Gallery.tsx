import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { Box, Typography, TextField, Button, makeStyles } from '@material-ui/core'
import { Loot } from 'views/loot/Loot'
import { LootGallery } from 'views/loot/LootGallery'

const useStyles = makeStyles(() => ({
  background: {
    backgroundImage: "url('static/bg2.gif')",
    marginTop: '0px',
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    width: '100%',
  },
}))

export const Gallery = observer(() => {
  const classes = useStyles()
  const lootNumber = 0
  return (
  
  <Box className={classes.background} width="100%" minHeight="50vh" paddingTop="64px">
    {/* <div className="nes-container with-title is-centered">
      <p className="title"></p>
      <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
    </div> */}
      <Box marginTop="50px" display="flex" justifyContent="center">
        <Typography variant="h3" className="nes-text is-primary">
          Look at those shiny loot !
        </Typography>
      </Box>
      <Box marginTop="25px">
        <LootGallery />
      </Box>
    </Box>
  )
})
