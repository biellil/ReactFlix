import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './components/layoutDefault'
// import Login from './components/login'

export function Routers() {
  return (
    <Routes>
      {/* <Route path='/' element={<Login/>} > */}
      <Route path="/" element={<DefaultLayout />} />
      {/* </Route> */}
    </Routes>
  )
}
