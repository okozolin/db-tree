//----------------------------------------------------------------
//        API for DB
//----------------------------------------------------------------
//  the api is of the following format which supports any `type` as long as the corresponding end point is defined on server side:
//     `${BASE_URL}/${type}/${id}?${queryParams}`
//  type can be: connection, database, schema, table, column, etc...
//  queryParams should consist of:
//      - path
//      - page
//      - pageSize
//  e.g.queryParams
//      path=${path}&page=${page}&pageSize=${pageSize}
// e.g path:
//      path="connectionId={:connectionId};databaseId={:databaseId};schemaId={:schemaId};tableId={:tableId}"
// e.g page:
//      page=2
// e.g pageSize:
//      pageSize=10
//  e.g. APIs
//  1. 'api/db?path=""&page={:page}&pageSize={:pageSize}
//      or
//  2. 'api/db/connections?path=""&&page={:page}&pageSize={:pageSize}
//  3. 'api/db/connections/:id?path=""&page={:page}&pageSize={:pageSize}
//  4. 'api/db/databases/:id?path="connectionId={:connectionId}"&page={:page}&pageSize={:pageSize}
//  5. 'api/db/schemas/:id?path="connectionId={:connectionId};databaseId={:databaseId}"&page={:page}&pageSize={:pageSize}
//  6. 'api/db/tables/:id?path="connectionId={:connectionId};databaseId={:databaseId};schemaId={:schemaId}"&page={:page}&pageSize={:pageSize}
//  7. 'api/db/columns/:id?path="connectionId={:connectionId};databaseId={:databaseId};schemaId={:schemaId};tableId={:tableId}"&page={:page}&pageSize={:pageSize}

import axios, { AxiosResponse } from 'axios';
import {Page, QueryParams, TreeNodeData} from "../types";
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of axios
export const axiosInstance = axios.create({
    baseURL: 'localhost:3000/api'
});

// Create a new instance of MockAdapter and pass in the axios instance
const mockAdapter = new MockAdapter(axiosInstance);

// Configure the mock adapter to intercept GET requests to the /api/posts endpoint
//it's here for mocking purposes
mockAdapter.onGet('/db',{params: {
        path: "" ,
        page: 1,
        pageSize: 2
    }}).reply(200, {
    items: [
        {
            "id": 1,
            "label": "Node 1",
            "type": "connection",
            "hasPermission": true
        },
        {
            "id": 25,
            "label": "Node 25",
            "type": "connection",
            "hasPermission": true
        }
    ],
    total: 3
});

class DatabaseService {
    private baseUrl = '/db';

    async getTree(queryParams: QueryParams): Promise<Page<TreeNodeData>> {
        console.log("*** databaseService.getTree request URL==>",
            `${this.baseUrl}?path=${queryParams.path}&page=${queryParams.page}&pageSize=${queryParams.pageSize}`)

        const response: AxiosResponse<Page<TreeNodeData>> = await axiosInstance.get(`${this.baseUrl}`,
            {params: {
                path: queryParams.path ,
                page: queryParams.page,
                pageSize: queryParams.pageSize
            }});
        return response.data;
    }

    async getNodeById(id: string, type: string, queryParams: QueryParams): Promise<Page<TreeNodeData>> {
        console.log("*** databaseService.getNodeById request URL==>",
            `${this.baseUrl}/${type}s/${id}?path=${queryParams.path}&page=${queryParams.page}&pageSize=${queryParams.pageSize}`)

        const response: AxiosResponse<Page<TreeNodeData>> = await axiosInstance.get(`${this.baseUrl}/${type}s/${id}`,
            {params: {
                    path: queryParams.path ,
                    page: queryParams.page,
                    pageSize: queryParams.pageSize
                }});
        return response.data;
    }
}

export const databaseService = new DatabaseService()
