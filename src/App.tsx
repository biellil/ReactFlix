import { BrowserRouter } from 'react-router-dom'
import { Routers } from './Router'
import { MainHero } from './styles/styles'

export function App() {
  return (
    <>
      <MainHero>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </MainHero>
    </>
  )
}
