import React from 'react';
import {NodeTextProps} from "../../types";

const NodeText: React.FC<NodeTextProps> = ({data, total}) =>{
    const text = `${data.type}-id:${data.id}-${data.label} `
    const numberOfItems = total && total !==0 ? total : "no "
    const items = `[ ${numberOfItems} items]`
    return (
        <div style={{marginLeft: "4px", cursor: 'default'}}>
            {text}
            <span style={{fontSize: "10px", color:"#999"}}>
                {items}
            </span>
        </div>
    );
}

export default NodeText;