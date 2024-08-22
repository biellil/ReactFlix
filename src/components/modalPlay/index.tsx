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
  season,
  episode,
  title,
}) => {
  const [imdbId, setImdbId] = useState<string | null>(null)

  // Verifica se o uso do IMDb ID está ativado com base nas variáveis de ambiente
  const useImdbForFilms = import.meta.env.VITE_USE_IMDB_FOR_FILMS === 'true'
  const useImdbForSeries = import.meta.env.VITE_USE_IMDB_FOR_SERIES === 'true'

  useEffect(() => {
    if (contentId) {
      if (contentType === 'filme' || contentType === 'movie') {
        if (useImdbForFilms) {
          // Buscar o IMDb ID correspondente ao TMDB ID para filmes
          const movie = moviesData.find((m: any) => m.tmdbID === contentId)
          if (movie) {
            setImdbId(movie.imdbID)
          } else {
            setImdbId(null)
          }
        } else {
          setImdbId(null)
        }
      } else if (contentType === 'serie' || contentType === 'tv') {
        if (useImdbForSeries) {
          // Buscar o IMDb ID correspondente ao TMDB ID para séries
          const series = seriesData.find((s: any) => s.tmdbID === contentId)
          if (series) {
            setImdbId(series.imdbID)
          } else {
            setImdbId(null)
          }
        } else {
          setImdbId(null)
        }
      }
    }
  }, [contentId, contentType, useImdbForFilms, useImdbForSeries])

  // Construir o iframeSrc
  const iframeSrc =
    (contentType === 'filme' || contentType === 'movie') && imdbId
      ? `https://superflixapi.dev/filme/${imdbId}${
          season ? `/${season}` : ''
        }${episode ? `/${episode}` : ''}`
      : (contentType === 'serie' || contentType === 'tv') && contentId
        ? `https://superflixapi.dev/serie/${contentId}${
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
      aria-labelledby={title}
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} className="modalStyle">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            style={{ width: '100%', height: '90%', border: 'none' }}
            title={title}
            loading="lazy"
            allowFullScreen
            allow="autoplay; fullscreen"
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
