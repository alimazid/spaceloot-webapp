import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@material-ui/core'
import { LootBox } from 'views/loot/LootBox'
import Link from 'next/link'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import BigNumber from 'bignumber.js'
import { spaceLootService } from 'services/spaceLootService'
import { useDebounce } from 'hooks/useDebounce'
import { Loot } from 'interfaces/loot.interface'
import styled from '@emotion/styled'

const maxTokenId = 8000

const Divider = styled.div`
  border-top: 1px solid #ddd;
  width: 90%;
  margin: 32px auto;
  box-shadow: 0 0 2px 1px #ddd;
`
const FooterBox = styled(Box)`
  border: 2px solid white;
  background: #212529;
  span {
    color: #ddd;
  }
  i {
    margin: 0;
    transform-origin: center;
  }
`

export const HomePage = observer(() => {
  const [isClaiming, setIsClaiming] = useState(false)
  const [tokenId, setTokenId] = useState<BigNumber>(
    new BigNumber(Math.floor(Math.random() * maxTokenId))
  )
  const [loot, setLoot] = useState<Loot>()
  const debouncedTokenId = useDebounce<BigNumber>(tokenId, 200)

  const fetchLootTimer = useRef<NodeJS.Timer | null>(null)

  const fetchLoot = useCallback(async () => {
    const response = await spaceLootService.queryLootset(debouncedTokenId.toString())
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
    const response = await spaceLootService.claim(tokenId.toString())
    setIsClaiming(false)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setTokenId(BigNumber.min(new BigNumber(e.target.value), 8000))
    }
  }

  const randomLoot = () => {
    const tokenId = new BigNumber(Math.floor(Math.random() * maxTokenId))
    setTokenId(tokenId)
  }

  return (
    <BitStarBgContainer width="100%" paddingTop="32px">
      <Box display="flex" justifyContent="center">
        <Typography variant="h3" className="nes-text is-primary">
          It's Dangerous to Go Alone! Take This Starship With You
        </Typography>
      </Box>
      <Box marginTop="24px" display="flex" justifyContent="center">
        <LootBox loot={loot} />
      </Box>
      <Box paddingTop="24px" display="flex" justifyContent="center" alignItems="center">
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
      <Divider />
      <FooterBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        my={2}
        p={2}
      >
        <span className="nes-text is-error">
          <Link href="/traits" passHref>
            <a>
              <i className="nes-icon star" /> Check Your Spaceship Traits
            </a>
          </Link>
        </span>
      </FooterBox>
      <FooterBox display="flex" justifyContent="space-between" mx="auto" p={3}>
        <span className="nes-text" style={{ color: '#DDD' }}>
          Connect with us ~{' '}
          <a
            href="https://twitter.com/spaceloot_nft"
            target="_blank"
            className="nes-text is-warning"
            rel="noreferrer"
          >
            Twitter
          </a>
          {'  '}
          <a
            href="https://t.me/joinchat/VJS63IYLV4oyYTE9"
            target="_blank"
            className="nes-text is-warning"
            rel="noreferrer"
          >
            Telegram
          </a>
          {'  '}
          <a
            href="https://discord.gg/ch2EmcbSdf"
            target="_blank"
            className="nes-text is-warning"
            rel="noreferrer"
          >
            Discord
          </a>
        </span>
      </FooterBox>
      <FooterBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        mx="auto"
        my={2}
        py={2}
        px={1}
        textAlign="center"
      >
        <span className="nes-text" style={{ marginBottom: 6 }}>
          Made with <i className="nes-icon heart" /> by
        </span>
        <span className="nes-text">
          <a
            href="https://twitter.com/spaceloot_nft"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            @apemon_chan
          </a>
          {', '}
          <a
            href="https://twitter.com/supasonk_"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            @supasonk_
          </a>
          {', '}
          <a
            href="https://twitter.com/kaoths"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            @kaoths
          </a>
          {', '}
          <a
            href="https://twitter.com/0xWolfgang_"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            @0xWolfgang_
          </a>
          {', '}
          <a
            href="https://twitter.com/pchayvimol"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            @pchayvimol
          </a>
          {','}
          <a
            href="https://twitter.com/mr_rogers0x"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            @mr_rogers0x
          </a>
<<<<<<< HEAD
          {', and '}
          <a
            href="https://twitter.com/Lunatics_cc"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
=======
          {','}
          <a href="https://twitter.com/Lunatics_cc" target="_blank" className="nes-text is-primary" rel="noreferrer">
>>>>>>> origin/main
            @Lunatics_cc
          </a>
          {', and'}
          <a href="https://twitter.com/france_astin" target="_blank" className="nes-text is-primary" rel="noreferrer">
            @france_astin
          </a>
          <br />
          {'Special thanks to'}{' '}
          <a
            href="https://github.com/nostalgic-css/NES.css/"
            target="_blank"
            className="nes-text is-primary"
            rel="noreferrer"
          >
            NES.css
          </a>
          {' for awesome CSS'}{' '}
          <i
            className="nes-jp-logo is-small"
            style={{ transform: 'scale(0.5)', top: '7px', left: '-20px' }}
          />
        </span>
      </FooterBox>
    </BitStarBgContainer>
  )
})
