import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { GlobalStyle, darkTheme } from './styles/global.ts'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
