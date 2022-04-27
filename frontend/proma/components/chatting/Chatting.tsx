import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { ThemeType } from "../../interfaces/style";
import Image from "next/image";

const InputChat = styled.div`
  width: 420px;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  input {
    width: inherit;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    font-size: 22px;
    opacity: 0.7;
    &:focus {
      opacity: 1;
    }
  }
`;

const SlidingPaneBox = styled(SlidingPane)`
  .slide-pane {
    height: 100vh;
  }
  .slide-pane__header {
    background-color: ${(props: ThemeType) => props.theme.mainColor};
    color: white;
    position: relative;
    padding: 7.5px 0;
    .slide-pane__title {
      font-size: 25px;
    }
    .slide-pane__subtitle {
      position: absolute;
      right: 40px;
    }
  }
  .slide-pane__content {
    background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  }
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  span {
    margin-left: 5px;
  }
`;

const ChatContainer = styled.div`
  width: inherit;
  height: 90%;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  padding: 20px;
  overflow: scroll;
`;

const Chatting = ({ state, showChat }: { state: boolean; showChat: any }) => {
  // const [func, setFunc] = useState({
  //     isPaneOpen: false,
  // });
  const [dummy2, setDummy2] = useState([
    {
      name: "김일환",
      image:
        "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png",
      content: "커밋했습니다! 확인해주세요!",
    },
    {
      name: "장소명",
      image:
        "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png",
      content: "확인했습니다!",
    },
    {
      name: "장다빈",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
      content: "이거 뭔가 이상한데? 확인 좀!",
    },
    {
      name: "박주한",
      image:
        "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png",
      content: "자네! 이게 뭔가!!!!!!!",
    },
    {
      name: "서은민",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
      content: "확인했습니다!",
    },
  ]);

  const [chat, setChat] = useState<string>("");

  const onSubmitChat = (e: any) => {
    const value = {
      name: "박주한",
      image:
        "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png",
      content: chat,
    };

    if (e.key === "Enter") {
      setDummy2([...dummy2, value]);
      setChat("");
    }
  };

  return (
    <SlidingPaneBox
      // className="some-custom-class"
      // overlayClassName="some-custom-overlay-class"
      isOpen={state}
      title="DB"
      subtitle={
        <ChatInfo>
          <BsFillPeopleFill />
          <span>{dummy2.length}</span>
        </ChatInfo>
      }
      width="500px"
      onRequestClose={showChat}
    >

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
                  <a style={{ fontWeight: "bold", alignSelf: "center" }}>
                    {element.name}
                  </a>{" "}
                </div>

                <div style={{ marginBottom: "4%" }}>
                  <a
                    style={{
                      background: "white",
                      width: "fit-content",
                      height: "100px",
                      padding: "1.5% 1% 1.5% 1%",
                      borderRadius: "5px 5px 5px 0px / 5px 5px 5px 0px",
                    }}
                  >
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
                  <a style={{ fontWeight: "bold", alignSelf: "center" }}>
                    {element.name}
                  </a>{" "}
                </div>

                <div style={{ marginBottom: "4%", textAlignLast: "right" }}>
                  <a
                    style={{
                      background: "#6667AB",
                      color: "white",
                      width: "fit-content",
                      height: "100px",
                      padding: "1.5% 1% 1.5% 1%",
                      borderRadius: "5px 5px 0px 5px / 5px 5px 0px 5px",
                    }}
                  >
                    {element.content}
                  </a>
                </div>
              </>
            );
        })}
      </ChatContainer>

      <InputChat>
        <input
          type="text"
          value={chat}
          placeholder="Chat.."
          onChange={(e) => setChat(e.target.value)}
          onKeyPress={onSubmitChat}
          autoFocus
        />
      </InputChat>
    </SlidingPaneBox>
  );
};

export default Chatting;
