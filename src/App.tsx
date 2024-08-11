// src/App.tsx
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routers } from './Router'
import { MainHero } from './styles/styles'
import { analytics, performance } from './components/firebase'
import { logEvent } from 'firebase/analytics'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { trace } from 'firebase/performance'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  useEffect(() => {
    // Criação e uso de um trace personalizado
    const customTrace = trace(performance, 'custom_trace_name')
    customTrace.start()

    // Simula uma operação
    setTimeout(() => {
      customTrace.stop()
    }, 1000)
  }, [])

  useEffect(() => {
    logEvent(analytics, 'page_view')
  }, [])

  return (
    <MainHero>
      <BrowserRouter>
        <Analytics />
        <QueryClientProvider client={queryClient}>
          <Routers />
        </QueryClientProvider>
        <SpeedInsights />
      </BrowserRouter>
    </MainHero>
  )
}
