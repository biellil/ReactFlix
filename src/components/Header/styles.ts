import styled from 'styled-components'

export const Headers = styled.header`
  border-bottom: 1px solid #292828;
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: 1rem;

  img {
  }
`
export const Category = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  div {
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    transition: 0.5s;
  }
  .active {
    color: red;
    &:hover {
      transform: scale(1.05);
    }
  }
`
