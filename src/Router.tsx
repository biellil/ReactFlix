// Routers.tsx
import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect } from 'react'
import { LoadingContainer, StyledLinearProgress } from './styles/styles'

// Importação dos componentes usando lazy
const DefaultLayout = lazy(() => import('./components/layoutDefault'))
// const Login = lazy(() => import('./components/login'));

export function Routers() {
  // Estado para o progresso
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
    <Suspense
      fallback={
        <LoadingContainer>
          <StyledLinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </LoadingContainer>
      }
    >
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path="/" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  )
}
