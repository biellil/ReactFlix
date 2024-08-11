import styled from 'styled-components'

export const MainHero = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  .container {
    height: 95vh;
    width: 95vw;
    max-width: 75rem;
    background-color: rgb(15 15 15 / 0.7);
    margin-top: 1.5rem;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    .container {
      width: 80vw;
      max-width: 70rem;
    }
  }
`
