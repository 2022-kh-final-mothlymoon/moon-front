import styled from "styled-components";

export const STARDIV = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: yellow;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .yellow {
    color: yellow;
  }
`;

export const PLUSBTN = styled.button`
  border: none;
  color: gray;
  background-color: transparent;
`;
