import styled from "styled-components";

export const STARDIV = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: #ead3b1;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .yellow {
    color: #ead3b1;
  }
`;

export const PLUSBTN = styled.button`
  border: none;
  color: gray;
  background-color: transparent;
`;

export const STARSPAN = styled.span`
  color: #ead3b1;
  font-size: 28px;
`;
