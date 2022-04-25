import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import { BsFillPeopleFill } from 'react-icons/bs';
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
    background-color: #6667AB;
    color: white;
  }
  .slide-pane__content {
    background-color: #C1C6DB;
  }
`;

const ChatInfo = styled.div`
  display: flex;
  float: right;
`;

const InputChat = styled.input`
  width: 86%;
  height: 50px;
  border: 1px solid white;
  border-radius: 5px 5px 5px 5px / 5px 5px 5px 5px;
  padding: 0% 2% 0% 2%;
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
      content: "커밋했습니다! 확인해주세요!"
    },
    {
      name: "장소명",
      image:
        "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png",
        content: "확인했습니다!"
    },
    {
      name: "장다빈",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
        content: "이거 뭔가 이상한데? 확인 좀!"
    },
    {
      name: "박주한",
      image:
        "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png",
        content: "자네! 이게 뭔가!!!!!!!"
    },
    {
      name: "서은민",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
        content: "확인했습니다!"
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
        <ChatInfo>
          <BsFillPeopleFill/>
          <a>{dummy2.length}</a>
        </ChatInfo>

        <ChatContainer>
          {dummy2.map((element, idx) => {
            if (element.name !== "박주한")
              return (
                <>
                  <div style={{ display: "flex", marginBottom: "2%" }} key={idx}>
                    <img
                      style={{
                        width: "3%",
                        height: "3%",
                        borderRadius: "50%",
                        marginRight: "1%",
                      }}
                      src={`${element.image}`}
                    />
                    <a style={{ fontWeight: "bold", alignSelf: "center" }}>{element.name}</a>{" "}
                  </div>

                  <div style={{ marginBottom: "4%" }}>
                    <a
                      style={{
                        background: "white",
                        width: "fit-content",
                        height: "100px",
                        padding: "1.5% 1% 1.5% 1%",
                        borderRadius: "5px 5px 5px 0px / 5px 5px 5px 0px",
                      }} onClick={() => setState({ isPaneOpen: true })}>
                      {element.content}
                    </a>
                  </div>
                </>
              );
            else
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "2%",
                      justifyContent: "right",
                    }}
                    key={idx}
                  >
                    <img
                      style={{
                        width: "3%",
                        height: "3%",
                        borderRadius: "50%",
                        marginRight: "1%",
                      }}
                      src={`${element.image}`}
                    />
                    <a style={{ fontWeight: "bold", alignSelf: "center" }}>{element.name}</a>{" "}
                  </div>

                  <div style={{ marginBottom: "4%", textAlignLast: "right"}}>
                    <a
                      style={{
                        background: "#6667AB",
                        color: "white",
                        width: "fit-content",
                        height: "100px",
                        padding: "1.5% 1% 1.5% 1%",
                        borderRadius: "5px 5px 0px 5px / 5px 5px 0px 5px",
                      }} onClick={() => setState({ isPaneOpen: true })}>
                      {element.content}
                    </a>
                  </div>
                </>
              );
          })}
        </ChatContainer>
        <br />
        <div style={{textAlign: "center"}}>
          <InputChat></InputChat>
        </div>
        
      </SlidingPaneBox>
    </FlexBox>
  );
};
export default Home;
