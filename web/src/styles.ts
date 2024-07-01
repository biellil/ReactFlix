import styled from 'styled-components'

export const MainHero = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgb(15 15 15 / 0.84);
  height: 100vh;
  width: 100vw;
  .container {
    width: 100%;
    max-width: 70rem;

    margin-top: 5rem;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    .container {
      width: 90%;
      max-width: 68rem;
    }
  }
`
