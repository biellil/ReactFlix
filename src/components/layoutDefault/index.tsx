import { useState, lazy, Suspense } from 'react'
import { LayoutContainer } from './styles'
import { Header } from '../Header'
// import { AdSenseAd } from '../AdSenseAd'

// Importação dos componentes usando lazy
const Topfilmes = lazy(() => import('../../pages/Topfilmes'))
// const Category = lazy(() => import('../../pages/category'))
const TopSeries = lazy(() => import('../../pages/TopSeries'))
const SearchComponent = lazy(() => import('../../pages/Search'))
export default function DefaultLayout() {
  const [selectedCategory, setSelectedCategory] = useState('Filmes')
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
      case 'Filmes':
        return <Topfilmes />
      case 'Series':
        return <TopSeries />
      // case 'category':
      //   return <Category />
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
      {/* <AdSenseAd
        adClient="ca-pub-4542878322637122"
        adFormat="auto"
        adSlot="8986190269"
      /> */}
    </LayoutContainer>
  )
}
