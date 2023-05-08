import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineExpandMore, MdExpandLess } from "react-icons/md";
interface TreeNodeProps {
    hasPermission: boolean;
    isSelected: boolean;
}

const TreeNode = styled.div<TreeNodeProps>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: ${({ hasPermission }) => (hasPermission ? 'pointer' : 'default')};
  color: ${({ hasPermission }) => (hasPermission ? '#333' : '#999')};
  background-color: ${({ isSelected }) => (isSelected ? '#eee' : 'transparent')};

  &:hover {
    background-color: ${({ hasPermission }) => (hasPermission ? '#f2f2f2' : 'transparent')};
  }
`;

interface TreeProps {
    data: TreeNodeData[];
}

interface TreeNodeData {
    id: string;
    label: string;
    type: string;
    hasPermission: boolean;
    isSelected: boolean;
    children?: TreeNodeData[];
}

const Tree = ({ data }: TreeProps) => {
    const renderTreeNode = (node: TreeNodeData) => (
        <>
            <TreeNode
                key={node.id}
                hasPermission={node.hasPermission}
                isSelected={node.isSelected}
            >
                {node.label}
            </TreeNode>
            {node.children && (
                <Tree data={node.children} />
            )}
        </>
    );

    return (
        <>
            {data.map(renderTreeNode)}
        </>
    );
};
