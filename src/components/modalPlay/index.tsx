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
  season?: string
  episode?: string
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
      if (!contentId) return

      setLoading(true)
      try {
        let apiUrl = ''

        // Definindo a URL da API dependendo do tipo de conteúdo
        if (contentType === 'filme' || contentType === 'movie') {
          apiUrl = `https://cors-anywhere.herokuapp.com/https://superflixapi.dev/filmes/?search=${contentId}`
        } else if (contentType === 'serie' || contentType === 'tv') {
          apiUrl = `https://cors-anywhere.herokuapp.com/https://superflixapi.dev/series/?search=${contentId}`
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest', // Headers adicionais para permitir a requisição
          },
        })

        // Parsear o HTML para encontrar o link do embed
        const parser = new DOMParser()
        const doc = parser.parseFromString(response.data, 'text/html')
        const embedLink = doc
          .querySelector('a.btn[href*="superflixapi.dev/"]')
          ?.getAttribute('href')

        if (embedLink) {
          setEmbedUrl(embedLink)
        } else {
          setEmbedUrl(null)
        }
      } catch (error) {
        console.error('Erro ao buscar o embed:', error)
        setEmbedUrl(null)
        alert('Erro ao buscar o embed.')
      } finally {
        setLoading(false)
      }
    }

    fetchEmbedUrl()
  }, [contentId, contentType])

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
