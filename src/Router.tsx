import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './components/layoutDefault'

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
    </Routes>
  )
}
