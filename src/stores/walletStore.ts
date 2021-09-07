import { Coin, Asset, NativeToken } from 'interfaces/asset.interface'
import { makeAutoObservable } from 'mobx'

export const CURRENT_ADDRESS_KEY = 'CURRENT_ADDRESS'

class WalletStore {
  address: string = ''
  balances: Asset[] = []
  isTransactionProgress = false
  isExtensionInstalled = false

  constructor() {
    makeAutoObservable(this)
  }

  clear = () => {
    this.setAddress('', false)
    this.setBalances([])
    this.setIsTransactionProgress(false)
    this.setIsTransactionProgress(false)
  }

  setAddress = (address: string, writeStorage = true) => {
    if (global.window && writeStorage) {
      localStorage.setItem(CURRENT_ADDRESS_KEY, address)
    }
    this.address = address
  }

  setBalances = (coins: Coin[]) => {
    this.balances = coins.map((coin) => {
      return {
        amount: coin.amount,
        info: {
          native_token: { denom: coin.denom },
        } as NativeToken,
      } as Asset
    })
  }

  setIsTransactionProgress = (isTransactionProgress: boolean) => {
    this.isTransactionProgress = isTransactionProgress
  }

  setExtensionInstalled = (isInstalled: boolean) => {
    this.isExtensionInstalled = isInstalled
  }

  get isConnected() {
    return this.address !== ''
  }
}

export const walletStore = new WalletStore()
