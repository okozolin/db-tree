import React from 'react';
import {NodeIconProps} from "../../types";
import {iconsMap} from "../../utils/iconsMap";
import {OTHER} from "../../constants/general";

const NodeIcon: React.FC<NodeIconProps> = ({ type }) => {
    const Icon = iconsMap[type] === undefined ? iconsMap[OTHER].icon : iconsMap[type].icon
    const color = iconsMap[type] === undefined ? iconsMap[OTHER].color : iconsMap[type].color
    return (
        <Icon color={color}/>
    );
}
export default NodeIcon;