export type SpaceLootMethods = 'claim'

export const gas: {
  [network: string]: {
    gasAdjustment: number
    defaultGasFee: number
    methods: { [methodName in SpaceLootMethods]: { gasLimit: number; gasFee: number } }
  }
} = {
  mainnet: {
    gasAdjustment: 1.6,
    defaultGasFee: 100000,
    methods: {
      claim: { gasLimit: 300000, gasFee: 200000 },
    },
  },
  testnet: {
    gasAdjustment: 1.6,
    defaultGasFee: 100000,
    methods: {
      claim: { gasLimit: 1500000, gasFee: 300000 },
    },
  },
}
