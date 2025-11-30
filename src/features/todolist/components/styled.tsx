import styled from "styled-components";

export const TodoTable = styled.table`
  margin: 20px 30px;
  width: 100%;
  border-collapse: collapse;
`;

export const TodoCol = styled.td`
  text-align: center;
`;

export const Input = styled.input`
  padding: 8px;
`;

export const Button = styled.button`
  --primary-color: gray;
  --secondary-color: white;

  background: transparent;
  border-radius: 3px;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: var(--secondary-color);
  display: inline-block;
  transition: all 200ms ease-in-out;
  padding: 8px;

  &:hover {
    filter: brightness(0.85);
  }
`;

export const Check = styled.input`
  width: 20px;
  height: 20px;
`;
