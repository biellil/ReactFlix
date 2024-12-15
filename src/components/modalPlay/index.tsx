import { FC, useEffect, useState } from 'react'
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      if (!title || !contentType) {
        setError('Título ou tipo de conteúdo inválido.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const password = import.meta.env.VITE_API_PASSWORD

        const response = await fetch(
          `https://n8n.biellil.com.br/webhook/b8c4f50c-5cbf-4676-9638-73050ad1bfd9?title=${title}&type=${contentType}`,
          {
            method: 'GET',
            headers: {
              // Correção do cabeçalho de autenticação
              'n8n-api': password, // Corrigir o valor de acordo com o esperado
            },
          },
        )

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro ao buscar embed: ${response.statusText}`)
        }

        const data = await response.json()

        // Log da resposta para mais detalhes
        console.log('Response Data:', data)

        if (data?.link) {
          setEmbedUrl(data.link)
        } else {
          setEmbedUrl(null)
          setError('Link embed não encontrado.')
        }
      } catch (error: any) {
        console.error('Erro ao buscar o embed:', error)
        setEmbedUrl(null)
        setError(error.message || 'Erro desconhecido ao buscar o embed.')
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchEmbedUrl()
    }

    return () => {
      setEmbedUrl(null)
      setError(null)
    }
  }, [title, contentType, open])

  return (
    <Modal open={open} onClose={onClose} aria-labelledby={title}>
      <Box sx={modalStyle} className="modalStyle">
        {loading ? (
          <Typography variant="body1">
            <StyledLinearProgress>
              <Loading />
            </StyledLinearProgress>
          </Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
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
