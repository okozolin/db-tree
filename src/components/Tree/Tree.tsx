import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineExpandMore, MdExpandLess } from "react-icons/md";

import {TreeNodeData, TreeNodeProps, TreeProps} from "../../types";

const TreeNode = styled.div<TreeNodeProps>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: ${props =>
          props.$hasPermission ? 'pointer' : 'default'};
  color: ${props => 
          props.$hasPermission ? '#333' : '#999'};
  background-color: ${props => 
          props.$isSelected ? '#eee' : 'transparent'};

  &:hover {
    background-color: ${props => 
            props.$hasPermission ? '#f2f2f2' : 'transparent'};
  }
`;
    // background-color: ${({ hasPermission }) => (hasPermission ? '#f2f2f2' : 'transparent')};
// cursor: ${({ hasPermission }) => (hasPermission ? 'pointer' : 'default')};
// color: ${({ hasPermission }) => (hasPermission ? '#333' : '#999')};
// background-color: ${({ isSelected }) => (isSelected ? '#eee' : 'transparent')};

const NestedNode = styled.div`
  margin-left: 30px;
`;

const Tree: React.FC<TreeProps> = ({ data }: TreeProps) => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleOpen = () => {
        setIsSelected(!isSelected);
    };
    const renderTreeNode = (node: TreeNodeData, index: number) => (
        <div key={index}>
            <TreeNode
                key={node.id}
                $hasPermission={node.hasPermission}
                $isSelected={isSelected}
                onClick={toggleOpen}
            >
                {isSelected ? <MdExpandLess /> : <MdOutlineExpandMore/>}
                {node.label}
            </TreeNode>
            {node.children && isSelected && (
                <NestedNode>
                    <Tree key={node.label} data={node.children} />
                </NestedNode>
            )}
        </div>
    );

    return (
        <>
            {data.map(renderTreeNode)}
        </>
    );
};

export default Tree;