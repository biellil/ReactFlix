import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, Alert } from '@mui/material'
import {
  HomeContainer,
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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const fetchMovies = useCallback(async (page: number) => {
    const cacheKey = `movies_page_${page}`
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      const { results, total_pages }: ApiResponse = JSON.parse(cachedData)
      setMovies(results)
      setTotalPages(total_pages)
      return
    }

    try {
      const response = await fetch(
        `${apiUrl}/top_rated?language=pt-BR&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`,
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
      setMovies(data.results)
      setTotalPages(data.total_pages)

      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(data))
    } catch (error) {
      setError((error as Error).message)
    }
  }, [])

  useEffect(() => {
    fetchMovies(page)
  }, [page, fetchMovies])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <HomeContainer>
      {error && <Alert severity="error">{error}</Alert>}
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
    </HomeContainer>
  )
}
