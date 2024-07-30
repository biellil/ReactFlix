import { useState, Suspense, lazy } from 'react'
import { Loading } from '../../components/Loading'
import { LoadingContainer } from '../../components/Loading/styles'
// import { Loading } from '../../components/Loading'

const LoginPage = lazy(() => import('../../components/LoginPage'))
const SignupPage = lazy(() => import('../../components/SignupPage'))

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true)

  const switchToSignup = () => {
    setShowLogin(false)
  }

  const switchToLogin = () => {
    setShowLogin(true)
  }

  return (
    <Suspense
      fallback={
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      }
    >
      {showLogin ? (
        <LoginPage switchToSignup={switchToSignup} />
      ) : (
        <SignupPage switchToLogin={switchToLogin} />
      )}
    </Suspense>
  )
}
