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

  queryLootset = async (tokenId: BigNumber): Promise<any> => {
    const { spaceLoot, nft } = addresses[networkStore.name]
    const response = await networkStore.terra.wasm.contractQuery(spaceLoot, {
      lootset: {
        token_id: tokenId.toString(),
      },
    })
    return response
  }

  queryMyLoots = async (): Promise<any> => {
    const { spaceLoot, nft } = addresses[networkStore.name]
    const response = await networkStore.terra.wasm.contractQuery(nft, {
      tokens: {
        owner: walletStore.address,
      },
    })
    let myLoot: Array<Loot> = new Array<Loot>()
    for (const tokenId of (response as any).tokens) {
      const lootSet = await this.queryLootset(tokenId)
      myLoot.push(lootSet as Loot)
    }

    return response
  }

  queryLatestBlock = async () => {
    const { data } = await axios.get(`${networkStore.lcd}/blocks/latest`)
    return data.block.header.height
  }
}

export const spaceLootService = new SpaceLootService()
