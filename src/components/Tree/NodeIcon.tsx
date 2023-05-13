import React from 'react';
import {NodeIconProps} from "../../types";
import {iconsMap} from "../../utils/iconsMap";
import {OTHER} from "../../constants/general";
import {platformColors} from "../../constants/colors";

const NodeIcon: React.FC<NodeIconProps> = ({ type , $hasPermission}) => {
    const Icon = iconsMap[type] === undefined ? iconsMap[OTHER].icon : iconsMap[type].icon
    const color = iconsMap[type] === undefined ? iconsMap[OTHER].color : $hasPermission ? iconsMap[type].color : platformColors.disabled
    return (
        <Icon color={color}/>
    );
}
export default NodeIcon;