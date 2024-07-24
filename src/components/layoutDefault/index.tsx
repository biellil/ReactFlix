import { SetStateAction, useState, lazy, Suspense } from 'react'
import { LayoutContainer } from './styles'
import { Header } from '../Header'

// Importação dos componentes usando lazy
const Topfilmes = lazy(() => import('../../pages/Topfilmes'))
const Category = lazy(() => import('../../pages/category'))
const Home = lazy(() => import('../../pages/Home'))

export function DefaultLayout() {
  const [selectedCategory, setSelectedCategory] = useState('home')

  const handleCategoryChange = (category: SetStateAction<string>) => {
    setSelectedCategory(category)
  }

  const renderContent = () => {
    switch (selectedCategory) {
      case 'home':
        return <Home />
      case 'popular':
        return <Topfilmes />
      case 'category':
        return <Category />
      default:
        return null
    }
  }

  return (
    <LayoutContainer className="container">
      <Header onCategoryChange={handleCategoryChange} />
      <Suspense fallback={<div>Carregando...</div>}>{renderContent()}</Suspense>
    </LayoutContainer>
  )
}
