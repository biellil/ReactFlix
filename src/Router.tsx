// Routers.tsx
import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'
import { LoadingContainer } from './components/Loading/styles'

const DefaultLayout = lazy(() => import('./components/layoutDefault'))
// const Auth = lazy(() => import('./pages/auth'));

export function Routers() {
  return (
    <Suspense
      fallback={
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      }
    >
      <Routes>
        {/* <Route path="/" element={<Auth />} /> */}
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/filmes/:contentId" element={<DefaultLayout />} />
        <Route path="/Series/:contentId" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  )
}
