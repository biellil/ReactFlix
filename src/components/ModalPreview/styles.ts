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
    height: 80vh;
    width: 95vw;
    max-width: 75rem;
  }

  .Rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 999px) {
    > div {
      height: 95vh;
    }
  }
  @media (max-width: 768px) {
    top: 50%;
    left: 50%;
    > div {
      width: 75vw;
      height: 75vh;
      max-width: 70rem;
    }
  }
`
export const CardStyle = styled(Card)`
  height: 75vh;
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
  }

  svg {
  }

  .divplay {
    border-radius: 25px;
    position: absolute;
    top: 49%;
    left: 18%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0006;
    width: 5rem;
    height: 5rem;
    cursor: pointer;

    :hover {
      /* border: 1px solid red; */
      transform: scale(1.05);
      background: red;
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
