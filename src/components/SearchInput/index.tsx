// SearchInput.tsx
import React from 'react'
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { LabelContainer } from './styles'

interface SearchInputProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function SearchInput({ searchTerm, onSearchChange }: SearchInputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <LabelContainer htmlFor="search">
      <OutlinedInput
        type="text"
        id="search"
        placeholder="Buscar filmes ou Séries"
        value={searchTerm}
        onChange={handleInputChange}
        autoComplete="off"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </LabelContainer>
  )
}
