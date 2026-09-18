import { useState } from 'react'

type Props = {
  children: string
}

export function RunawayButton({ children }: Props) {
  const [shakeKey, setShakeKey] = useState(0)
  const [shaking, setShaking] = useState(false)

  const shake = () => {
    setShaking(false)
    requestAnimationFrame(() => {
      setShakeKey((key) => key + 1)
      setShaking(true)
    })
  }

  return (
    <button
      key={shakeKey}
      type="button"
      aria-label="No, this answer will not stick"
      className={`min-h-12 w-full rounded-full border-2 border-rose-300 bg-white px-7 py-3 text-base font-bold text-rose-500 shadow-sm sm:w-auto sm:min-w-28 ${
        shaking ? 'shake-hard' : ''
      }`}
      onClick={(event) => {
        event.preventDefault()
        shake()
      }}
      onAnimationEnd={() => setShaking(false)}
    >
      {children}
    </button>
  )
}
