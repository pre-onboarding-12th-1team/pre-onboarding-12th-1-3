import { useEffect } from 'react'

const useKeyEvent = (listener: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [listener])
}

export default useKeyEvent
