import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { LootHangar } from 'views/loot/LootHangar'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import { Loot } from 'interfaces/loot.interface'
import { spaceLootService } from 'services/spaceLootService'
import { useAsyncMemo } from 'hooks/useAsyncMemo'
import { walletStore } from 'stores/walletStore'

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

  const isOwned = useMemo(() => {
    return walletStore.address === owner
  }, [walletStore.address])

  const titleText = useMemo(() => {
    const awesome = isOwned ? 'Awesome! ' : ' '
    const article = isOwned ? 'your' : 'the'
    if (totalLoots === 0) {
      return `No ships in the hangar`
    } else if (totalLoots === 1) {
      return `${awesome}There is a ship in ${article} hangar`
    } else {
      return `${awesome}There are ${totalLoots} ships in ${article} hangar`
    }
  }, [totalLoots])

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
