import React from "react";
import { IconType } from 'react-icons';

export interface TreeNodeProps {
    $hasPermission: boolean;
    $hasChildren: boolean | undefined;
    $isOpen: boolean;
}

export interface TreeProps {
    data: TreeNodeData;
}

export interface TreeNodeData {
    id: number;
    label: string;
    type: string;
    hasPermission: boolean;
    // children?: TreeNodeData[];
}
export interface NodeIconProps {
    type: string;
    $hasPermission: boolean;
}

export interface IconMapItem {
    type: string;
    icon: IconType;
    color: string;
}

export interface IconMapProps {
    [key: string]: IconMapItem;
}

export interface NodeTextProps {
    data: TreeNodeData;
    total: number;
    onExpand: ()=> void
}
export interface Page<T> {
    items: T[];
    total: number;
}
export interface QueryParams {
    path:string;
    page:number;
    pageSize:number
}
export interface TooltipProps {
    title: string;
    children: React.ReactNode;
}
