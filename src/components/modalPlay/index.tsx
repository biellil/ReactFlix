import { FC, useEffect, useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { modalStyle } from './styles'
import { StyledLinearProgress } from '../Loading/styles'
import { Loading } from '../Loading'
import moviesData from './movies.json'
import seriesData from './series.json'

// Função para limpar o cache dos filmes e séries
// const clearCache = () => {
//   Object.keys(localStorage).forEach((key) => {
//     if (
//       key.startsWith('movies_page_Topfilmes_') ||
//       key.startsWith('movies_page_TopSeries_')
//     ) {
//       localStorage.removeItem(key)
//     }
//   })
// }

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

  // Variáveis de ambiente para verificar o uso do IMDb ID
  const useImdbForFilms = import.meta.env.VITE_USE_IMDB_FOR_FILMS
  const useImdbForSeries = import.meta.env.VITE_USE_IMDB_FOR_SERIES

  useEffect(() => {
    if (contentId) {
      // Buscar o IMDb ID correspondente ao TMDB ID para filmes
      if (
        (contentType === 'filme' || contentType === 'movie') &&
        useImdbForFilms
      ) {
        const movie = moviesData.find((m) => m.tmdbID === contentId)
        setImdbId(movie ? movie.imdbID : null)
      }
      // Buscar o IMDb ID correspondente ao TMDB ID para séries
      else if (
        (contentType === 'serie' || contentType === 'tv') &&
        useImdbForSeries
      ) {
        const series = seriesData.find((s) => s.tmdbID === contentId)
        setImdbId(series ? series.imdbID : null)
      } else {
        setImdbId(null)
      }
    }
  }, [contentId, contentType, useImdbForFilms, useImdbForSeries])

  // Construir o URL do embed para filmes
  const iframeSrcForMovies =
    imdbId && (contentType === 'filme' || contentType === 'movie')
      ? `https://superflixapi.dev/filme/${imdbId}`
      : ''

  // Construir o URL do embed para séries
  const iframeSrcForSeries =
    contentId && (contentType === 'serie' || contentType === 'tv')
      ? `https://superflixapi.dev/serie/${contentId}${season ? `/${season}` : ''}${episode ? `/${episode}` : ''}`
      : ''

  // // Limpar o cache quando o modal for aberto
  // useEffect(() => {
  //   if (open) {
  //     clearCache()
  //   }
  // }, [open])

  return (
    <Modal open={open} onClose={onClose} aria-labelledby={title}>
      <Box sx={modalStyle} className="modalStyle">
        {iframeSrcForMovies ? (
          <iframe
            src={iframeSrcForMovies}
            style={{ width: '100%', height: '90%', border: '0', padding: '0' }}
            title={title}
            loading="lazy"
            allowFullScreen
            allow="autoplay; fullscreen"
            sandbox="allow-same-origin allow-scripts"
          />
        ) : iframeSrcForSeries ? (
          <iframe
            src={iframeSrcForSeries}
            style={{ width: '100%', height: '90%', border: '0', padding: '0' }}
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
