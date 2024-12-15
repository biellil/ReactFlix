import React, { useState, useEffect } from 'react'
import { Pagination, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  SearchContainer,
  ResultsGrid,
  ResultCard,
  ResultBanner,
  ResultTitle,
} from './styles'
import { ModalPlay } from '../../components/modalPlay'

interface Result {
  backdrop_path?: string
  id: number
  name?: string
  title?: string
  media_type: string
  // Outros campos omitidos para brevidade
}

interface ApiResponse {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
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
  const [selectedResult, setSelectedResult] = useState<Result | null>(null)

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
    keepPreviousData: true,
    onError: () => setOpenSnackbar(true),
  })

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleOpenModal = (result: Result) => {
    setSelectedResult(result)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedResult(null)
  }

  const getContentType = (mediaType: string): 'filme' | 'serie' | 'anime' => {
    if (mediaType === 'movie') return 'filme'
    if (mediaType === 'tv') return 'serie'
    return 'anime' // Default para casos que não sejam movie ou tv
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
        {data?.results.map((result) => (
          <ResultCard key={result.id} onClick={() => handleOpenModal(result)}>
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
        onClose={() => setOpenSnackbar(false)}
        message={error?.message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      {selectedResult && (
        <ModalPlay
          open={modalOpen}
          onClose={handleCloseModal}
          contentId={selectedResult.id.toString()}
          contentType={getContentType(selectedResult.media_type)}
          title={selectedResult.title || selectedResult.name || 'Sem título'}
        />
      )}
    </SearchContainer>
  )
}
