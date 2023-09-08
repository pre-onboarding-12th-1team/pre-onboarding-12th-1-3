import { useEffect } from 'react'

const useEvent = <T extends keyof WindowEventMap>(
  key: T,
  listener: (e: WindowEventMap[T]) => void,
) => {
  useEffect(() => {
    window.addEventListener(key, listener)
    return () => {
      window.removeEventListener(key, listener)
    }
  }, [key, listener])
}

export default useEvent
