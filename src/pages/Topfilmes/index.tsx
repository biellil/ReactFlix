import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  TopContainer,
  MoviesGrid,
  MovieCard,
  MovieBanner,
  MovieTitle,
} from './styles'
import { ModalPlay } from '../../components/modalPlay'

interface Movie {
  id: number
  backdrop_path: string
  title: string
}

interface ApiResponse {
  results: Movie[]
  total_pages: number
}

const PRELOAD_PAGES = import.meta.env.VITE_PRELOAD_PAGES || 3
const MAX_PAGES_DISPLAYED = 500 // Defina o número máximo de páginas a serem exibidas

export default function Topfilmes() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)

  const apiUrl = import.meta.env.VITE_API_URL

  const fetchMovies = useCallback(
    async (page: number, isPreload = false) => {
      const cacheKey = `movies_page_Topfilmes_${page}`
      const cachedData = localStorage.getItem(cacheKey)

      if (cachedData) {
        const { results, total_pages }: ApiResponse = JSON.parse(cachedData)
        if (!isPreload) {
          setMovies(results)
          setTotalPages(Math.min(total_pages, MAX_PAGES_DISPLAYED)) // Limita o total de páginas exibidas
          setIsLoading(false)
        }
        return
      }

      try {
        const response = await fetch(
          `${apiUrl}/movie/popular?language=pt-BR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              accept: 'application/json',
            },
          },
        )
        if (!response.ok) {
          throw new Error('Erro ao buscar filmes')
        }
        const data: ApiResponse = await response.json()
        if (!isPreload) {
          setMovies(data.results)
          setTotalPages(Math.min(data.total_pages, MAX_PAGES_DISPLAYED)) // Limita o total de páginas exibidas
          setIsLoading(false)
        }

        localStorage.setItem(cacheKey, JSON.stringify(data))
      } catch (error) {
        if (!isPreload) {
          setError((error as Error).message)
          setOpenSnackbar(true)
          setIsLoading(false)
        }
      }
    },
    [apiUrl],
  )

  useEffect(() => {
    fetchMovies(page)

    if (!isLoading) {
      for (let i = 1; i <= PRELOAD_PAGES; i++) {
        const nextPage = page + i
        if (nextPage <= totalPages) {
          fetchMovies(nextPage, true)
        }
      }
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [page, fetchMovies, totalPages, isLoading])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    setIsLoading(true)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleOpenModal = (id: number) => {
    setSelectedMovieId(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedMovieId(null)
  }

  return (
    <TopContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
      />
      <MoviesGrid>
        {movies.slice(0, isSmallScreen ? 8 : movies.length).map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleOpenModal(movie.id)}>
            <MovieBanner
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </MoviesGrid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      <ModalPlay
        open={modalOpen}
        onClose={handleCloseModal}
        contentId={selectedMovieId?.toString() || ''}
        contentType="filme"
      />
    </TopContainer>
  )
}
