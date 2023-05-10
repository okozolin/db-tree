//----------------------------------------------------------------
//        API for DB
//----------------------------------------------------------------
//  the api is of the format:
//     `${BASE_URL}/${type}/${id}?${queryParams}
//  except for the first one which is just
//      `${BASE_URL}`
//
// e.g.queryParams:
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
import {Page, TreeNodeData} from "../types";
import {PAGE_SIZE} from "../constants/general";



export class DatabaseService {
    private baseUrl = 'http://localhost:3000/api/db';

    //no need for pagination here, assuming the amount of data is not large
    async getTree(queryParams:string = `path=''&page=1&pageSize=${PAGE_SIZE}`): Promise<TreeNodeData[]> {
        const response: AxiosResponse<TreeNodeData[]> = await axios.get(`${this.baseUrl}`, {params: `${queryParams}`});
        return response.data;
    }
    async getConnections(queryParams:string = `path=''&page=1&pageSize=${PAGE_SIZE}`): Promise<TreeNodeData[]> {
        const response: AxiosResponse<TreeNodeData[]> = await axios.get(`${this.baseUrl}/connections`, {params: `${queryParams}`});
        return response.data;
    }

    async getNodeById(id: string, type: string, queryParams:string = `path=''&page=1&pageSize=${PAGE_SIZE}`): Promise<TreeNodeData> {
        const response: AxiosResponse<TreeNodeData> = await axios.get(`${this.baseUrl}/${type}s/${id}`, {params: `${queryParams}`});
        return response.data;
    }

    async getDatabases(connectionId: string, page: number, pageSize: number): Promise<Page<TreeNodeData>> {
        const response: AxiosResponse<Page<TreeNodeData>> = await axios.get(`${this.baseUrl}/databases`, {
            params: {connectionId, page, pageSize},
        });
        return response.data;
    }

    async getDatabaseById(id: string): Promise<TreeNodeData> {
        const response: AxiosResponse<TreeNodeData> = await axios.get(`${this.baseUrl}/databases/${id}`);
        return response.data;
    }

    async getSchemas(connectionId: string, databaseId: string, page: number, pageSize: number): Promise<Page<TreeNodeData>> {
        const response: AxiosResponse<Page<TreeNodeData>> = await axios.get(`${this.baseUrl}/schemas`, {
            params: {connectionId, databaseId, page, pageSize},
        });
        return response.data;
    }

    async getSchemaById(id: string): Promise<TreeNodeData> {
        const response: AxiosResponse<TreeNodeData> = await axios.get(`${this.baseUrl}/schemas/${id}`);
        return response.data;
    }

    async getTables(connectionId: string, databaseId: string, schemaId: string, page: number, pageSize: number): Promise<Page<TreeNodeData>> {
        const response: AxiosResponse<Page<TreeNodeData>> = await axios.get(`${this.baseUrl}/tables`, {
            params: {connectionId, databaseId, schemaId, page, pageSize},
        });
        return response.data;
    }

    async getTableById(id: string): Promise<TreeNodeData> {
        const response: AxiosResponse<TreeNodeData> = await axios.get(`${this.baseUrl}/tables/${id}`);
        return response.data;
    }

    async getColumns(connectionId: string, databaseId: string, schemaId: string, tableId: string, page: number, pageSize: number): Promise<Page<TreeNodeData>> {
        const response: AxiosResponse<Page<TreeNodeData>> = await axios.get(`${this.baseUrl}/columns`, {
            params: {connectionId, databaseId, schemaId, tableId, page, pageSize},
        });
        return response.data;
    }

    async getColumnById(id: string): Promise<TreeNodeData> {
        const response: AxiosResponse<TreeNodeData> = await axios.get(`${this.baseUrl}/columns/${id}`);
        return response.data;
    }
}
