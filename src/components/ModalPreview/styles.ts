// src/components/ModalPlay/styles.ts
import { Box, styled, Card } from '@mui/material'

export const ModalStyle = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 75%;
  background: 'background.paper';
  box-shadow: 24;
  padding: 2rem;
  div {
    background: 'background.paper';
    border-radius: 25px;
  }
`
export const CardStyle = styled(Card)`
  height: 75vh;
  display: flex;

  img {
    height: 75vh;
    width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
  }

  .divplay {
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
  display: flex;
  justify-content: space-evenly;
`
