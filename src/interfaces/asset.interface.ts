export interface Coin {
  amount: string
  denom: string
}

export interface Asset {
  amount: string
  info: AssetInfo
}

export type AssetInfo = Token | NativeToken

export interface Token {
  token: { contract_addr: string }
}

export interface NativeToken {
  native_token: { denom: string }
}
