import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import BigNumber from 'bignumber.js'
import { spaceLootService } from 'services/spaceLootService'
import { useDebounce } from 'hooks/useDebounce'
import { Loot } from 'interfaces/loot.interface'

const maxTokenId = 8000

export const HomePage = observer(() => {
  const [isClaiming, setIsClaiming] = useState(false)
  const [tokenId, setTokenId] = useState<BigNumber>(
    new BigNumber(Math.floor(Math.random() * maxTokenId))
  )
  const [loot, setLoot] = useState<Loot>()
  const debouncedTokenId = useDebounce<BigNumber>(tokenId, 200)

  const fetchLootTimer = useRef<NodeJS.Timer | null>(null)

  const fetchLoot = useCallback(async () => {
    const response = await spaceLootService.queryLootset(debouncedTokenId)
    setLoot(response)
  }, [debouncedTokenId])

  useEffect(() => {
    if (fetchLootTimer.current) {
      clearInterval(fetchLootTimer.current)
    }
    fetchLoot()
    fetchLootTimer.current = setInterval(fetchLoot, 10000)
    return () => {
      if (fetchLootTimer.current) {
        clearInterval(fetchLootTimer.current)
        fetchLootTimer.current = null
      }
    }
  }, [debouncedTokenId])

  const handleClaim = async () => {
    setIsClaiming(true)
    await spaceLootService.claim(tokenId.toString())
    setIsClaiming(false)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setTokenId(new BigNumber(e.target.value))
    }
  }

  const randomLoot = () => {
    const tokenId = new BigNumber(Math.floor(Math.random() * maxTokenId))
    setTokenId(tokenId)
  }

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
        <LootBox loot={loot} />
      </Box>
      <Box paddingTop="50px" display="flex" justifyContent="center" alignItems="center">
        <Box marginRight="20px">
          <div className="nes-field">
            <input
              type="number"
              id="name_field"
              className="nes-input"
              value={tokenId?.toString()}
              onChange={handleOnChange}
              style={{ textAlign: 'right' }}
            />
          </div>
        </Box>
        {loot && !loot.is_claimed && (
          <Box marginRight="20px">
            <button
              type="button"
              className={`nes-btn is-success ${isClaiming && 'is-disabled'}`}
              disabled={isClaiming}
              onClick={handleClaim}
            >
              {isClaiming ? 'Claiming...' : 'Claim!'}
            </button>
          </Box>
        )}
        <button type="button" className="nes-btn is-success" onClick={randomLoot}>
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
