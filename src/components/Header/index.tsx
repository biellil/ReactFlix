import React, { useState } from 'react'
import { FilmReel, FilmScript } from '@phosphor-icons/react'
import { Category, Headers } from './styles'
import icon from '../../assets/icon.png'
import { SearchInput } from '../SearchInput'

interface HeaderProps {
  onCategoryChange: (category: string) => void
  onSearchChange: (searchTerm: string) => void
  searchTerm: string
}

export function Header({
  onCategoryChange,
  onSearchChange,
  searchTerm,
}: HeaderProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Filmes')

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
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
          className={activeCategory === 'Series' ? 'active' : ''}
        >
          <FilmScript size={32} weight="fill" />
          <h2>Series</h2>
        </div>
      </Category>
      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </Headers>
  )
}
