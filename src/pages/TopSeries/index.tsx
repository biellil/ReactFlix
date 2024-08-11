import React, { useState, useEffect } from 'react'
import { Pagination, Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  HomeContainer,
  MoviesGrid,
  MovieCard,
  MovieBanner,
  MovieTitle,
} from './styles'
import { ModalPlay } from '../../components/modalPlay'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
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

export default function TopSeries() {
  const [page, setPage] = useState(1)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)

  const apiUrl = import.meta.env.VITE_API_URL
  const queryClient = useQueryClient()

  const fetchMovies = async (page: number): Promise<ApiResponse> => {
    const response = await fetch(
      `${apiUrl}/tv/top_rated?language=pt-BR&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          accept: 'application/json',
        },
      },
    )
    if (!response.ok) {
      throw new Error('Erro ao buscar séries')
    }
    console.log(response)
    return response.json()
  }

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['TopSeries', page],
    queryFn: () => fetchMovies(page),
    placeholderData: keepPreviousData,
    onSuccess: (data) => {
      for (let i = 1; i <= PRELOAD_PAGES; i++) {
        const nextPage = page + i
        if (nextPage <= data.total_pages && nextPage <= MAX_PAGES_DISPLAYED) {
          queryClient.prefetchQuery({
            queryKey: ['TopSeries', nextPage],
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

  const handleOpenModal = (id: number) => {
    setSelectedMovieId(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedMovieId(null)
  }

  return (
    <HomeContainer>
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
            <MovieCard key={movie.id} onClick={() => handleOpenModal(movie.id)}>
              <MovieBanner
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.name}
              />
              <MovieTitle>{movie.name}</MovieTitle>
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
      <ModalPlay
        open={modalOpen}
        onClose={handleCloseModal}
        contentId={selectedMovieId?.toString() || ''}
        contentType="serie"
      />
    </HomeContainer>
  )
}
