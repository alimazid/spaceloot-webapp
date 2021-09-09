import { observer } from 'mobx-react-lite'
import { Button } from '@material-ui/core'
import styled from '@emotion/styled'
import { walletStore } from 'stores/walletStore'
import { maskWalletAddress } from 'utils/wallet.utils'
import { walletService } from 'services/walletService'

const StyledButton = styled(Button)`
  border-radius: 999px;
`

export const ConnectButton = observer(() => {
  const handler = async () => {
    if (walletStore.isConnected) {
      await walletService.disconnect()
    } else {
      await walletService.connect()
    }
  }

  return (
    <button onClick={handler} type="button" className="nes-btn is-primary">{walletStore.isConnected ? maskWalletAddress(walletStore.address) : 'Connect'}</button>
  )
})
