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
    if (contentId) {
      if (contentType === 'filme') {
        // Buscar o IMDb ID correspondente ao TMDB ID para filmes
        const movie = moviesData.find((m: any) => m.tmdbID === contentId)
        if (movie) {
          setImdbId(movie.imdbID)
        }
      } else if (contentType === 'serie') {
        // Buscar o IMDb ID correspondente ao TMDB ID para séries
        const series = seriesData.find((s: any) => s.tmdbID === contentId)
        if (series) {
          setImdbId(series.imdbID)
        } else {
          // Se não houver IMDb ID, usa TMDB ID diretamente
          setImdbId(null)
        }
      }
    }
  }, [contentId, contentType])

  const iframeSrc =
    contentType === 'filme' && imdbId
      ? `https://superflixapi.dev/${contentType}/${imdbId}${
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
