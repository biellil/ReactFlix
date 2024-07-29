import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Importação dos componentes usando lazy
const DefaultLayout = lazy(() => import('./components/layoutDefault'))
// const Login = lazy(() => import('./components/login'))

export function Routers() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path="/" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  )
}
