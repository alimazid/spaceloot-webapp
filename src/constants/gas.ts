export type InkMethod = 'deposit' | 'withdraw' | 'claim_award'

export const gas: {
  [network: string]: {
    gasAdjustment: number
    defaultGasFee: number
    methods: { [methodName: string]: { gasLimit: number; gasFee: number } }
  }
} = {
  mainnet: {
    gasAdjustment: 1.6,
    defaultGasFee: 100000,
    methods: {
      deposit: { gasLimit: 1000000, gasFee: 200000 },
      withdraw: { gasLimit: 1500000, gasFee: 300000 },
      claim_award: { gasLimit: 1500000, gasFee: 300000 },
    },
  },
  testnet: {
    gasAdjustment: 1.6,
    defaultGasFee: 100000,
    methods: {
      deposit: { gasLimit: 1500000, gasFee: 300000 },
      withdraw: { gasLimit: 2000000, gasFee: 400000 },
      claim_award: { gasLimit: 2000000, gasFee: 400000 },
    },
  },
}
