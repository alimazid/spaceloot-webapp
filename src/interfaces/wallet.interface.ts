import { SyncTxBroadcastResult } from '@terra-money/terra.js'
export interface ConnectResponse {
  address?: string
}

export interface InfoResponse {
  name: string
  chainID: string
  lcd: string
  fcd: string
  ws: string
}

export type Result = SyncTxBroadcastResult.Data

export interface PostResponse {
  id: number
  origin: string
  success: boolean
  result?: Result
  error?: { code: number; message?: string }
}
