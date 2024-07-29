import styled from 'styled-components'

export const Headers = styled.header`
  border-bottom: 1px solid #292828;
  padding: 0rem 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: 1rem;

  img {
    display: flex;
  }

  label {
    @media (max-width: 999px) {
      display: flex;
      gap: 0.5rem;
      width: 19vw;
    }
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
      @media (max-width: 999px) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    @media (max-width: 999px) {
      align-items: center;
      font-size: 12.5px;
      gap: 0rem;
    }
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

  @media (max-width: 999px) {
    gap: 0.4rem;
  }
`
