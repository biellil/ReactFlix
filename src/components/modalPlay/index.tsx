// src/components/ModalPlay/ModalPlay.tsx
import { FC, useEffect } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { modalStyle } from './styles'
import { StyledLinearProgress } from '../Loading/styles'
import { Loading } from '../Loading'

// Definição da função clearCache
const clearCache = () => {
  Object.keys(localStorage).forEach((key) => {
    if (
      key.startsWith('movies_page_Topfilmes_') ||
      key.startsWith('movies_page_TopSeries_')
    ) {
      localStorage.removeItem(key)
    }
  })
}

interface ContentModalProps {
  open: boolean
  onClose: () => void
  contentId: string | null
  contentType: 'filme' | 'serie'
  season?: string
  episode?: string
}

export const ModalPlay: FC<ContentModalProps> = ({
  open,
  onClose,
  contentId,
  contentType,
  season,
  episode,
}) => {
  // Cria a URL do iframe com base nas propriedades
  const iframeSrc = contentId
    ? `https://superflixapi.dev/${contentType}/${contentId}${
        season ? `/${season}` : ''
      }${episode ? `/${episode}` : ''}`
    : ''

  // useEffect para limpar o cache quando o modal abrir
  useEffect(() => {
    if (open) {
      clearCache()
    }
  }, [open])

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} className="modalStyle">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            style={{ width: '100%', height: '90%', border: 'none' }}
            title="Video"
            allowFullScreen
            loading="lazy"
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <Typography variant="body1">
            <StyledLinearProgress>
              <Loading />
            </StyledLinearProgress>
          </Typography>
        )}
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
          Fechar
        </Button>
      </Box>
    </Modal>
  )
}
