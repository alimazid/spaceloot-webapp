import { MsgExecuteContract } from '@terra-money/terra.js'
import axios from 'axios'
import { addresses } from 'constants/addresses'
import { gas } from 'constants/gas'
import { networkStore } from 'stores/networkStore'
import { walletStore } from 'stores/walletStore'
import { networkService } from './networkService'
import { walletService } from './walletService'
import BigNumber from 'bignumber.js'

class SpaceLootService {
  claim = async (lootId: number) => {
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
    const { spaceLoot } = addresses[networkStore.name]
    const response = await networkStore.terra.wasm.contractQuery(spaceLoot, {
      lootset: {
        token_id: tokenId.toString(),
      },
    })
    return response
  }

  queryLatestBlock = async () => {
    const { data } = await axios.get(`${networkStore.lcd}/blocks/latest`)
    return data.block.header.height
  }
}

export const spaceLootService = new SpaceLootService()
