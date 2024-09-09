import styled from 'styled-components'
import { LinearProgress } from '@mui/material'

export const StyledLinearProgress = styled(LinearProgress)`
  width: 80%; // Ajuste conforme necessário
  margin: 20px auto; // Centraliza horizontalmente e adiciona margem vertical
  background-color: #e0e0e0; // Cor do fundo do LinearProgress
`
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
`
