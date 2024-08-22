import styled from 'styled-components'

export const LabelContainer = styled.label`
  position: absolute;
  top: 10%;
  right: 10%;
  div {
    border-radius: 25px;
  }
  @media (max-width: 1024px) {
    position: static;
    display: none;
    gap: 0.5rem;
    width: 19vw;
  }
`
