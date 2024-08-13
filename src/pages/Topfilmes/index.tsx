import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination, Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  TopContainer,
  MoviesGrid,
  MovieCard,
  MovieBanner,
  MovieTitle,
} from './styles'
import { ModalPreview } from '../../components/ModalPreview'

interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface ApiResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

const PRELOAD_PAGES = import.meta.env.VITE_PRELOAD_PAGES || 3
const MAX_PAGES_DISPLAYED = 500

export default function Topfilmes() {
  const [page, setPage] = useState(1)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const fetchMovies = async (page: number): Promise<ApiResponse> => {
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
    return response.json()
  }

  const { data, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['Topfilmes', page],
    queryFn: () => fetchMovies(page),
    placeholderData: keepPreviousData,
    onSuccess: (data: { total_pages: number }) => {
      for (let i = 1; i <= PRELOAD_PAGES; i++) {
        const nextPage = page + i
        if (nextPage <= data.total_pages && nextPage <= MAX_PAGES_DISPLAYED) {
          queryClient.prefetchQuery({
            queryKey: ['Topfilmes', nextPage],
            queryFn: () => fetchMovies(nextPage),
          })
        }
      }
    },
  })

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  return (
    <TopContainer>
      <Pagination
        count={data ? Math.min(data.total_pages, MAX_PAGES_DISPLAYED) : 1}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
      />
      <MoviesGrid>
        {data?.results
          .slice(0, isSmallScreen ? 8 : data.results.length)
          .map((movie) => (
            <MovieCard key={movie.id} onClick={() => handleOpenModal(movie)}>
              <MovieBanner
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
      </MoviesGrid>
      <Snackbar
        open={isError && openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error?.message}
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
          {error?.message}
        </Alert>
      </Snackbar>
      {selectedMovie && (
        <ModalPreview
          type="filmes"
          open={Boolean(selectedMovie)}
          onClose={handleCloseModal}
          contentId={selectedMovie.id.toString()}
          contentType="filme"
          title={selectedMovie.title}
          overview={selectedMovie.overview}
          posterPath={selectedMovie.poster_path}
          vote_average={selectedMovie.vote_average}
          release_date={selectedMovie.release_date}
        />
      )}
    </TopContainer>
  )
}
