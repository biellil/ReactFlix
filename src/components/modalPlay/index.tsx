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
  contentType: 'filme' | 'serie' | 'movie' | 'tv' | 'anime'
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
      if (!contentId || (contentType !== 'filme' && contentType !== 'movie' && contentType !== 'serie' && contentType !== 'tv' && contentType !== 'anime'))
        return

      setLoading(true)
      try {
        let baseUrl = '';
        let response;

        // Definir a URL base dependendo do tipo de conteúdo
        if (contentType === 'filme' || contentType === 'movie') {
          baseUrl = 'https://superflixapi.dev/filmes';
        } else if (contentType === 'serie' || contentType === 'tv') {
          baseUrl = 'https://superflixapi.dev/series';
        } else if (contentType === 'anime') {
          baseUrl = 'https://superflixapi.dev/animes';
        }

        // Primeira tentativa de buscar o embed
        try {
          response = await axios.get(
            `https://cors-anywhere.herokuapp.com/${baseUrl}/?search=${contentId}`,
            {
              headers: {
                'X-Requested-With': 'XMLHttpRequest', // Headers adicionais para permitir a requisição
              },
            },
          )
        } catch (error) {
          console.error('Erro ao buscar na API principal:', error)
          throw new Error('Erro ao buscar na API principal');
        }

        // Parsear o HTML para encontrar o link do embed
        const parser = new DOMParser()
        const doc = parser.parseFromString(response.data, 'text/html')

        // Encontrar o link de embed dependendo do tipo de conteúdo
        const embedLink = doc
          .querySelector('a.btn[href*="superflixapi.dev"]')
          ?.getAttribute('href')

        if (embedLink) {
          setEmbedUrl(embedLink)
          alert(`Link do Embed: ${embedLink}`) // Exibe o link no alerta
        } else {
          setEmbedUrl(null)
          alert('Embed não encontrado na API inicial.')
        }
      } catch (error) {
        console.error('Tentativa na API principal falhou, tentando como anime:', error)

        // Se falhou, tentar buscar como anime
        try {
          const response = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://superflixapi.dev/animes/?search=${contentId}`,
            {
              headers: {
                'X-Requested-With': 'XMLHttpRequest', // Headers adicionais para permitir a requisição
              },
            },
          )

          // Parsear o HTML para encontrar o link do embed
          const parser = new DOMParser()
          const doc = parser.parseFromString(response.data, 'text/html')

          const embedLink = doc
            .querySelector('a.btn[href*="superflixapi.dev"]')
            ?.getAttribute('href')

          if (embedLink) {
            setEmbedUrl(embedLink)
            alert(`Link do Embed: ${embedLink}`) // Exibe o link no alerta
          } else {
            setEmbedUrl(null)
            alert('Embed não encontrado como anime.')
          }
        } catch (animeError) {
          console.error('Erro ao buscar na API de animes:', animeError)
          setEmbedUrl(null)
          alert('Erro ao buscar o embed na API de animes.')
        }
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
