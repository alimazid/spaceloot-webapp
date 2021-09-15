import { observer } from 'mobx-react-lite'
import { ChangeEvent, useMemo, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { LootHangar } from 'views/loot/LootHangar'
import { BitStarBgContainer } from 'views/common/BitStarBgContainer'
import { Loot } from 'interfaces/loot.interface'
import { spaceLootService } from 'services/spaceLootService'
import { useAsyncMemo } from 'hooks/useAsyncMemo'
import { walletStore } from 'stores/walletStore'
import { maskWalletAddress } from 'utils/wallet.utils'
import { paginate } from 'utils/pagination.utils'
import styled from '@emotion/styled'
import { clamp } from 'utils/number.utils'

type TitleProps = {
  totalLoots?: number
  owner: string
}

const HangarTitle = observer(({ totalLoots, owner }: TitleProps) => {
  const isOwned = useMemo(() => {
    return walletStore.address === owner
  }, [owner, walletStore.address])

  const titleText = useMemo(() => {
    const awesome = isOwned ? 'Awesome! ' : ' '
    if (totalLoots === 0) {
      return `No ships in the hangar`
    } else if (totalLoots === 1) {
      return `${awesome}There is a ship in`
    } else {
      return `${awesome}There are ${totalLoots} ships in`
    }
  }, [totalLoots, isOwned])

  const ownerText = useMemo(() => {
    return isOwned ? 'your hangar' : `${maskWalletAddress(owner)}'s hanger`
  }, [isOwned])

  return (
    <Typography variant="h3" className="nes-text is-primary">
      {titleText}{' '}
      <span>
        <a href={`/captain/${owner}/hangar`} target="_blank" className="nes-text is-warning">
          {ownerText}
        </a>
      </span>
    </Typography>
  )
})

const PaginatorBox = styled(Box)`
  width: 400px;
  color: white;
  border: 2px solid white;
  background: #212529;
  & div *:not(:last-child) {
    margin-right: 8px;
  }
`
type HangarProps = {
  owner: string
}
export const HangarByAddress = observer(({ owner }: HangarProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const [transferable, setTransferable] = useState(false)
  const [transferredLoots, setTransferredLoots] = useState([])

  const updateTransferable = useMemo(() => {
    const isOwned = walletStore.address === owner
    setTransferable(isOwned)
  }, [walletStore.address])

  const allTokenIds = useAsyncMemo<string[]>(
    async () => {
      return spaceLootService.queryTokenIdsByAddress(owner)
    },
    [owner],
    []
  )

  const totalLoots = useAsyncMemo<number>(
    async () => {
      return spaceLootService.queryLootBalance(owner)
    },
    [owner],
    0
  )

  const loots = useAsyncMemo<Loot[]>(
    async () => {
      return spaceLootService.queryLootsetByIds(paginate(allTokenIds, { page, pageSize }))
    },
    [owner, allTokenIds, page, pageSize],
    []
  )

  const lastPage = useMemo(() => {
    return Math.ceil(totalLoots / pageSize)
  }, [totalLoots, pageSize])

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setPage(clamp(+e.target.value, 1, lastPage))
    }
  }

  return (
    <BitStarBgContainer py={3}>
      <Box my={3} display="flex" justifyContent="center" alignItems="center">
        <HangarTitle totalLoots={totalLoots} owner={owner} />
      </Box>
      <Box display="flex" justifyContent="center">
        <LootHangar
          loots={loots}
          transferable={transferable}
          transferredLoots={transferredLoots}
          setTransferredLoots={setTransferredLoots}
        />
      </Box>
      {totalLoots > 0 && (
        <PaginatorBox
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          alignSelf="center"
          my={3}
        >
          <button onClick={() => setPage(clamp(page - 1, 1, lastPage))}>{'<'}</button>
          <div>
            <span className="nes-text is-warning">page</span>
            <input
              type="number"
              className="nes-input"
              value={page.toString()}
              onChange={(e) => {
                handlePageChange
              }}
              style={{ textAlign: 'center', width: 80 }}
            />
            <span className="nes-text is-warning">of</span>
            <span className="nes-text is-warning">{lastPage}</span>
          </div>
          <button onClick={() => setPage(clamp(page + 1, 1, lastPage))}>{'>'}</button>
        </PaginatorBox>
      )}
    </BitStarBgContainer>
  )
})
