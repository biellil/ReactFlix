import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, Alert } from '@mui/material'
import {
  HomeContainer,
  MoviesGrid,
  MovieCard,
  MovieBanner,
  MovieTitle,
} from './styles'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)

  const fetchMovies = useCallback(async (page: number) => {
    const cacheKey = `movies_page_${page}`
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      const { results, total_pages } = JSON.parse(cachedData)
      setMovies(results)
      setTotalPages(total_pages)
      return
    }

    try {
      const response = await fetch(
        `/api/tmdb/top_rated?language=pt-BR&page=${page}`,
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
      const data = await response.json()
      setMovies(data.results)
      setTotalPages(data.total_pages)

      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(data))
    } catch (error) {
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    fetchMovies(page)
  }, [page, fetchMovies])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
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