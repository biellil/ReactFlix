// DefaultLayout.tsx
import { useState, lazy, Suspense } from 'react'
import { LayoutContainer } from './styles'
import { Header } from '../Header'
import { Loading } from '../Loading'
import { AdSenseAd } from '../AdSenseAd'
import { SearchInput } from '../SearchInput' // Importa o novo componente

const Topfilmes = lazy(() => import('../../pages/Topfilmes'))
const TopSeries = lazy(() => import('../../pages/TopSeries'))
const SearchComponent = lazy(() => import('../../pages/Search'))

export default function DefaultLayout() {
  const [selectedCategory, setSelectedCategory] = useState('Filmes')
  const [searchTerm, setSearchTerm] = useState('')

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchTerm('')
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    if (term.trim() !== '') {
      setSelectedCategory('Search')
    }
  }

  const renderContent = () => {
    switch (selectedCategory) {
      case 'Filmes':
        return (
          <Topfilmes
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        )
      case 'Series':
        return (
          <TopSeries
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        )
      case 'Search':
        return <SearchComponent searchTerm={searchTerm} />
      default:
        return null
    }
  }

  return (
    <>
      <LayoutContainer className="container">
        <Header onCategoryChange={handleCategoryChange} />
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
      </LayoutContainer>
      <AdSenseAd />
    </>
  )
}
