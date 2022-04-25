import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import { ThemeType } from "../interfaces/style";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  color: white;
  background-color: #6667ab;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  padding: 20px;
`;

const SlidingPaneBox = styled(SlidingPane)`
  /* &:first-child{ */
  .slide-pane__header {
    background-color: green;
    color: white;
  }
`;

const Home = () => {
  const { addToast } = useToasts();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const dummy2 = [
    {
      name: "김일환",
      image:
        "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png",
    },
    {
      name: "장소명",
      image:
        "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png",
    },
    {
      name: "장다빈",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
    },
    {
      name: "박주한",
      image:
        "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png",
    },
    {
      name: "서은민",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
    },
  ];

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
      <button onClick={() => setState({ isPaneOpen: true })}>
        Click me to open right pane!
      </button>
      <SlidingPaneBox
        // className="some-custom-class"
        // overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        title="DB"
        subtitle="DB 단체회의방입니다."
        width="800px"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setState({ isPaneOpen: false });
        }}
      >
        <ChatContainer>
          {dummy2.map((element, idx) => {
            if (element.name !== "박주한")
              return (
                <div style={{ display: "flex", marginBottom: "4%" }} key={idx}>
                  <img
                    style={{
                      width: "8%",
                      height: "60px",
                      borderRadius: "50%",
                      marginRight: "2%",
                    }}
                    src={`${element.image}`}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                    }}
                  >
                    <a style={{ fontWeight: "bold" }}>{element.name}</a>{" "}
                    <a onClick={() => setState({ isPaneOpen: true })}>
                      내용 작성했습니다.
                    </a>
                  </div>
                </div>
              );
            else
              return (
                <div
                  style={{
                    display: "flex",
                    marginBottom: "4%",
                    justifyContent: "right",
                  }}
                  key={idx}
                >
                  <img
                    style={{
                      width: "8%",
                      height: "60px",
                      borderRadius: "50%",
                      marginRight: "2%",
                    }}
                    src={`${element.image}`}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                    }}
                  >
                    <a style={{ fontWeight: "bold" }}>{element.name}</a>{" "}
                    <a onClick={() => setState({ isPaneOpen: true })}>
                      내용 작성했습니다.
                    </a>
                  </div>
                </div>
              );
          })}
        </ChatContainer>
        <br />
      </SlidingPaneBox>
    </FlexBox>
  );
};
export default Home;
