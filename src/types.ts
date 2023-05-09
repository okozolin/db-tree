import { IconType } from 'react-icons';

export interface TreeNodeProps {
    $hasPermission: boolean | undefined;
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
    children?: TreeNodeData[];
}
export interface NodeIconProps {
    type: string;
}

export interface IconMapItem {
    type: string;
    icon: IconType;
    color: string;
}

export interface IconMapProps {
    [key: string]: IconMapItem;
}