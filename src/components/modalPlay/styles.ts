// src/components/ModalPlay/styles.ts
import { LinearProgress, SxProps, Theme } from '@mui/material'
import { styled } from 'styled-components'

export const modalStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}
export const StyledLinearProgress = styled(LinearProgress)`
  width: 80%; // Ajuste conforme necessário
  margin: 20px auto; // Centraliza horizontalmente e adiciona margem vertical
  background-color: #e0e0e0; // Cor do fundo do LinearProgress
  .MuiLinearProgress-bar {
    background-color: #3f51b5; // Cor da barra de progresso
  }
`
