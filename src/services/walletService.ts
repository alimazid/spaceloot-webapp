import { CreateTxOptions, Extension, StdFee } from '@terra-money/terra.js'
import { ConnectResponse, InfoResponse, PostResponse } from 'interfaces/wallet.interface'
import { NativeToken, Token } from 'interfaces/asset.interface'
import { gas } from 'constants/gas'
import { walletStore, CURRENT_ADDRESS_KEY } from 'stores/walletStore'
import { networkStore } from 'stores/networkStore'
import { isBrowser } from 'constants/isBrowser'

class WalletService {
  extension!: Extension

  constructor() {
    if (isBrowser) {
      this.extension = new Extension()
    }
  }

  init = async () => {
    if (isBrowser) {
      const storedAddress = this.getStoredAddress()
      if (storedAddress) await this.connect()
    }
  }

  getStoredAddress = () => {
    return localStorage.getItem(CURRENT_ADDRESS_KEY) || ''
  }

  checkExtensionInstalled() {
    walletStore.setExtensionInstalled(this.extension.isAvailable)
  }

  connect = async (): Promise<ConnectResponse> => {
    const { payload }: any = await this.extension.request('connect')

    if (payload?.address) {
      walletStore.setAddress(payload?.address)
    }

    return payload
  }

  disconnect = async () => {
    walletStore.setAddress('')
  }

  info = async (): Promise<InfoResponse> => {
    const { payload }: any = await this.extension.request('info')
    return payload
  }

  post = async (
    options: CreateTxOptions,
    txFee: { gas: number; amount: string }
  ): Promise<PostResponse> => {
    const { gas: gasLimit, amount } = txFee
    const res: any = await this.extension.request('post', {
      msgs: options.msgs.map((msg) => msg.toJSON()),
      memo: options.memo,
      fee: new StdFee(gasLimit, {
        uusd: amount,
      }).toJSON(),
      gasAdjustment: gas[networkStore.name].gasAdjustment,
      purgeQueue: true,
    })
    if (res.error?.code) {
      throw res.error
    }

    return res.payload as any
  }

  queryTokenBalance = async (address: string, assetInfo: Token): Promise<string> => {
    const balanceResponse: any = await networkStore.terra.wasm.contractQuery(
      assetInfo.token.contract_addr,
      {
        balance: {
          address,
        },
      }
    )
    return balanceResponse.balance
  }

  queryNativeTokenBalance = async (address: string, assetInfo: NativeToken) => {
    const coins = await networkStore.terra.bank.balance(address)
    const coinsData = coins.toData()
    return coinsData.find((coin) => coin.denom === assetInfo.native_token.denom)?.amount || '0'
  }

  refreshUserBalances = async () => {
    if (walletStore.address) {
      const coins = await networkStore.terra.bank.balance(walletStore.address)
      const coinsData = coins.toData()
      walletStore.setBalances(coinsData)
    }
  }
}

export const walletService = new WalletService()
