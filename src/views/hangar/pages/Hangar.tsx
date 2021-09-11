import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { HangarByAddress } from '../HangarByAddress'

export const Hangar = observer(() => {
  const transferable = false
  const router = useRouter()
  const owner = useMemo(() => {
    return router.query?.address as string
  }, [router.query?.address])

  return <HangarByAddress owner={owner} />
})
