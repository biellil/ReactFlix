import styled from 'styled-components'

export const HomeContainer = styled.section`
  width: 89vw;
  padding: 2rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 89vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (min-width: 1920px) {
    max-width: 89vw;
    padding: 1rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }
`
export const MoviesGrid = styled.div`
  width: 75vw;
  display: grid;
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

export const MovieCard = styled.div`
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

export const MovieBanner = styled.img`
  width: 100%;
  height: 100%;
`

export const MovieTitle = styled.h3`
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
