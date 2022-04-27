import styled, { keyframes } from "styled-components";
import { ThemeType } from "../interfaces/style";
import { FaHandPointLeft } from "react-icons/fa";
// import { useToasts } from "react-toast-notifications";
// import "react-sliding-pane/dist/react-sliding-pane.css";
// import { useState } from "react";
// import Chatting from "../components/chatting/Chatting";

const animation = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform:translateX(10px);
    }
    100% {
        transform:translateX(0);
    }
`;

const MainContainer = styled.div`
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  font-size: 20px;
  strong {
    font-size: 150px;
  }
  div {
    margin-top: 100px;
    display: flex;
    align-items: center;
    span {
      font-size: 25px;
      margin-top: 5px;
      margin-right: 20px;
      animation: ${animation} 2s linear infinite;
    }
  }
`;

// const Box = styled.div`
//   color: white;
//   background-color: #6667ab;
// `;

const Home = () => {
  //   const { addToast } = useToasts();

  //   const [state, setState] = useState(false);
  //   const showChat = () => setState((cur) => !cur);

  return (
    <MainContainer>
      <strong>PROMA</strong>
      <span>for work management</span>
      <div>
        <span>
          <FaHandPointLeft />
        </span>
        <p>Please go to the project space.</p>
      </div>
      {/* <button
        onClick={() =>
          addToast(
            <Box>
              <p>Epic 'design'</p>
              <p>Issue 'style' 종료</p>
            </Box>
          )
        }
      >
        알림 보기
      </button> */}
      {/* <button onClick={() => setState(true)}>
        Click me to open right pane!
      </button> */}
      {/* <Chatting state={state} showChat={showChat} /> */}
    </MainContainer>
  );
};
export default Home;
