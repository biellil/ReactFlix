// ModalPlay atualizado para usar o novo endpoint
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Box, Typography, Button } from '@mui/material'
import { modalStyle } from './styles'
import { StyledLinearProgress } from '../Loading/styles'
import { Loading } from '../Loading'

interface ContentModalProps {
  open: boolean
  onClose: () => void
  contentId: string | null // tmdbID
  contentType: 'filme' | 'serie' | 'movie' | 'tv'
  title: string
}

export const ModalPlay: FC<ContentModalProps> = ({
  open,
  onClose,
  contentId,
  contentType,
  title,
}) => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      if (!title || !contentType) return

      setLoading(true)
      try {
        // Codificar o título para a URL
        const encodedTitle = encodeURIComponent(title)
        const encodedType = encodeURIComponent(contentType)

        // Fazer a requisição para o novo endpoint
        const response = await axios.get(
          `https://n8n.biellil.com.br/webhook/b8c4f50c-5cbf-4676-9638-73050ad1bfd9?title=${encodedTitle}&type=${encodedType}`,
        )

        if (response.data?.link) {
          setEmbedUrl(response.data.link)
        } else {
          setEmbedUrl(null)
        }
      } catch (error) {
        console.error('Erro ao buscar o embed:', error)
        setEmbedUrl(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEmbedUrl()
  }, [title, contentType])

  return (
    <Modal open={open} onClose={onClose} aria-labelledby={title}>
      <Box sx={modalStyle} className="modalStyle">
        {loading ? (
          <Typography variant="body1">
            <StyledLinearProgress>
              <Loading />
            </StyledLinearProgress>
          </Typography>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            style={{ width: '100%', height: '90%', border: '0', padding: '0' }}
            title={title}
            loading="lazy"
            allowFullScreen
            allow="autoplay; fullscreen"
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <Typography variant="body1">Embed não encontrado.</Typography>
        )}
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
          Fechar
        </Button>
      </Box>
    </Modal>
  )
}
