import { useState, lazy, Suspense } from 'react'
import { LayoutContainer } from './styles'
import { Header } from '../Header'
import SearchComponent from '../../pages/Search'

// Importação dos componentes usando lazy
const Topfilmes = lazy(() => import('../../pages/Topfilmes'))
const Category = lazy(() => import('../../pages/category'))
const Home = lazy(() => import('../../pages/Home'))

export function DefaultLayout() {
  const [selectedCategory, setSelectedCategory] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    // Muda a categoria para 'Search' quando o termo de pesquisa é alterado
    setSelectedCategory('Search')
  }

  const renderContent = () => {
    switch (selectedCategory) {
      case 'home':
        return <Home />
      case 'popular':
        return <Topfilmes />
      case 'category':
        return <Category />
      case 'Search':
        return <SearchComponent searchTerm={searchTerm} />
      default:
        return null
    }
  }

  return (
    <LayoutContainer className="container">
      <Header
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <Suspense fallback={<div>Carregando...</div>}>{renderContent()}</Suspense>
    </LayoutContainer>
  )
}
