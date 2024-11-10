import { useState } from 'react'
import { FilmReel, FilmScript, SignOut } from '@phosphor-icons/react'
import { Category, DivSignOut, Headers } from './styles'
import icon from '../../assets/icon.png'
import { SearchInput } from '../SearchInput'
import { logout } from '../firebase'

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

  const handleSignOut = async () => {
    const success = await logout() // Chamando a função de logout

    if (success) {
      // Redireciona para a página inicial ou de login caso o logout tenha sido bem-sucedido
      window.location.href = '/'
    } else {
      // Exibe uma mensagem de erro caso o logout falhe
      console.error('Erro ao fazer logout')
    }
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
      <DivSignOut>
        <SignOut size={30} onClick={handleSignOut} />
      </DivSignOut>
      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </Headers>
  )
}
