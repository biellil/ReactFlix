import styled from 'styled-components'

export const SearchContainer = styled.div`
  width: 89vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  label {
    margin-left: 59rem;
    @media (max-width: 1024px) {
      display: none;
      gap: 0.5rem;
      width: 19vw;
    }
  }

  @media screen and (min-width: 1920px) {
    max-width: 89vw;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const ResultsGrid = styled.div`
  width: 75vw;
  display: grid;
  margin: 2rem 0;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }
`

export const ResultCard = styled.div`
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 11vw;
  display: flex;
  align-items: end;
  justify-content: center;

  @media screen and (min-width: 1920px) {
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
