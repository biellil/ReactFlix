import React, { useState } from 'react'
import { Button, Typography, TextField, Box } from '@mui/material'
import { signInWithGoogle, signInWithApple } from '../firebase'
import { LoginContainer, GoogleButton, AppleButton } from './styles'
import { AuthAnimationWrapper } from '../AuthAnimationWrapper'

interface LoginPageProps {
  switchToSignup: () => void
}

const LoginPage = ({ switchToSignup }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  const handleAppleLogin = async () => {
    await signInWithApple()
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    // Lógica de login com email e senha
    console.log('Email:', email)
    console.log('Senha:', password)
  }

  return (
    <AuthAnimationWrapper>
      <LoginContainer className="container">
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Faça login
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Email"
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
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="contained"
              color="primary"
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
            fullWidth
            onClick={handleGoogleLogin}
          >
            Entrar com Google
          </GoogleButton>
          <AppleButton variant="contained" fullWidth onClick={handleAppleLogin}>
            Entrar com Apple
          </AppleButton>
        </div>
        <Button variant="text" onClick={switchToSignup}>
          Não possui conta? Cadastre-se
        </Button>
      </LoginContainer>
    </AuthAnimationWrapper>
  )
}

export default LoginPage
