import { MsgExecuteContract } from '@terra-money/terra.js'
import axios from 'axios'
import { addresses } from 'constants/addresses'
import { gas } from 'constants/gas'
import { networkStore } from 'stores/networkStore'
import { walletStore } from 'stores/walletStore'
import { networkService } from './networkService'
import { walletService } from './walletService'
import BigNumber from 'bignumber.js'
import { Loot } from 'interfaces/loot.interface'
import { defaultPaginationOptions, PaginationOptions } from 'interfaces/pagination.interface'
import { paginate } from 'utils/pagination.utils'

class SpaceLootService {
  claim = async (lootId: string) => {
    if (!walletStore.isConnected) return

    const sender = walletStore.address
    const { spaceLoot } = addresses[networkStore.name]

    const response = await walletService.post(
      {
        msgs: [
          new MsgExecuteContract(sender, spaceLoot, {
            claim: {
              token_id: lootId,
            },
          }),
        ],
      },
      {
        gas: gas[networkStore.name].methods.claim.gasLimit,
        amount: networkService.calculateTxFee('claim').toString(),
      }
    )
    return response
  }

  transfer = async (recipient: string, lootId: string) => {
    if (!walletStore.isConnected) return

    const sender = walletStore.address
    const { nft } = addresses[networkStore.name]

    const response = await walletService.post(
      {
        msgs: [
          new MsgExecuteContract(sender, nft, {
            transfer_nft: {
              recipient: recipient,
              token_id: lootId,
            },
          }),
        ],
      },
      {
        gas: gas[networkStore.name].methods.transfer.gasLimit,
        amount: networkService.calculateTxFee('transfer').toString(),
      }
    )
    return response
  }

  queryLootBalance = async (owner: string): Promise<number> => {
    const { nft } = addresses[networkStore.name]
    const { count } = await networkStore.terra.wasm.contractQuery(nft, {
      balance: {
        owner,
      },
    })
    return count as number
  }

  queryLootset = async (tokenId: string): Promise<Loot> => {
    const { spaceLoot } = addresses[networkStore.name]
    const response: Loot = await networkStore.terra.wasm.contractQuery(spaceLoot, {
      lootset: {
        token_id: tokenId,
      },
    })
    return response
  }

  queryLootsetByIds = async (tokenIds: string[]): Promise<Loot[]> => {
    return Promise.all(
      tokenIds.map(async (tokenId) => {
        return this.queryLootset(tokenId)
      })
    )
  }

  queryTokenIdsByAddress = async (owner: string): Promise<string[]> => {
    const balance = await this.queryLootBalance(walletStore.address)

    let tokenIds: string[] = []
    let startAfter: string | undefined
    const { nft } = addresses[networkStore.name]

    while (tokenIds.length < balance) {
      const { tokens }: { tokens: string[] } = await networkStore.terra.wasm.contractQuery(nft, {
        tokens: {
          owner,
          limit: 30,
          ...(!!startAfter && { start_after: startAfter }),
        },
      })
      tokenIds = [...tokenIds, ...tokens]
      startAfter = tokenIds[tokenIds.length - 1]
    }
    return tokenIds
  }

  queryLootsByAddress = async (
    owner: string,
    options: {} & PaginationOptions = defaultPaginationOptions
  ): Promise<Loot[]> => {
    const tokens = await this.queryTokenIdsByAddress(owner)
    const filteredTokenIds = paginate(tokens, options)

    const loots: Loot[] = await Promise.all(
      filteredTokenIds.map(async (tokenId) => {
        return this.queryLootset(tokenId)
      })
    )

    return loots
  }

  queryMyLoots = async (
    options: {} & PaginationOptions = defaultPaginationOptions
  ): Promise<Loot[]> => {
    return this.queryLootsByAddress(walletStore.address, options)
  }

  queryLatestBlock = async () => {
    const { data } = await axios.get(`${networkStore.lcd}/blocks/latest`)
    return data.block.header.height
  }
}

export const spaceLootService = new SpaceLootService()
