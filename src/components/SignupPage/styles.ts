import { Box, Button, Container, styled } from '@mui/material'

export const SignupContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

export const SignupPageForm = styled(Box)`
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
    color: #874587;
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
      color: #ffffff;
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
