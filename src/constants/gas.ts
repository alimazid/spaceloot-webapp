export type StarLootMethods = 'claim'

export const gas: {
  [network: string]: {
    gasAdjustment: number
    defaultGasFee: number
    methods: { [methodName in StarLootMethods]: { gasLimit: number; gasFee: number } }
  }
} = {
  mainnet: {
    gasAdjustment: 1.6,
    defaultGasFee: 100000,
    methods: {
      claim: { gasLimit: 1000000, gasFee: 200000 },
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
