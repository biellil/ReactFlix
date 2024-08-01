import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  SearchContainer,
  ResultsGrid,
  ResultCard,
  ResultBanner,
  ResultTitle,
} from './styles'
import { ModalPlay } from '../../components/modalPlay'
import { Loading } from '../../components/Loading'
import { StyledLinearProgress } from '../../components/Loading/styles'

interface Result {
  id: number
  backdrop_path: string
  title: string
}

interface ApiResponse {
  results: Result[]
  total_pages: number
}

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

interface SearchComponentProps {
  searchTerm: string
}

export default function SearchComponent({ searchTerm }: SearchComponentProps) {
  const [results, setResults] = useState<Result[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedResultId, setSelectedResultId] = useState<number | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)

  const fetchResults = useCallback(
    async (page: number) => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${API_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=pt-BR&page=${page}`,
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
        const data: ApiResponse = await response.json()
        setResults(data.results)
        setTotalPages(data.total_pages)
      } catch (error) {
        setError((error as Error).message)
        setOpenSnackbar(true)
      } finally {
        setIsLoading(false)
      }
    },
    [searchTerm, page],
  )

  useEffect(() => {
    if (searchTerm) {
      fetchResults(page)
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [searchTerm, page, fetchResults])

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
      {isLoading ? (
        <StyledLinearProgress>
          <Loading />
        </StyledLinearProgress>
      ) : (
        <>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
          />
          <ResultsGrid>
            {results
              .slice(0, isSmallScreen ? 8 : results.length)
              .map((result) => (
                <ResultCard
                  key={result.id}
                  onClick={() => handleOpenModal(result.id)}
                >
                  <ResultBanner
                    src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`}
                    alt={result.title}
                  />
                  <ResultTitle>{result.title}</ResultTitle>
                </ResultCard>
              ))}
          </ResultsGrid>
        </>
      )}

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
        contentId={selectedResultId?.toString() || ''}
        contentType="filme"
      />
    </SearchContainer>
  )
}
