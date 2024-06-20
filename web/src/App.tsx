import { MainHero } from './styles'
import { GlobalStyle } from './styles/global'
import { Routers } from './Router'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <MainHero>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </MainHero>
    </>
  )
}
