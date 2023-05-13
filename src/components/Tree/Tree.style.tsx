import styled from "styled-components";
import {platformColors} from "../../constants/colors";

export const NestedNode = styled.div`
  margin-left: 30px;
`;

export const EmptySpace = styled.div`
  width: 1rem;
  height: 1rem;
`;

export const Details = styled.div`
  display: flex;
  margin-left: 4px;
  align-items: center;
`;

export const MoreButton = styled.button`
  padding-top: 10px;
  color: ${platformColors.mint};
  border: none;
  background-color: unset;
  &:hover {
    cursor: pointer;
  }
`;
