import { useEffect, useRef, useState } from 'react'

export const useAsyncMemo = <T>(factory: () => Promise<T>, deps: any[], initialValue: T): T => {
  const [result, setResult] = useState<T>(initialValue)

  const activeRef = useRef<boolean | null>(null)

  useEffect(() => {
    activeRef.current = true
    load()
    return () => {
      activeRef.current = false
    }
    async function load() {
      const res = await factory()
      if (!activeRef.current) {
        return
      }
      setResult(res)
    }
  }, deps)

  return result
}
