import { BrowserRouter } from 'react-router-dom'
import { Routers } from './Router'
import { MainHero } from './styles/styles'
import { useEffect } from 'react'
import { analytics } from './components/firebase'
import { logEvent } from 'firebase/analytics'

export function App() {
  useEffect(() => {
    logEvent(analytics, 'page_view')
  }, [])

  return (
    <MainHero>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </MainHero>
  )
}
