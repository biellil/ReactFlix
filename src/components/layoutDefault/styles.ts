import styled from 'styled-components'
import { LinearProgress } from '@mui/material'

export const LayoutContainer = styled.div`
  display: flex;
  > div {
    display: flex;
    gap: 2rem;
  }
`
export const StyledLinearProgress = styled(LinearProgress)`
  width: 80%; // Ajuste conforme necessário
  margin: 20px auto; // Centraliza horizontalmente e adiciona margem vertical
  background-color: #e0e0e0; // Cor do fundo do LinearProgress
  .MuiLinearProgress-bar {
    background-color: #3f51b5; // Cor da barra de progresso
  }
`
