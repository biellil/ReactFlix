import React, { useState } from 'react'
import { FilmReel, FilmScript } from '@phosphor-icons/react'
import { Category, Headers } from './styles'
import icon from '../../assets/icon.png'
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  // Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface HeaderProps {
  onCategoryChange: (category: string) => void
  onSearchChange: (searchTerm: string) => void
}

export function Header({ onCategoryChange, onSearchChange }: HeaderProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Filmes')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  return (
    <Headers>
      <img src={icon} alt="Ícone" />
      <Category>
        <div
          onClick={() => handleCategoryChange('Filmes')}
          className={activeCategory === 'Filmes' ? 'active' : ''}
        >
          <FilmReel size={32} weight="fill" />
          <h2>Filmes</h2>
        </div>
        <div
          onClick={() => handleCategoryChange('Series')}
          className={activeCategory === 'Series' ? 'active' : ' '}
        >
          <FilmScript size={32} weight="fill" />
          <h2>Series</h2>
        </div>
        {/* <div className={activeCategory === 'Animes' ? 'active' : 'not-allowed'}>
          <GridFour size={32} weight="fill" />
          <h2>Animes</h2>
        </div>
        <div
          className={activeCategory === 'category' ? 'active' : 'not-allowed'}
        >
          <GridFour size={32} weight="fill" />
          <h2>Categoria</h2>
        </div> */}
      </Category>
      <label htmlFor="search">
        <OutlinedInput
          type="text"
          id="search"
          placeholder="Buscar filmes ou Series"
          value={searchTerm}
          onChange={handleSearchChange}
          autoComplete="off"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </label>
      {/* <Typography variant="body1" component="h5">
        Sair
      </Typography> */}
    </Headers>
  )
}
