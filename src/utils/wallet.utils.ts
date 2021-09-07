export const maskWalletAddress = (address: string, length = 6) => {
  return `${address.substr(0, length)}...${address.substr(-length, length)}`
}
