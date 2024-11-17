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
      if (!contentId || (contentType !== 'filme' && contentType !== 'movie' && contentType !== 'serie' && contentType !== 'tv'))
        return

      setLoading(true)
      try {
        // Definir a URL base dependendo do tipo de conteúdo
        let baseUrl = '';
        
        // Se for filme ou série, configura a URL correta
        if (contentType === 'filme' || contentType === 'movie') {
          baseUrl = 'https://superflixapi.dev/filmes';
        } else if (contentType === 'serie' || contentType === 'tv') {
          baseUrl = 'https://superflixapi.dev/series';
        }
        
        // Fazer a requisição inicial
        let response = await axios.get(
          `https://cors-anywhere.herokuapp.com/${baseUrl}/?search=${contentId}`,
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          },
        )

        // Parsear o HTML para encontrar o link do embed
        const parser = new DOMParser()
        const doc = parser.parseFromString(response.data, 'text/html')
        let embedLink = doc
          .querySelector('a.btn[href*="superflixapi.dev"]')
          ?.getAttribute('href')

        if (embedLink) {
          setEmbedUrl(embedLink)
        } else {
          // Se não encontrar o embed para filmes ou séries, tenta buscar como anime
          console.log('Embed não encontrado para filmes/séries, tentando como anime...')
          baseUrl = 'https://superflixapi.dev/animes'; // URL para animes
          response = await axios.get(
            `https://cors-anywhere.herokuapp.com/${baseUrl}/?search=${contentId}`,
            {
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
              },
            },
          )

          // Parsear novamente o HTML para buscar o embed
          const animeDoc = parser.parseFromString(response.data, 'text/html')
          embedLink = animeDoc
            .querySelector('a.btn[href*="superflixapi.dev"]')
            ?.getAttribute('href')

          if (embedLink) {
            setEmbedUrl(embedLink)
          } else {
            setEmbedUrl(null)
            alert('Embed não encontrado para anime.')
          }
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
