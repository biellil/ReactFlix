import styled from 'styled-components'

export const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  /* background-color: background.paper; */
  border: 2px solid #000;
  box-shadow: 24;

  p: 4;
`
export const SuperFlixAPI = styled.div`
  width: 60vw;
  height: 60vh;
  iframe {
    width: 60vw;
    height: 60vh;
  }
`
