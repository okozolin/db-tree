export interface TreeNodeProps {
    $hasPermission: boolean;
    $isSelected: boolean;
}

export interface TreeProps {
    data: TreeNodeData[];
}

export interface TreeNodeData {
    id: number;
    label: string;
    type: string;
    hasPermission: boolean;
    // isSelected: boolean;
    children?: TreeNodeData[];
}
