import { AssetInfo } from 'interfaces/asset.interface'

export const depositAssetInfoMap: { [sid: number]: AssetInfo } = {
  0: { native_token: { denom: 'uusd' } },
}

export const pollingIntervals = {
  contract: 7000,
  network: 5000,
}
