/* eslint-disable */
import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { ThemeType } from "../../interfaces/style";
import Image from "next/image";
import { chatSend, projectChat } from "../../store/modules/chat";
import { connect } from "react-redux";
import { RootState } from "../../store/modules";

const mapStateToProps = (state: RootState) => {
  return {
    projectList: state.projectReducer.projectList,
    chatInfo: state.chatReducer.chatInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    projectChat: (projectNo: string) => dispatch(projectChat(projectNo)),
  };
};

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

const Chatting = ({ state, showChat, projectList, chatInfo }: { state: boolean; showChat: any; projectList: any; chatInfo: any; }) => {

  let output = localStorage.getItem("messageList");
  let arr = JSON.parse(output as string);
  const [dummy, setDummy] = useState(arr);
  const [chat, setChat] = useState<string>("");

  const onSubmitChat = (e: any) => {
    if (e.key === "Enter") {
      localStorage.setItem("chatContent", chat)
      chatSend();
    }
  };

  useEffect(() => {
    // projectChat(projectList[0].projectNo);
    let output = localStorage.getItem("messageList");
    let arr = JSON.parse(output as string);
    setDummy(arr);
    console.log(dummy)
  }, [output])

  console.log(chatInfo)
  
  return (
    <SlidingPaneBox
      isOpen={state}
      title="DB"
      subtitle={
        <ChatInfo>
          <BsFillPeopleFill />
          <span>{dummy?.length}</span>
        </ChatInfo>
      }
      width="500px"
      onRequestClose={showChat}
    >
      <ChatContainer>
      {dummy.map((element: any, idx: any) => {
          if (element.name !== localStorage.getItem("userNo"))
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

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);