import { FC, useEffect, useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { modalStyle } from './styles'
import { StyledLinearProgress } from '../Loading/styles'
import { Loading } from '../Loading'
import moviesData from './movies.json'
import seriesData from './series.json'

// Função para limpar o cache
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

// Leitura das variáveis de ambiente
const USE_IMDB_FOR_FILMS = import.meta.env.VITE_USE_IMDB_FOR_FILMS === 'true'
const USE_IMDB_FOR_SERIES = import.meta.env.VITE_USE_IMDB_FOR_SERIES === 'true'

export const ModalPlay: FC<ContentModalProps> = ({
  open,
  onClose,
  contentId,
  contentType,
  season,
  episode,
}) => {
  const [imdbId, setImdbId] = useState<string | null>(null)

  useEffect(() => {
    console.log('VITE_USE_IMDB_FOR_FILMS:', USE_IMDB_FOR_FILMS)
    console.log('VITE_USE_IMDB_FOR_SERIES:', USE_IMDB_FOR_SERIES)
    if (contentId) {
      if (contentType === 'filme') {
        if (USE_IMDB_FOR_FILMS) {
          // Buscar o IMDb ID correspondente ao TMDB ID para filmes
          const movie = moviesData.find((m: any) => m.tmdbID === contentId)
          if (movie) {
            setImdbId(movie.imdbID)
          }
        } else {
          // Usar TMDB ID diretamente para filmes
          setImdbId(contentId)
        }
      } else if (contentType === 'serie') {
        if (USE_IMDB_FOR_SERIES) {
          // Buscar o IMDb ID correspondente ao TMDB ID para séries
          const series = seriesData.find((s: any) => s.tmdbID === contentId)
          if (series) {
            setImdbId(series.imdbID)
          }
        } else {
          // Usar TMDB ID diretamente para séries
          setImdbId(contentId)
        }
      }
    }
  }, [contentId, contentType])

  const iframeSrc =
    contentType === 'filme' && imdbId
      ? `https://superflixapi.dev/${contentType}/${imdbId}${
          season ? `/${season}` : ''
        }${episode ? `/${episode}` : ''}`
      : contentType === 'serie' && imdbId
        ? `https://superflixapi.dev/${contentType}/${imdbId}${
            season ? `/${season}` : ''
          }${episode ? `/${episode}` : ''}`
        : contentType === 'filme'
          ? `https://superflixapi.dev/${contentType}/${contentId}${
              season ? `/${season}` : ''
            }${episode ? `/${episode}` : ''}`
          : contentType === 'serie'
            ? `https://superflixapi.dev/${contentType}/${contentId}${
                season ? `/${season}` : ''
              }${episode ? `/${episode}` : ''}`
            : ''

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
