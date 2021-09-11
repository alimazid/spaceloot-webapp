import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { LootHangar } from 'views/loot/LootHangar'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import { Loot } from 'interfaces/loot.interface'
import { spaceLootService } from 'services/spaceLootService'
import { useAsyncMemo } from 'hooks/useAsyncMemo'
import { walletStore } from 'stores/walletStore'
import { maskWalletAddress } from 'utils/wallet.utils'

type Props = {
  owner: string
}

export const HangarByAddress = observer(({ owner }: Props) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const totalLoots = useAsyncMemo<number>(
    async () => {
      const tokenIds = await spaceLootService.queryTokenIdsByAddress(owner)
      return tokenIds.length
    },
    [owner],
    0
  )

  const loots = useAsyncMemo<Loot[]>(
    async () => {
      return spaceLootService.queryLootsByAddress(owner, { page, pageSize })
    },
    [owner, page, pageSize],
    []
  )

  const titleText = useMemo(() => {
    const isOwned = walletStore.address === owner
    const awesome = isOwned ? 'Awesome! ' : ' '
    const ownerTxt = isOwned ? 'your' : `${maskWalletAddress(owner)}'s`
    if (totalLoots === 0) {
      return `No ships in the hangar`
    } else if (totalLoots === 1) {
      return `${awesome}There is a ship in ${ownerTxt} hangar`
    } else {
      return `${awesome}There are ${totalLoots} ships in ${ownerTxt} hangar`
    }
  }, [totalLoots, walletStore.address])

  return (
    <BitStarBgContainer py={3}>
      <Box my={3} display="flex" justifyContent="center">
        <Typography variant="h3" className="nes-text is-primary">
          {titleText}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <LootHangar loots={loots} />
      </Box>
    </BitStarBgContainer>
  )
})
