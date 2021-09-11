import { observer } from 'mobx-react-lite'
import { HangarByAddress } from '../HangarByAddress'
import { walletStore } from 'stores/walletStore'

export const MyHangar = observer(() => {
  return <HangarByAddress owner={walletStore.address} />
})
