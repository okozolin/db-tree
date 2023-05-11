import React from 'react';
import {NodeTextProps} from "../../types";

const NodeText: React.FC<NodeTextProps> = ({data, total, onExpand}) =>{
    const text = `${data.type}-id:${data.id}-${data.label} `
    const numberOfItems = total && total !==0 ? total : "no "
    // const numberOfItems = data.children && data.children.length !==0 ? data.children.length : "no "
    const items = `[ ${numberOfItems} items]`
    return (
        <div style={{marginLeft: "4px"}} onClick={onExpand}>
            {text}
            <span style={{fontSize: "10px", color:"#999"}}>
                {items}
            </span>
        </div>
    );
}

export default NodeText;