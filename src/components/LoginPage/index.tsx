import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography, TextField, Box } from '@mui/material'
import { signInWithEmailAndPassword, signInWithGoogle } from '../firebase'
import { LoginContainer, GoogleButton, LoginForm } from './styles'
import { AuthAnimationWrapper } from '../AuthAnimationWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

// Esquema de validação usando Zod
const loginSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginPageProps {
  switchToSignup: () => void
}

const LoginPage = ({ switchToSignup }: LoginPageProps) => {
  const navigate = useNavigate()
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch (error: any) {
      setErrorMessages((prev) => [
        ...prev,
        'Erro ao fazer login com Google: ' + error.message,
      ])
    }
  }

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Aqui deve ser signInWithEmailAndPassword para login
      await signInWithEmailAndPassword(data.email, data.password)
      navigate('/')
    } catch (error: any) {
      let message = 'Erro ao fazer login'
      if (error.code === 'auth/user-not-found') {
        message =
          'Usuário não encontrado. Verifique seu email e tente novamente.'
      } else if (error.code === 'auth/wrong-password') {
        message = 'Senha incorreta. Tente novamente.'
      } else if (error.code === 'auth/invalid-email') {
        message = 'O email fornecido é inválido.'
      } else if (error.code === 'auth/invalid-credentia') {
        message = 'Verifique o e-mail e a senha e tente novamente.'
      } else {
        message = 'Verifique o e-mail e a senha e tente novamente.'
      }
      setErrorMessages((prev) => [...prev, message])
    }
  }

  return (
    <AuthAnimationWrapper>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h1" gutterBottom>
            Faça login
          </Typography>

          {/* Renderizar lista de mensagens de erro */}
          {errorMessages.length > 0 && (
            <Box marginBottom={2}>
              {errorMessages.map((errorMessage, index) => (
                <Typography key={index} color="error" variant="body1">
                  {errorMessage}
                </Typography>
              ))}
            </Box>
          )}

          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Email"
              color="secondary"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              color="secondary"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
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
          <Button variant="text" color="secondary" onClick={switchToSignup}>
            Não possui conta? Cadastre-se
          </Button>
        </LoginForm>
      </LoginContainer>
    </AuthAnimationWrapper>
  )
}

export default LoginPage
