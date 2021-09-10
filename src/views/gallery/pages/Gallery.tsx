import { observer } from 'mobx-react-lite'
import { ChangeEvent, useEffect, useState } from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'
import { LootGallery } from 'views/loot/LootGallery'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import { Loot } from 'interfaces/loot.interface'
import { spaceLootService } from 'services/spaceLootService'

export const Gallery = observer(() => {
  const [loots, setLoots] = useState<Loot[]>([])
  useEffect(() => {
    const sideEffect = async () => {
      const myLoots = await spaceLootService.queryMyLoots()
      setLoots(myLoots)
    }
    sideEffect()
  }, [])
  return (
    <BitStarBgContainer paddingTop="64px">
      {/* <div className="nes-container with-title is-centered">
      <p className="title"></p>
      <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
    </div> */}
      <Box marginTop="50px" display="flex" justifyContent="center">
        <Typography variant="h3" className="nes-text is-primary">
          Look at those shiny loots !
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <LootGallery loots={loots} />
      </Box>
    </BitStarBgContainer>
  )
})
