import { useState, lazy, Suspense } from 'react'
import { LayoutContainer } from './styles'
import { Header } from '../Header'

// Importação dos componentes usando lazy
const Topfilmes = lazy(() => import('../../pages/Topfilmes'))
const Category = lazy(() => import('../../pages/category'))
const Home = lazy(() => import('../../pages/Home'))

export function DefaultLayout() {
  const [selectedCategory, setSelectedCategory] = useState('home')

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearchChange = (searchTerm: string) => {
    // Implementar o que deve ser feito quando a pesquisa mudar
    console.log('Pesquisa mudou para:', searchTerm)
  }

  const renderContent = () => {
    switch (selectedCategory) {
      case 'home':
        return <Home />
      case 'popular':
        return <Topfilmes />
      case 'category':
        return <Category />
      case 'Animes':
        return <h1>animes</h1>
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
