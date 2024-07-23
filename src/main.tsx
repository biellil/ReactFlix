import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { GlobalStyle, theme } from './styles/global.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
