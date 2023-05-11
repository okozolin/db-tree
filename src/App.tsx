import React, {useEffect, useState} from 'react';
import {Page, TreeNodeData} from "./types";
import Tree from "./components/Tree/Tree";
import {MdFace} from "react-icons/md";
import styled from "styled-components";
import {platformColors} from "./constants/colors";
import {fetchTree} from "./utils/fetch";

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

const MoreButton = styled.button`
  margin: 1rem 2rem;
  width: 8rem;
  height: 2rem;
  color: ${platformColors.mint};
  border: none;
  background-color: unset;
  &:hover {
    cursor: pointer;
  }
`;

const App: React.FC = () => {
  const [data, setData] = useState<Page<TreeNodeData>>({items: [], total: 0});
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    fetchTree(page, setData);
  }, [page]);

  const onMoreClick = ()=> {
    console.log("clicked more in App")
    setPage((prevPage) => prevPage + 1);
  }
  console.log("App: page in App==>", page)
  return (
      <AppContainer>
        <Header>
          <MyLogo>
            <MdFace color={platformColors.lightPink} />
            oritkozolin 2023
          </MyLogo>
        </Header>
        {data.items.map((node:TreeNodeData, index:number)=>(
          <div key={index}>
            <Tree data={node}/>
          </div>
        ))}
        <MoreButton onClick={onMoreClick}>Load More...</MoreButton>
      </AppContainer>
  )
}

export default App;
