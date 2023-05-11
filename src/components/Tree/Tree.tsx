import React, {useState} from 'react';
import styled from 'styled-components';
import { MdOutlineExpandMore, MdExpandLess } from "react-icons/md";
import {CiCircleMore} from "react-icons/ci";

import {Page, TreeNodeData, TreeNodeProps, TreeProps} from "../../types";
import NodeIcon from "./NodeIcon";
import {platformColors} from "../../constants/colors";
import NodeText from "./NodeText";
import {PAGE_SIZE} from "../../constants/general";
import {databaseService} from "../../api/dbApi";
import Tooltip from "../Tooltip";

const NestedNode = styled.div`
  margin-left: 30px;
`;

const TreeNode = styled.div<TreeNodeProps>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-bottom: 1px solid #eee;
  cursor: ${props =>
          true ? 'pointer' : 'default'};
  color: ${props =>
          props.$hasPermission ? '#333' : `${platformColors.disabled}`};
  &:hover {
     background-color: ${props =>
            props.$hasPermission && props.$hasChildren ? '#f2f2f2' : 'transparent'};
   }
`;

const EmptySpace = styled.div`
  width: 1rem;
  height: 1rem;
`;

const Details = styled.div`
  display: flex;
  margin-left: 4px;
  align-items: center;
`;

const MoreButton = styled.button`
  padding-top: 10px;
  color: ${platformColors.mint};
  border: none;
  background-color: unset;
  &:hover {
    cursor: pointer;
  }
`;

const Tree: React.FC<TreeProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1)
    const [children, setChildren] = useState<Page<TreeNodeData>>({items: [], total: 0})


    const toggleOpen = () => {
        console.log("clicked Open===>")
        setIsOpen(!isOpen);
        const fetchNodeData = async () => {
            const queryParams = {
                path: "",
                page: page,
                pageSize: PAGE_SIZE
            }
            console.log("Tree: now in fetching page:", page)
            console.log("Tree: queryParams are: ", queryParams)
            try {
                const res = await databaseService.getNodeById(
                    data.id.toString(),
                    data.type,
                    queryParams
                );
                setChildren({items: res.items, total: res.total})
            } catch (err) {
                console.error(err);
            }
        };
        fetchNodeData()
    };
    const onMoreClick = () => {
        console.log("Tree: clicked more in data.id data.label==>", data.id, data.label)
        setPage((prevPage) => prevPage + 1);
    };

    const hasChildren = (children && children.total > 0)
    // const hasChildren = false || (children && children.items && children.items.length > 0)
    const renderNestedChildren = () => {
        if (children && children.items.length > 0) {
            return children.items.map((node:TreeNodeData) => {
                return <Tree key={node.id} data={node}/>;
            });
        }
        return null;
    };
    return (
        <>
            <TreeNode
                $hasPermission={data.hasPermission}
                $hasChildren={hasChildren}
                $isOpen={isOpen}
            >
                {data.hasPermission && hasChildren ? (
                  <>
                    {isOpen ? <MdExpandLess/> : <MdOutlineExpandMore/>}
                  </>
                ):
                <EmptySpace />}
                <Details>
                    <NodeIcon
                        $hasPermission={data.hasPermission}
                        type={data.type}
                    />
                    <NodeText data={data} total={children.total} onExpand={toggleOpen}/>
                    <Tooltip title={"Load more items"}>
                        <MoreButton onClick={onMoreClick}><CiCircleMore/></MoreButton>
                    </Tooltip>
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
