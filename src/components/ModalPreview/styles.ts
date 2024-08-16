// src/components/ModalPlay/styles.ts
import { Box, styled, Card } from '@mui/material'

export const ModalStyle = styled(Box)`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: 'background.paper';
  box-shadow: 24px;
  padding: 2rem;

  > div {
    background: 'background.paper';
    height: 75vh;
    width: 90vw;
    max-width: 75rem;
  }

  .Rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 999px) {
    > div {
      height: 65vh;
    }
  }
  @media (max-width: 768px) {
    top: 50%;
    left: 50%;
    > div {
      width: 70vw;
      height: 70vh;
      max-width: 70rem;
    }
  }
`
export const CardStyle = styled(Card)`
  height: 70vh;
  width: 35vw;
  display: flex;
  img {
    height: 80vh;
    width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      height: 75vh;
      width: 35vw;
    }
    @media (max-width: 999px) {
      width: 30vw;
    }
  }

  svg {
  }

  .divplay {
    margin-top: 9rem;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 1.1rem;
    button {
      gap: 0.5rem;
    }
    @media (max-width: 999px) {
      margin-top: 1rem;
    }
    @media (max-width: 768px) {
      margin-top: 5rem;
    }
  }
  h5 {
    @media (max-width: 999px) {
      font-size: 0.8rem;
    }
  }

  h6 {
    @media (max-width: 999px) {
      font-size: 0.8rem;
    }
  }
`
export const CardContent = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`
export const RatingDiv = styled(Box)`
  /* display: flex;
  justify-content: space-evenly; */
`
