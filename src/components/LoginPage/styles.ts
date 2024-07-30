import { Button, Container, styled } from '@mui/material'

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 0.5rem;
  div {
    flex-direction: column;
    display: flex;
    align-items: center;
    width: 45vw;
    border-radius: 25px;
    gap: 0.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    button {
      border-radius: 25px;
      margin-bottom: 0.5rem;
    }
    input {
      padding: 1rem;
    }
    fieldset {
      left: -8px;
    }
  }
`

export const GoogleButton = styled(Button)`
  background-color: #4285f4;
  color: white;
  margin: 0.5rem;
  border-radius: 25px;
  &:hover {
    background-color: #357ae8;
  }
`

export const AppleButton = styled(Button)`
  background-color: #000;
  color: white;
  border-radius: 25px;

  &:hover {
    background-color: #333;
  }
`
