import { networkStore } from 'stores/networkStore'
import { Asset, NativeToken } from 'interfaces/asset.interface'
import { gas, InkMethod } from 'constants/gas'
import { walletService } from './walletService'
import { walletStore } from 'stores/walletStore'

class NetworkService {
  init = async () => {
    const info = await walletService.info()
    console.log(info)
    networkStore.setTerra(info.name, info.lcd, info.chainID)
    await walletService.init()

    return Promise.allSettled([networkService.updateTaxCap(), networkService.updateTaxRate()])
  }

  queryTaxRate = async () => {
    const taxRate = await networkStore.terra.treasury.taxRate()
    return taxRate
  }

  queryTaxCap = async (denom: string) => {
    const taxCap = await networkStore.terra.treasury.taxCap(denom)
    return taxCap
  }

  updateTaxRate = async () => {
    const taxRate = await this.queryTaxRate()
    networkStore.setTaxRate(taxRate.toNumber())
  }

  updateTaxCap = async () => {
    const taxCap = await this.queryTaxCap('uusd')
    networkStore.updateTaxCap('uusd', taxCap.amount.toNumber())
  }

  // calculateTxFee = (method: InkMethod, asset?: Asset): big => {
  //   const defaultGasFee = big(gas[networkStore.name].defaultGasFee || 0)
  //   const gasFee = big(
  //     gas[networkStore.name].methods[method].gasFee || defaultGasFee,
  //   )
  //   const tax = asset ? this.calculateTxTax(asset) : big(0)
  //   return gasFee.plus(tax)
  // }

  // calculateTxTax = (asset?: Asset) => {
  //   if ((asset.info as NativeToken).native_token) {
  //     const taxCap = big(
  //       networkStore.taxCaps[(asset.info as NativeToken).native_token.denom],
  //     )
  //     const tax = big(networkStore.taxRate).times(asset.amount).round(0, 0)
  //     if (tax.gte(taxCap)) {
  //       return taxCap
  //     }
  //     return tax
  //   }
  //   return big(0)
  // }

  updateNetwork = async () => {
    if (walletService.extension.isAvailable) {
      const info = await walletService.info()
      if (networkStore.name != info.name) {
        walletStore.clear()
        networkStore.setTerra(info.name, info.lcd, info.chainID)
        await walletService.init()
      }
    }
  }

  queryTxInfo = async (txHash: string) => {
    return networkStore.terra.tx.txInfo(txHash)
  }
}

export const networkService = new NetworkService()
