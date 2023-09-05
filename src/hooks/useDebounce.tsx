import { useCallback, useRef } from 'react'

const useDebounce = <P extends unknown[], R = unknown>(
  callback: (...args: P) => R,
  time: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const dispatchDebounce = useCallback(
    (...args: P) => {
      if (timer.current) clearTimeout(timer.current)
      const newTimer = setTimeout(() => callback(...args), time)
      timer.current = newTimer
    },
    [callback, time],
  )

  return dispatchDebounce
}

export default useDebounce
