import React, { FC } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'

interface ContentModalProps {
  open: boolean
  onClose: () => void
  contentId: string | null
  contentType: 'filme' | 'serie'
  season?: string
  episode?: string
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2, // Ajustado o padding
}

export const ContentModal: FC<ContentModalProps> = ({
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
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2"></Typography>
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            style={{ width: '100%', height: '90%', border: 'none' }}
            title="Video"
            allowFullScreen
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
