import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, Alert } from '@mui/material'
import {
  TopContainer,
  MoviesGrid,
  MovieCard,
  MovieBanner,
  MovieTitle,
} from './styles'

// Criação do cache como um objeto global (para simplicidade, pode ser alterado para um sistema mais sofisticado)
const cache = new Map()

export function Topfilmes() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)

  const fetchMovies = useCallback(async (page: number) => {
    // Verificar se os dados estão no cache
    if (cache.has(page)) {
      const cachedData = cache.get(page)
      setMovies(cachedData.results)
      setTotalPages(cachedData.total_pages)
      return
    }

    setError(null)
    try {
      const response = await fetch(
        `/api/tmdb/popular?language=pt-BR&page=${page}`,
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
      // Armazenar no cache
      cache.set(page, data)

      setMovies(data.results)
      setTotalPages(data.total_pages)
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
    <TopContainer>
      {error && <Alert severity="error">{error}</Alert>}
      {!error && (
        <>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
          />
          <MoviesGrid>
            {movies.map((movie) => (
              <MovieCard key={movie.id}>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieBanner
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </MovieCard>
            ))}
          </MoviesGrid>
        </>
      )}
    </TopContainer>
  )
}
