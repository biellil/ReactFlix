import styled from 'styled-components'

export const Headers = styled.header`
  border-right: 1px solid #292828;
  padding: 0rem 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;

  img {
    height: 25px;
    width: 100%;
    display: flex;

    @media (max-width: 1024px) {
      width: 5.5rem;
    }
  }

  label {
    display: none;
    div {
      border-radius: 25px;
    }
    @media (max-width: 1024px) {
      display: flex;
      gap: 0.5rem;
      width: 19vw;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    border-bottom: 1px solid #292828;
  }
`

export const Category = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  div {
    cursor: pointer;
    display: flex;
    gap: 0.2rem;
    transition: 0.5s;
    svg {
      width: 2rem;
      height: 2rem;
      @media screen and (min-width: 1920px) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    @media screen and (min-width: 1920px) {
      align-items: center;
      font-size: 12.5px;
      gap: 0rem;
    }
    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (min-width: 1024px) {
    flex-direction: column;
  }
  .active {
    color: red;
    &:hover {
      transform: scale(1.05);
    }
  }
  .not-allowed {
    color: gray;
    cursor: not-allowed;
  }

  @media screen and (min-width: 1920px) {
    gap: 0.4rem;
  }
`
export const DivSignOut = styled.div`
  cursor: pointer;
  display: flex;
  gap: 0.2rem;
  transition: 0.5s;
  svg {
    width: 2rem;
    height: 2rem;
    @media screen and (min-width: 1920px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  @media screen and (min-width: 1920px) {
    align-items: center;
    font-size: 12.5px;
    gap: 0rem;
  }
  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  &:hover {
    color: red;
    transform: scale(1.05);
  }
`
