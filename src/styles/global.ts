import { createTheme } from '@mui/material/styles'
import { createGlobalStyle } from 'styled-components'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1f1e1e',
    },
  },
})

export const GlobalStyle = createGlobalStyle`

a{
  text-decoration: none;
  color: inherit;

}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    font-family: sans-serif;
  
  html {
   
    font-size: 99%;
  }

  body {
  height: 100vh;
  margin: 0;
 width: 100vw;
}

  @media (max-width: 768px) {
    html {
      font-size: 80%;
    }
  }

  @media (max-width: 600px) {
    html {
      font-size: 65%;
    }
  }
  @media (max-width: 425px) {
    html {
      font-size: 59%;
    }
  }

}


`
