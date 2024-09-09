import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'
import { LoadingContainer } from './components/Loading/styles'
import PrivateRoute from './components/PrivateRoute'

const DefaultLayout = lazy(() => import('./components/layoutDefault'))
const Auth = lazy(() => import('./pages/auth'))

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
        {/* Rota pública */}
        <Route path="/Auth" element={<Auth />}>
          {/* <Route path="/:uid" element={<Auth />} /> */}
        </Route>

        {/* Rota protegida */}
        <Route
          path="/"
          element={<PrivateRoute element={<DefaultLayout />} />}
        />
      </Routes>
    </Suspense>
  )
}
