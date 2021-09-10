type NetworkInfo = {
  chainID: string
  fcd: string
  lcd: string
  name: string
  ws: string
  finder: string
}

export const networks: Record<string, NetworkInfo> = {
  localterra: {
    chainID: 'localterra',
    fcd: 'http://localhost:3060',
    lcd: 'http://localhost:3060',
    name: 'localterra',
    ws: 'ws://localhost:3060',
    finder: '',
  },
  testnet: {
    chainID: 'tequila-0004',
    fcd: 'https://tequila-fcd.terra.dev',
    lcd: 'https://tequila-lcd.terra.dev',
    name: 'testnet',
    ws: 'wss://tequila-ws.terra.dev',
    finder: 'https://finder.terra.money/tequila-0004',
  },
  mainnet: {
    chainID: 'columbus-4',
    fcd: 'https://fcd.terra.dev',
    lcd: 'https://lcd.terra.dev',
    name: 'mainnet',
    ws: 'wss://fcd.terra.dev',
    finder: 'https://finder.terra.money/columbus-4',
  },
}

export const defaultNetwork = networks.mainnet
