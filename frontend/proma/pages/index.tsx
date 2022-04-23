import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  color: white;
  background-color: #6667AB;
`;

const Home = () => {
  const { addToast } = useToasts();
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
            // { appearance: "info" }
          )
        }
      >
        알림 보기
      </button>
    </FlexBox>
  );
};
export default Home;
