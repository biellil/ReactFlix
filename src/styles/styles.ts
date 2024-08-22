import styled from 'styled-components'

export const MainHero = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 99vh;
  width: 99vw;
  .container {
    height: 99vh;
    width: 99vw;
    background-color: rgb(15 15 15 / 0.7);
    border-radius: 25px;
    gap: 2rem;
    display: flex;
  }
  @media screen and (min-width: 1920px) {
    .container {
      height: 95vh;
    }
  }
  @media (max-width: 1024px) {
    justify-content: start;
    flex-direction: column;
    .container {
      width: 95vw;
      max-width: 75rem;
      width: 82vw;
      max-width: 70rem;
      margin-top: 1.5rem;
      margin-right: auto;
      margin-left: auto;
      padding: 1rem 0.5rem;
      margin-bottom: 1rem;
      flex-direction: column;
    }
  }
`
