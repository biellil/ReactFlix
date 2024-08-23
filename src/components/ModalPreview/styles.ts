// styles.ts
import { Box, styled, Card } from '@mui/material'

export const ModalStyle = styled(Box)`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background: ${({ theme }) => theme.palette.background.paper}; */
  box-shadow: 24px;
  padding: 2rem;

  > div {
    background: ${({ theme }) => theme.palette.background.paper};
    height: 75vh;
    width: 90vw;
    max-width: 75rem;
  }

  .Rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media screen and (min-width: 1920px) {
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
    height: auto;
    width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      height: 75vh;
      width: 35vw;
    }

    @media screen and (min-width: 1920px) {
      height: 65vh;
      width: 35vw;
    }
  }

  .divplay {
    margin-top: 1rem;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 1rem;
    height: 70vh;

    button {
      gap: 0.5rem;
    }

    @media screen and (min-width: 1920px) {
      margin-top: 1rem;
      justify-content: center;
    }

    @media (max-width: 868px) {
      margin-top: 4rem;
    }
  }

  h5,
  h6 {
    @media screen and (min-width: 1920px) {
      font-size: 0.7rem;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
  }
`

export const CardContent = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  height: auto;
`

export const RatingDiv = styled(Box)`
  /* Aqui, você pode adicionar estilos adicionais se necessário */
`
