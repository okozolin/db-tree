import React, {useEffect, useState} from 'react';
import mockData from "./mockApi/databaseTree.json";
import {TreeNodeData} from "./types";
import Tree from "./components/Tree/Tree";
import {MdFace} from "react-icons/md";
import styled from "styled-components";
import {platformColors} from "./constants/colors";

const Header = styled.div`
  text-align: center;
  font-weight: 600;
  line-height: 1.1;
  color: #232333;
  font-size: 20px;
  margin: 1rem;
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const MyLogo = styled.div`
  color: ${platformColors.lightPink}
`;
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
      <AppContainer>
        <Header>
          <MyLogo>
            <MdFace color={platformColors.lightPink} />
            oritkozolin 2023
          </MyLogo>
        </Header>
        {data.map((node:TreeNodeData, index:number)=>(
          <div key={index}>
            <Tree data={node}/>
          </div>
        ))}
      </AppContainer>
  )
}

export default App;
