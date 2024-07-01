import { Route, Routes } from 'react-router-dom'
import { PlayVideo } from './Components/playVideo'
// import { UploadFileComponent } from './pages/UploadVideo'

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<PlayVideo />} />
      {/* <Route path="/uploadvideo" element={<UploadFileComponent />} /> */}
    </Routes>
  )
}
