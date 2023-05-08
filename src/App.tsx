import React, {useEffect, useState} from 'react';
import mockData from "./mockApi/databaseTree.json";
import {TreeNodeData} from "./types";
import Tree from "./components/Tree/Tree";

const App: React.FC = () => {
  const [data, setData] = useState<TreeNodeData[]>([]);
  
  useEffect(() => {
    // here normally would be an async function request to fetch the desired data
    const getData = () => {
      setData(mockData)
    }
    getData()
  },[])

  return (
      <div>
        <Tree data={data} />
      </div>
  );
}

export default App;
