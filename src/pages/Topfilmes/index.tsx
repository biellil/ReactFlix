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

interface Movie {
  id: number
  backdrop_path: string
  title: string
}

interface ApiResponse {
  results: Movie[]
  total_pages: number
}

const PRELOAD_PAGES = import.meta.env.VITE_PRELOAD_PAGES || 3 // Número de páginas futuras a pré-carregar

export default function Topfilmes() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Novo estado para controle de carregamento
  const [openSnackbar, setOpenSnackbar] = useState(false) // Estado para controle de Snackbar

  const apiUrl = import.meta.env.VITE_API_URL

  const fetchMovies = useCallback(
    async (page: number, isPreload = false) => {
      const cacheKey = `movies_page_top_${page}`
      const cachedData = localStorage.getItem(cacheKey)

      if (cachedData) {
        const { results, total_pages }: ApiResponse = JSON.parse(cachedData)
        if (!isPreload) {
          setMovies(results)
          setTotalPages(total_pages)
          setIsLoading(false) // Marcar como carregado
        }
        return
      }

      try {
        const response = await fetch(
          `${apiUrl}/popular?language=pt-BR&page=${page}`,
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
          setTotalPages(data.total_pages)
          setIsLoading(false) // Marcar como carregado
        }

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(data))
      } catch (error) {
        if (!isPreload) {
          setError((error as Error).message)
          setOpenSnackbar(true) // Mostrar Snackbar com erro
          setIsLoading(false) // Marcar como carregado mesmo em caso de erro
        }
      }
    },
    [apiUrl],
  )

  useEffect(() => {
    // Carregar a página atual
    fetchMovies(page)

    // Pré-carregar páginas futuras somente após a página atual estar carregada
    if (!isLoading) {
      for (let i = 1; i <= PRELOAD_PAGES; i++) {
        const nextPage = page + i
        if (nextPage <= totalPages) {
          fetchMovies(nextPage, true)
        }
      }
    }
  }, [page, fetchMovies, totalPages, isLoading])

  const handlePageChange = (
    _: React.ChangeEvent<unknown>, // Marcador para o parâmetro não utilizado
    value: number,
  ) => {
    setPage(value)
    setIsLoading(true) // Marcar como carregando ao mudar de página
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
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
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieBanner
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </MoviesGrid>

      {/* Snackbar para exibir o alerta */}
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
    </TopContainer>
  )
}
