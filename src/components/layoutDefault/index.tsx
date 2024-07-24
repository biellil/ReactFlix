import { SetStateAction, useState } from 'react'
import { LayoutContainer } from './styles'
import { Header } from '../Header'
import { Topfilmes } from '../../pages/Topfilmes'
import { Category } from '../../pages/category'
import { Home } from '../../pages/Home'
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
      {renderContent()}
    </LayoutContainer>
  )
}
