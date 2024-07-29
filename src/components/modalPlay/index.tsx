// src/components/ModalPlay/ModalPlay.tsx
import { FC } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { modalStyle } from './styles'

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

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} className="modalStyle">
        <h1>{contentId}</h1>
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
          <Typography variant="body1">Carregando...</Typography>
        )}
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
          Fechar
        </Button>
      </Box>
    </Modal>
  )
}
