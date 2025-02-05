import styled from "styled-components";

export const StyledOL = styled.ol`
  counter-reset: item;

  li {
    display: block;

    &:before {
      content: counters(item, ".") ".";
      counter-increment: item;
      padding-right: 10px;
    }
  }
`;
