import { useEffect, useState } from 'react'
import { StyledLinearProgress } from './styles'

export const Loading = () => {
  const [progress, setProgress] = useState(10)
  const [buffer, setBuffer] = useState(30)

  useEffect(() => {
    // Simula o progresso
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress === 100 ? 10 : prevProgress + 10,
      )
      setBuffer((prevBuffer) => (prevBuffer === 100 ? 30 : prevBuffer + 10))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <StyledLinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
      />
    </>
  )
}
