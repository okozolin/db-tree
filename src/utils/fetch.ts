import React from 'react';
import {PAGE_SIZE} from "../constants/general";
import {databaseService} from "../api/dbApi";
import {Page, TreeNodeData} from "../types";

export const fetchTree = async (page:number, setData:React.Dispatch<React.SetStateAction<Page<TreeNodeData>>>) => {
    const queryParams = {
        path: '',
        page: page,
        pageSize: PAGE_SIZE
    }
    console.log("App: now fetching page:", page)
    console.log("App: queryParams are: ", queryParams)
    try {
        const res = await databaseService.getTree(queryParams);
        console.log("App: response==>", res)
        setData({items:res.items, total: res.total})
    } catch (err) {
        console.error(err);
    }
};
