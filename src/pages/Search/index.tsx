import React, { useState, useEffect } from 'react'
import { Pagination, Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  SearchContainer,
  ResultsGrid,
  ResultCard,
  ResultBanner,
  ResultTitle,
} from './styles'
import { ModalPlay } from '../../components/modalPlay'

interface Result {
  id: number
  backdrop_path: string
  title: string
  name: string
}

interface ApiResponse {
  results: Result[]
  total_pages: number
}

const PRELOAD_PAGES = import.meta.env.VITE_PRELOAD_PAGES || 3
const MAX_PAGES_DISPLAYED = 500
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

interface SearchComponentProps {
  searchTerm: string
}

export default function SearchComponent({ searchTerm }: SearchComponentProps) {
  const [page, setPage] = useState(1)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedResultId, setSelectedResultId] = useState<number | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)

  const queryClient = useQueryClient()

  const fetchResults = async (page: number): Promise<ApiResponse> => {
    const response = await fetch(
      `${API_URL}/search/multi?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=pt-BR&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      },
    )
    if (!response.ok) {
      throw new Error('Erro ao buscar resultados')
    }
    return response.json()
  }

  const { data, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['SearchResults', searchTerm, page],
    queryFn: () => fetchResults(page),
    placeholderData: keepPreviousData,
    onSuccess: (data: { total_pages: number }) => {
      for (let i = 1; i <= PRELOAD_PAGES; i++) {
        const nextPage = page + i
        if (nextPage <= data.total_pages && nextPage <= MAX_PAGES_DISPLAYED) {
          queryClient.prefetchQuery({
            queryKey: ['SearchResults', searchTerm, nextPage],
            queryFn: () => fetchResults(nextPage),
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
    setSelectedResultId(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedResultId(null)
  }

  return (
    <SearchContainer>
      <Pagination
        count={data ? Math.min(data.total_pages, MAX_PAGES_DISPLAYED) : 1}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
      />
      <ResultsGrid>
        {data?.results
          .slice(0, isSmallScreen ? 8 : data.results.length)
          .map((result) => (
            <ResultCard
              key={result.id}
              onClick={() => handleOpenModal(result.id)}
            >
              <ResultBanner
                src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`}
                alt={result.title || result.name}
              />
              <ResultTitle>{result.title || result.name}</ResultTitle>
            </ResultCard>
          ))}
      </ResultsGrid>
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
        contentId={selectedResultId?.toString() || ''}
        contentType="filme"
      />
    </SearchContainer>
  )
}
