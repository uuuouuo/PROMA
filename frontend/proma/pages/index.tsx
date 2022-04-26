import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import Chatting from "../components/chatting/Chatting";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  color: white;
  background-color: #6667ab;
`;

const Home = () => {
  const { addToast } = useToasts();
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  return (
    <FlexBox>
      <div>PROMA</div>
      <div>프로젝트로 이동해주세요</div>
      <button
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
      </button>
      <button onClick={() => setState({ isPaneOpen: true })}>
        Click me to open right pane!
      </button>
      <Chatting state={state.isPaneOpen} />
        <br />
    </FlexBox>
  );
};
export default Home;
