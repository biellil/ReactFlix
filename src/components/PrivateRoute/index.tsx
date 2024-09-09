import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user) // Verifica se o usuário está logado
    })
    return () => unsubscribe()
  }, [])

  if (isAuthenticated === null) {
    // Exibe um indicador de carregamento enquanto verifica a autenticação
    return <div>Loading...</div>
  }

  // Redireciona para a página inicial se não estiver autenticado
  return isAuthenticated ? element : <Navigate to="/Auth" replace />
}

export default PrivateRoute
