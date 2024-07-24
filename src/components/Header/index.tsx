import React, { useState } from 'react'
import { Fire, House, GridFour } from '@phosphor-icons/react'
import { Category, Headers } from './styles'
import icon from '../../assets/icon.png'
import { OutlinedInput } from '@mui/material'

interface HeaderProps {
  onCategoryChange: (category: string) => void
  onSearchChange: (searchTerm: string) => void
}

export function Header({ onCategoryChange, onSearchChange }: HeaderProps) {
  const [activeCategory, setActiveCategory] = useState<string>('home')
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
          onClick={() => handleCategoryChange('home')}
          className={activeCategory === 'home' ? 'active' : ''}
        >
          <House size={32} weight="fill" />
          <h2>Início</h2>
        </div>
        <div
          onClick={() => handleCategoryChange('popular')}
          className={activeCategory === 'popular' ? 'active' : ''}
        >
          <Fire size={32} weight="fill" />
          <h2>Popular</h2>
        </div>
        <div
          onClick={() => handleCategoryChange('category')}
          className={activeCategory === 'category' ? 'active' : ''}
        >
          <GridFour size={32} weight="fill" />
          <h2>Categoria</h2>
        </div>
      </Category>
      <label htmlFor="search">
        <OutlinedInput
          type="text"
          id="search"
          placeholder="Buscar filmes..."
          value={searchTerm}
          onChange={handleSearchChange}
          autoComplete="off"
          autoFocus
        />
      </label>
    </Headers>
  )
}
