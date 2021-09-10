import { useEffect, useState } from 'react'
import { pollingIntervals } from 'constants/starloot'
import { walletService } from 'services/walletService'
import { networkService } from 'services/networkService'
import { networks } from 'constants/networks'
import { walletStore } from 'stores/walletStore'

export const useSetup = () => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let pollingNetworkId: NodeJS.Timer
    let pollingContractId: NodeJS.Timer
    const setup = async () => {
      walletService.checkExtensionInstalled()
      networkService.init()

      if (!walletStore.isExtensionInstalled) {
        setReady(true)
        return
      }

      pollingNetworkId = setInterval(() => {
        networkService.updateNetwork()
      }, pollingIntervals.network)

      pollingContractId = setInterval(() => {
        // Polling
        walletService.checkExtensionInstalled()
      }, pollingIntervals.contract)

      // Without some sleep, page init breaks when current terra station network is different from constants/networks.defaultNetwork
      await new Promise((resolve) => setTimeout(resolve, 100))
      setReady(true)
    }
    setup()

    return () => {
      if (pollingNetworkId) {
        clearInterval(pollingNetworkId)
      }

      if (pollingContractId) {
        clearInterval(pollingContractId)
      }
    }
  }, [])

  return ready
}
