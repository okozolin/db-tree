import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineExpandMore, MdExpandLess } from "react-icons/md";

import {TreeNodeData, TreeNodeProps, TreeProps} from "../../types";
import NodeIcon from "./NodeIcon";

const NestedNode = styled.div`
  margin-left: 30px;
`;

const TreeNode = styled.div<TreeNodeProps>`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: ${props =>
          props.$hasPermission ? 'pointer' : 'default'};
  color: ${props =>
          props.$hasPermission ? '#333' : 'red'};
  &:hover {
     background-color: ${props =>
            props.$hasPermission ? '#f2f2f2' : 'transparent'};
   }
`;

const EmptySpace = styled.div`
  width: 1rem;
  height: 1rem;
`
const Details = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
`;

const Tree: React.FC<TreeProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const renderNestedChildren = () => {
        if (data.children && data.children.length > 0) {
            return data.children.map((node:TreeNodeData) => {
                return <Tree key={node.id} data={node}/>;
            });
        }
        return null;
    };

    return (
        <>
            <TreeNode
                $hasPermission={data.hasPermission && data.children && data.children.length > 0}
                $isOpen={isOpen}
                onClick={toggleOpen}
            >
                {data.hasPermission && data.children && data.children.length > 0 ? (
                  <>
                    {isOpen ? <MdExpandLess/> : <MdOutlineExpandMore/>}
                  </>
                ):
                <EmptySpace />}

                <Details>
                    <NodeIcon type={data.type} />
                    <div style={{marginLeft: "4px"}}>
                        {data.type}-id:{data.id}-{data.label}
                    </div>
                </Details>
            </TreeNode>
            {data.hasPermission && isOpen &&
              <NestedNode>
                  {renderNestedChildren()}
              </NestedNode>
            }
        </>
    );
};
export default Tree;
