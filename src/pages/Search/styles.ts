import styled from 'styled-components'

export const SearchContainer = styled.div`
  flex-direction: column;
  max-width: 62.1vw;
  @media (max-width: 999px) {
    max-width: 89vw;
    padding: 1rem;
  }
  padding: 1rem;
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
`

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10vw, 1fr));
  gap: 1.5rem;

  padding: 0.5rem;
  @media (max-width: 999px) {
    grid-template-columns: repeat(auto-fill, minmax(16vw, 1fr));
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 0fr);
    grid-template-rows: repeat(4, 100px);
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`

export const ResultCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 12rem;
  display: flex;
  align-items: end;
  justify-content: center;
  @media (max-width: 999px) {
    width: 10rem;
  }
  &:hover {
    border: 1px solid red;
    transform: scale(1.05);
    color: red;
  }
  @media (max-width: 768px) {
    width: 9rem;
    height: 5rem;
  }
`

export const ResultBanner = styled.img`
  width: 100%;
  height: 100%;
`

export const ResultTitle = styled.h3`
  position: absolute;
  font-size: 0.9rem;
  padding: 0 1rem;
  z-index: 10;
  display: flex;
  text-align: center;
  justify-content: center;
  width: 12rem;
  text-overflow: ellipsis;
  word-wrap: break-word;
  @media (max-width: 768px) {
    width: 9rem;
  }
`
