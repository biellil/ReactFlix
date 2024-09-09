import React, { useState } from 'react'
import { Button, Typography, TextField, Box } from '@mui/material'
import { signInWithGoogle, signUpWithEmailAndPassword } from '../firebase'
import { LoginContainer, GoogleButton, LoginForm } from './styles'
import { AuthAnimationWrapper } from '../AuthAnimationWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom' // Importe o useNavigate

interface LoginPageProps {
  switchToSignup: () => void
}

const LoginPage = ({ switchToSignup }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      // Redirecionar após login com Google
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error)
      alert('Erro ao fazer login com Google: ' + error.message)
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    try {
      await signUpWithEmailAndPassword(email, password)
      // Redirecionar para rota privada após login bem-sucedido
      navigate('/')
    } catch (error: any) {
      // console.error('Erro ao fazer login:', error)
      alert('Erro ao fazer login: ' + error.message)
    }
  }

  return (
    <AuthAnimationWrapper>
      <LoginContainer>
        <LoginForm>
          <Typography variant="h4" component="h1" gutterBottom>
            Faça login
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Email"
              color="secondary"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              color="secondary"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="secondary"
            marginY={2}
          >
            <Box flex={1} height="1px" bgcolor="white" />
            <Box paddingX={2}>
              <Typography variant="body1" color="textSecondary">
                ou
              </Typography>
            </Box>
            <Box flex={1} height="1px" bgcolor="white" />
          </Box>
          <GoogleButton
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
          >
            Entrar com Google
          </GoogleButton>
          {/* Descomente se tiver suporte para login com Apple
          <AppleButton
            variant="contained"
            fullWidth
            onClick={handleAppleLogin}
            startIcon={<AppleIcon />}
          >
            Entrar com Apple
          </AppleButton> */}
          <Button variant="text" color="secondary" onClick={switchToSignup}>
            Não possui conta? Cadastre-se
          </Button>
        </LoginForm>
      </LoginContainer>
    </AuthAnimationWrapper>
  )
}

export default LoginPage
