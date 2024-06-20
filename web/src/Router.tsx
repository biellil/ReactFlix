import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
// import { UploadFileComponent } from './pages/UploadVideo'

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/uploadvideo" element={<UploadFileComponent />} /> */}
    </Routes>
  )
}
