import { LCDClient } from '@terra-money/terra.js'
import { defaultNetwork } from 'constants/networks'
import { makeAutoObservable } from 'mobx'

class NetworkStore {
  terra!: LCDClient
  lcd: string = ''
  name: string = ''
  chainID: string = ''

  taxRate: number = 0
  taxCaps: { [denom: string]: number } = {}

  constructor() {
    this.setTerra(defaultNetwork.name, defaultNetwork.lcd, defaultNetwork.chainID)
    makeAutoObservable(this)
  }

  setTerra = (name: string, lcd: string, chainID: string) => {
    this.name = name
    this.lcd = lcd
    this.chainID = chainID
    if (global.window) {
      this.terra = new LCDClient({
        URL: lcd,
        chainID: chainID,
      })
    }
  }

  setTaxRate = (taxRate: number) => {
    this.taxRate = taxRate
  }

  updateTaxCap = (denom: string, taxCap: number) => {
    this.taxCaps = { ...this.taxCaps, [denom]: taxCap }
  }

  get isMainnet() {
    return /^columbus/.test(this.chainID)
  }
}

export const networkStore = new NetworkStore()
