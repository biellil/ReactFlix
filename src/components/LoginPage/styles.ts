import { Button, Container, styled, Box } from '@mui/material'

export const LoginContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 0.5rem;
  width: 90vw;
  max-width: 75rem;
  background-color: rgb(15 15 15 / 0.6);
  margin-top: 5rem;
  margin-right: auto;
  margin-left: auto;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;
  border-radius: 25px;
  display: flex;
  color: white;
`

export const LoginForm = styled(Box)`
  flex-direction: column;
  display: flex;
  align-items: center;

  border-radius: 25px;
  gap: 0.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 45vw;

    button {
      color: white;
      border-radius: 25px;
      margin-bottom: 0.5rem;
      background-color: #874587;

      &:hover {
        transform: scale(1.05);
      }
    }

    input {
      padding: 1rem;
    }

    fieldset {
      border-radius: 25px;
      left: -8px;
    }
  }
`

export const GoogleButton = styled(Button)`
  color: white;
  margin: 0.5rem;
  border-radius: 25px;

  background-color: #874587;
  &:hover {
    transform: scale(1.05);
  }
`

export const AppleButton = styled(Button)`
  background-color: #000;
  color: white;
  border-radius: 25px;
  background-color: #874587;
  &:hover {
    transform: scale(1.05);
  }
`
