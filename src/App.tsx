import { BrowserRouter } from 'react-router-dom'
import { Routers } from './Router'
import { MainHero } from './styles/styles'
import { useEffect } from 'react'
import { analytics } from './components/firebase'
import { logEvent } from 'firebase/analytics'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
export function App() {
  useEffect(() => {
    logEvent(analytics, 'page_view')
  }, [])

  return (
    <MainHero>
      <BrowserRouter>
        <Analytics />
        <Routers />
        <SpeedInsights />
      </BrowserRouter>
    </MainHero>
  )
}
