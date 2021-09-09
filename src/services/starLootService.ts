import { MsgExecuteContract } from '@terra-money/terra.js'
import axios from 'axios'
import { addresses } from 'constants/addresses'
import { gas } from 'constants/gas'
import { networkStore } from 'stores/networkStore'
import { walletStore } from 'stores/walletStore'
import { networkService } from './networkService'
import { walletService } from './walletService'
import BigNumber from 'bignumber.js'

class StarLootService {
  claim = async (lootId: number) => {
    if (!walletStore.isConnected) return

    const sender = walletStore.address
    const { starLoot } = addresses[networkStore.name]

    const response = await walletService.post(
      {
        msgs: [
          new MsgExecuteContract(sender, starLoot, {
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

  queryLootset = async (tokenId: BigNumber) => {
    const { starLoot } = addresses[networkStore.name]
    const response = await networkStore.terra.wasm.contractQuery(starLoot, {
      lootset: {
        token_id: tokenId.toString(),
      },
    })
  }

  queryLatestBlock = async () => {
    const { data } = await axios.get(`${networkStore.lcd}/blocks/latest`)
    return data.block.header.height
  }
}

export const starLootService = new StarLootService()
