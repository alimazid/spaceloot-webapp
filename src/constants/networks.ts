export const networks = {
  localterra: {
    chainID: 'localterra',
    fcd: 'http://localhost:3060',
    lcd: 'http://localhost:3060',
    name: 'localterra',
    ws: 'ws://localhost:3060',
  },
  testnet: {
    chainID: 'tequila-0004',
    fcd: 'https://tequila-fcd.terra.dev',
    lcd: 'https://tequila-lcd.terra.dev',
    name: 'testnet',
    ws: 'wss://tequila-ws.terra.dev',
  },
  mainnet: {
    chainID: 'columbus-4',
    fcd: 'https://fcd.terra.dev',
    lcd: 'https://lcd.terra.dev',
    name: 'mainnet',
    ws: 'wss://fcd.terra.dev',
  },
}

export const defaultNetwork = networks.mainnet
