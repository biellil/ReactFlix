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
import { ModalPreview } from '../../components/ModalPreview'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

interface Series {
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
  results: Series[]
  total_pages: number
  total_results: number
}

const PRELOAD_PAGES = import.meta.env.VITE_PRELOAD_PAGES || 3
const MAX_PAGES_DISPLAYED = 500

export default function TopSeries() {
  const [page, setPage] = useState(1)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)

  const apiUrl = import.meta.env.VITE_API_URL
  const queryClient = useQueryClient()

  const fetchSeries = async (page: number): Promise<ApiResponse> => {
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
    return response.json()
  }

  const { data, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['TopSeries', page],
    queryFn: () => fetchSeries(page),
    placeholderData: keepPreviousData,
    onSuccess: (data) => {
      for (let i = 1; i <= PRELOAD_PAGES; i++) {
        const nextPage = page + i
        if (nextPage <= data.total_pages && nextPage <= MAX_PAGES_DISPLAYED) {
          queryClient.prefetchQuery({
            queryKey: ['TopSeries', nextPage],
            queryFn: () => fetchSeries(nextPage),
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

  const handleOpenModal = (series: Series) => {
    setSelectedSeries(series)
  }

  const handleCloseModal = () => {
    setSelectedSeries(null)
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
          .map((series) => (
            <MovieCard key={series.id} onClick={() => handleOpenModal(series)}>
              <MovieBanner
                src={`https://image.tmdb.org/t/p/w500${series.backdrop_path}`}
                alt={series.name}
              />
              <MovieTitle>{series.name}</MovieTitle>
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
      {selectedSeries && (
        <ModalPreview
          type="series"
          open={Boolean(selectedSeries)}
          onClose={handleCloseModal}
          contentId={selectedSeries.id.toString()}
          contentType="serie"
          title={selectedSeries.name}
          overview={selectedSeries.overview}
          posterPath={selectedSeries.poster_path}
          vote_average={selectedSeries.vote_average}
          release_date={selectedSeries.first_air_date}
        />
      )}
    </HomeContainer>
  )
}
