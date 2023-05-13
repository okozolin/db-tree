import {TreeNodeData} from "../types";
import {PAGE_SIZE} from "../constants/general";

export const getCurrentPath = (data : TreeNodeData, path:string) => {
    return path + `${data.type}Id=${data.id};`
}

export const checkMorePages = (data: TreeNodeData, page: number) => {
    return data.childrenTotal && (page < Math.ceil(data.childrenTotal / PAGE_SIZE) )
}