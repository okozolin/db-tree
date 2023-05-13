import React from 'react';
import {TreeNodeContainerProps, TreeNodeProps} from "../../types";
import styled from "styled-components";
import {platformColors} from "../../constants/colors";


const TreeNodeContainer = styled.div<TreeNodeContainerProps>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-bottom: 1px solid #eee;
  color: ${props =>
    props.$hasPermission ? '#333' : `${platformColors.disabled}`};
  &:hover {
     background-color: ${props =>
    props.$hasPermission && props.$hasChildren ? '#f2f2f2' : 'transparent'};
   }
`;

const  TreeNode: React.FC<TreeNodeProps> = ({
                        hasPermission,
                        hasChildren,
                        children}) => {
    return (
        <TreeNodeContainer
            $hasPermission={hasPermission}
            $hasChildren={hasChildren}
        >
            {children}
        </TreeNodeContainer>
    );
}

export default TreeNode;