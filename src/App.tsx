import React from 'react';
import Tree from "./components/Tree/Tree";
import {MdFace} from "react-icons/md";
import styled from "styled-components";
import {platformColors} from "./constants/colors";
import {DB} from "./constants/general";

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
    const initTree = {
        id: 0,
        label: "DB root",
        type: DB,
        hasPermission: true,
        childrenTotal: 3
    }

  return (
      <AppContainer>
        <Header>
          <MyLogo>
            <MdFace color={platformColors.lightPink} />
            oritkozolin 2023
          </MyLogo>
        </Header>
          <div>
            <Tree
                data={initTree}
                path={""}
            />
          </div>
      </AppContainer>
  )
}

export default App;
