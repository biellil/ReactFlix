import React, { useState } from 'react'
import { Button, Typography, TextField, Box } from '@mui/material'
import { signInWithGoogle, signInWithApple } from '../firebase'
import { SignupContainer, GoogleButton, AppleButton } from './styles'
import { AuthAnimationWrapper } from '../AuthAnimationWrapper'

interface SignupPageProps {
  switchToLogin: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const SignupPage = ({ switchToLogin }: SignupPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleSignup = async () => {
    await signInWithGoogle()
  }

  const handleAppleSignup = async () => {
    await signInWithApple()
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSignup = () => {
    // Lógica de Signupcom email e senha
    console.log('Email:', email)
    console.log('Senha:', password)
  }

  return (
    <AuthAnimationWrapper>
      <SignupContainer className="container">
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Crie uma conta
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
              onClick={handleSignup}
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
            onClick={handleGoogleSignup}
          >
            Entrar com Google
          </GoogleButton>
          <AppleButton
            variant="contained"
            fullWidth
            onClick={handleAppleSignup}
          >
            Entrar com Apple
          </AppleButton>
        </div>
        <Button variant="text" onClick={switchToLogin}>
          Já estou cadastrado
        </Button>
      </SignupContainer>
    </AuthAnimationWrapper>
  )
}

export default SignupPage
