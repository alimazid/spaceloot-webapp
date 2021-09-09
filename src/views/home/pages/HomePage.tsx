import { ChangeEvent, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import { randomBytes } from 'crypto'
import BigNumber from 'bignumber.js'
import styled from '@emotion/styled'
import { spaceLootService } from 'services/spaceLootService'
import { useDebounce } from 'hooks/useDebounce'
import { Loot } from 'interfaces/loot.interface'

export const HomePage = observer(() => {
  const [isClaiming, setIsClaiming] = useState(false)
  const [tokenId, setTokenId] = useState<BigNumber>(new BigNumber('NaN'))
  const [loot, setLoot] = useState<Loot>()
  const debouncedTokenId = useDebounce<BigNumber>(tokenId, 200)

  useEffect(() => {
    const sideEffect = async () => {
      setLoot({ id: debouncedTokenId.toNumber() } as any)
      return // to be removed
      const response = await spaceLootService.queryLootset(debouncedTokenId)
      setLootset(response.lootset)
    }
    sideEffect()
  }, [debouncedTokenId])

  const handleClaim = async () => {
    setIsClaiming(true)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    setIsClaiming(false)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setTokenId(new BigNumber(e.target.value))
    }
  }

  const randomUint256 = () => {
    const hex = randomBytes(4).toString('hex')
    setTokenId(new BigNumber('0x' + hex))
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
        <button type="button" className="nes-btn is-success" onClick={randomUint256}>
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
