//----------------------------------------------------------------
//        API for DB
//----------------------------------------------------------------
//  the api is of the following format which supports any `type` as long as the corresponding end point is defined on server side:
//     `${BASE_URL}/${type}/${id}?${queryParams}`
//  type can be: db, connection, database, schema, table, column, etc...
//  queryParams should consist of:
//      - path
//      - page
//      - pageSize
//  e.g.queryParams
//      path=${path}&page=${page}&pageSize=${pageSize}
// e.g path:
//      path="dbId=0;connectionId={:connectionId};databaseId={:databaseId};schemaId={:schemaId};tableId={:tableId};"
// e.g page:
//      page=2
// e.g pageSize:
//      pageSize=10
//  e.g. APIs
//  1. 'api/dbs/0?path=""&page={:page}&pageSize={:pageSize}
//  3. 'api/connections/:id?path=dbId=0;&page={:page}&pageSize={:pageSize}
//  4. 'api/databases/:id?path="dbId=0;connectionId={:connectionId}"&page={:page}&pageSize={:pageSize}
//  5. 'api/schemas/:id?path="dbId=0;connectionId={:connectionId};databaseId={:databaseId}"&page={:page}&pageSize={:pageSize}
//  6. 'api/tables/:id?path="dbId=0;connectionId={:connectionId};databaseId={:databaseId};schemaId={:schemaId}"&page={:page}&pageSize={:pageSize}
//  7. 'api/columns/:id?path="dbId=0;connectionId={:connectionId};databaseId={:databaseId};schemaId={:schemaId};tableId={:tableId}"&page={:page}&pageSize={:pageSize}
//----------------------------------------------------------------------
import axios, { AxiosResponse } from 'axios';
import {Page, QueryParams, TreeNodeData} from "../types";
import MockAdapter from 'axios-mock-adapter';
import {
    db0,
    db0Page2,
    dbConnections1,
    dbConnections1Database3, dbConnections1Database3Page2,
    dbConnections1Database3Schema7, dbConnections1Database3Schema7Page2,
    dbConnections1Database3Schema7Table10,
    dbConnections1Database3Schema7Table10Column16,
    dbConnections1Page2,
    dbConnections1Page3
} from "../mockApi/dbMockApiResponse";

// Create a new instance of axios
const axiosInstance = axios.create({
    baseURL: 'localhost:3000/api'
});


// -------------------------------------------------
// DB service API
// -------------------------------------------------
class DatabaseService {
    private baseUrl = '';

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



// it's here for mocking purposes. does not work if defined in another module
// Create a new instance of MockAdapter and pass in the axios instance
export const mockAdapter = new MockAdapter(axiosInstance);

// Configure the mock adapter to intercept GET requests to the /api/db various endpoints
mockAdapter.onGet('/dbs/0',{params: {
        path: "" ,
        page: 1,
        pageSize: 2
    }}).reply(200, db0);

mockAdapter.onGet('/dbs/0',{params: {
        path: "" ,
        page: 2,
        pageSize: 2
    }}).reply(200, db0Page2);

mockAdapter.onGet('/connections/1',{params: {
        path: "dbId=0;" ,
        page: 1,
        pageSize: 2
    }}).reply(200, dbConnections1);

mockAdapter.onGet('/connections/1',{params: {
        path: "dbId=0;" ,
        page: 2,
        pageSize: 2
    }}).reply(200, dbConnections1Page2);

mockAdapter.onGet('/connections/1',{params: {
        path: "dbId=0;" ,
        page: 3,
        pageSize: 2
    }}).reply(200, dbConnections1Page3);

mockAdapter.onGet('/databases/3',{params: {
        path: "dbId=0;connectionId=1;" ,
        page: 1,
        pageSize: 2
    }}).reply(200, dbConnections1Database3);

mockAdapter.onGet('/databases/3',{params: {
        path: "dbId=0;connectionId=1;" ,
        page: 2,
        pageSize: 2
    }}).reply(200, dbConnections1Database3Page2);

mockAdapter.onGet('/schemas/7',{params: {
        path: "dbId=0;connectionId=1;databaseId=3;" ,
        page: 1,
        pageSize: 2
    }}).reply(200, dbConnections1Database3Schema7);

mockAdapter.onGet('/schemas/7',{params: {
        path: "dbId=0;connectionId=1;databaseId=3;" ,
        page: 2,
        pageSize: 2
    }}).reply(200, dbConnections1Database3Schema7Page2);

mockAdapter.onGet('/tables/10',{params: {
        path: "dbId=0;connectionId=1;databaseId=3;schemaId=7;" ,
        page: 1,
        pageSize: 2
    }}).reply(200, dbConnections1Database3Schema7Table10);

mockAdapter.onGet('/columns/16',{params: {
        path: "dbId=0;connectionId=1;databaseId=3;schemaId=7;tableId=10;" ,
        page: 1,
        pageSize: 2
    }}).reply(200, dbConnections1Database3Schema7Table10Column16);
