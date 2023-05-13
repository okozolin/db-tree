import React, {useCallback, useState} from 'react';
import { MdOutlineExpandMore } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import {CiCircleMore} from "react-icons/ci";

import {Page, TreeNodeData,TreeProps} from "../../types";
import NodeIcon from "./NodeIcon";
import NodeText from "./NodeText";
import Tooltip from "../Tooltip";
import TreeNode from "./TreeNode";
import { fetchNodeData } from "../../utils/fetch";
import {Details, EmptySpace, MoreButton, NestedNode} from "./Tree.style";
import {checkMorePages, getCurrentPath} from "../../utils/general";


const Tree: React.FC<TreeProps> = ({ data,path }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1)
    const [children, setChildren] = useState<Page<TreeNodeData>>({items: [], total: 0})

    const currentPath = getCurrentPath(data, path)

    const toggleOpen = useCallback(() => {
        !isOpen ? console.log("clicked Open ===>") : console.log("clicked Close ===>")
        setIsOpen(!isOpen);
        if (!isOpen && !children.items.length) {
             fetchNodeData(data, path, page, setChildren)
        }
    },[isOpen, data, path, page]);

    const onMoreClick = () => {
        console.log("Tree: clicked more in data.id data.label==>", data.id, data.label)
        setPage((prevPage) => prevPage + 1);

        if (hasMorePages) {
            fetchNodeData(data, path, page + 1, setChildren)
        }
    };

    const hasChildren = (data && Boolean(data.childrenTotal))
    const hasMorePages = checkMorePages(data, page)

    const renderNestedChildren = () => {
        if (children && children.items.length > 0) {
            return children.items.map((node:TreeNodeData) => {
                return <Tree
                    key={node.id}
                    data={node}
                    path={currentPath}
                />
            });
        }
        return null;
    };

    return (
        <>
            <TreeNode
                hasPermission={data.hasPermission}
                hasChildren={hasChildren}
            >
                {data.hasPermission && data.childrenTotal ? (
                  <div style={{  cursor: data.hasPermission && hasChildren ? 'pointer' : 'default'}} onClick={toggleOpen}>
                    {isOpen ? <BiChevronRight/> : <MdOutlineExpandMore/>}
                  </div>
                ):
                <EmptySpace />
                }
                <Details>
                    <NodeIcon
                        $hasPermission={data.hasPermission}
                        type={data.type}
                    />
                    <NodeText data={data} total={data.childrenTotal || 0}/>
                    {data.hasPermission && data.childrenTotal && isOpen && hasMorePages ? (
                        <Tooltip title={"Load more items"}>
                        <MoreButton onClick={onMoreClick}><CiCircleMore/></MoreButton>
                    </Tooltip>
                    ): null}
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
