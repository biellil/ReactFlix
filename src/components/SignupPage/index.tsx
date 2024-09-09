import React, { useState } from 'react'
import { Button, Typography, TextField, Box } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { signInWithGoogle, signUpWithEmailAndPassword } from '../firebase'
import { SignupContainer, GoogleButton, SignupPageForm } from './styles'
import { AuthAnimationWrapper } from '../AuthAnimationWrapper'
import { useNavigate } from 'react-router-dom'

interface SignupPageProps {
  switchToLogin: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const SignupPage = ({ switchToLogin }: SignupPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate() // Use o useNavigate para redirecionar

  const handleGoogleSignup = async () => {
    await signInWithGoogle()
    navigate('/') // Redirecionar após login com Google
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value)
  }

  // Função de cadastro
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    try {
      const user = await signUpWithEmailAndPassword(email, password)
      // console.log('Usuário criado com sucesso:', user)

      // Redirecionar para a rota privada após criar conta com sucesso
      navigate('/')
    } catch (error: any) {
      // console.error('Erro ao criar conta:', error)
      alert('Erro ao criar conta: ' + error.message)
    }
  }

  return (
    <AuthAnimationWrapper>
      <SignupContainer>
        <SignupPageForm>
          <Typography variant="h4" component="h1" gutterBottom>
            Crie uma conta
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              color="secondary"
              margin="normal"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              color="secondary"
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Confirmar Senha"
              type="password"
              variant="outlined"
              color="secondary"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSignup}
            >
              Criar conta
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
            color="secondary"
            onClick={handleGoogleSignup}
            startIcon={<GoogleIcon />}
          >
            Criar conta com Google
          </GoogleButton>
        </SignupPageForm>
        <Button variant="text" color="secondary" onClick={switchToLogin}>
          Já tem uma conta? Faça login
        </Button>
      </SignupContainer>
    </AuthAnimationWrapper>
  )
}

export default SignupPage
