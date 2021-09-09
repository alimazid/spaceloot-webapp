import { observer } from 'mobx-react-lite'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { Loot } from 'views/loot/Loot'
import { LootGallery } from 'views/loot/LootGallery'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'

export const HomePage = observer(() => {
  return (
    <BitStarBgContainer width="100%" minHeight="50vh" paddingTop="64px">
      {/* <div className="nes-container with-title is-centered">
      <p className="title"></p>
      <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
    </div> */}
      <Box marginTop="50px" display="flex" justifyContent="center">
        <Typography variant="h3" className="nes-text is-primary">
          It's Dangerous to Go Alone! Take This Starship With You
        </Typography>
      </Box>
      <Box marginTop="50px" display="flex" justifyContent="center">
        <Loot />
      </Box>
      <Box paddingTop="50px" display="flex" justifyContent="center" alignItems="center">
        <Box marginRight="20px">
          <div className="nes-field">
            <input type="text" id="name_field" className="nes-input" />
          </div>
        </Box>
        <Box marginRight="20px">
          <button type="button" className="nes-btn is-success">
            Claim!
          </button>
        </Box>
        <button type="button" className="nes-btn is-success">
          Random Loot!
        </button>
      </Box>

      {/* <Typography variant="h2" align="center">Recently Claimed</Typography>
      <Box>
        <LootGallery />
      </Box> */}
    </BitStarBgContainer>
  )
})
