import styled from 'styled-components'
import { LinearProgress } from '@mui/material'
export const MainHero = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  .container {
    width: 90vw;
    max-width: 75rem;
    background-color: rgb(15 15 15 / 0.5);
    margin-top: 5rem;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    .container {
      width: 90%;
      max-width: 70rem;
    }
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
`

export const StyledLinearProgress = styled(LinearProgress)`
  width: 80%; // Ajuste conforme necessário
  margin-top: 20px; // Ajuste conforme necessário
  background-color: #e0e0e0; // Cor do fundo do LinearProgress
  .MuiLinearProgress-bar {
    background-color: #3f51b5; // Cor da barra de progresso
  }
`
