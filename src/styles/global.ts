import { createTheme } from '@mui/material/styles'
import { createGlobalStyle } from 'styled-components'
// A custom theme for this app
export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const GlobalStyle = createGlobalStyle`



  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    
    
  font-family: sans-serif;
  
  html {
   
    font-size: 100%;
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
