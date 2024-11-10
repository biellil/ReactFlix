import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography, TextField, Box } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { signInWithGoogle, signUpWithEmailAndPassword } from '../firebase'
import { SignupContainer, GoogleButton, SignupPageForm } from './styles'
import { AuthAnimationWrapper } from '../AuthAnimationWrapper'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

// Esquema de validação usando Zod
const signupSchema = z
  .object({
    email: z.string().email('Insira um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

interface SignupPageProps {
  switchToLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SignupPage = ({ switchToLogin }: SignupPageProps) => {
  const navigate = useNavigate()

  // Hook do React Hook Form com validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error)
      //alert('Erro ao fazer login com Google: ' + error.message)
    }
  }

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signUpWithEmailAndPassword(data.email, data.password)
      navigate('/')
    } catch (error: any) {
     // alert('Erro ao criar conta: ' + error.message)
    }
  }

  return (
    <AuthAnimationWrapper>
      <SignupContainer>
        <SignupPageForm onSubmit={handleSubmit(onSubmit)}>
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
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              color="secondary"
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirmar Senha"
              type="password"
              variant="outlined"
              fullWidth
              color="secondary"
              margin="normal"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button variant="contained" color="secondary" fullWidth type="submit">
              Criar conta
            </Button>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" marginY={2}>
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
