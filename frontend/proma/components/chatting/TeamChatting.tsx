/* eslint-disable */
import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { ThemeType } from "../../interfaces/style";
import { teamChat } from "../../store/modules/chat";
import { connect } from "react-redux";
import { RootState } from "../../store/modules";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const mapStateToProps = (state: RootState) => {
  return {
    chatInfo: state.chatReducer.chatInfo,
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    teamChat: (teamNo: string) => dispatch(teamChat(teamNo)),
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

let sock = new SockJS("https://k6c107.p.ssafy.io/api/ws-stomp");
let client = Stomp.over(sock);

const TeamChatting = ({
  state,
  showChat,
  teamNo,
  teamChat,
  userInfo,
}: {
  state: boolean;
  showChat: any;
  teamNo: any;
  teamChat: any;
  userInfo: any;
}) => {
  const [messageList, setMessageList] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<Object>({});
  const [chat, setChat] = useState<string>("");
  const [roomNo, setRoomNo] = useState<number>(0);

  const onSubmitChat = (e: any) => {
    if (e.key === "Enter") {
      let chat = {
        roomNo,                       // 채팅장 번호
        pubNo: userInfo.no,           // 채팅 작성자 코드
        content: e.target.value,      // 채팅 내용
      };
      client.send(`/pub/chat/team-msg`, JSON.stringify(chat));
    }
  };

  const onReset = () => {
    setChat('');
  }

  const chatSubscribe = (roomNo: number) => {
    const Authorization = localStorage
      .getItem("Authorization")
      ?.split(" ")[1]
      .toString();
    if (!Authorization) return;
    let sock = new SockJS("https://k6c107.p.ssafy.io/api/ws-stomp");
    let client = Stomp.over(sock);

    client.connect({ Authorization }, () => {
      // 채팅 주소 구독
      client.subscribe(`/sub/chat/room/team/${roomNo}`, (res) => {
        const messagedto = JSON.parse(res.body);
        console.log(messagedto);
        setNewMessage(messagedto);
      });
    });
  };

  useEffect(() => {
    if (!teamNo) return;

    teamChat(teamNo).then((res: any) => {
      console.log(res)
      setRoomNo(res.payload.response.roomNo);
      chatSubscribe(res.payload.response.roomNo);
      const messagelist = res.payload.response.messageList;
      const arr = [...messagelist].reverse();
      setMessageList(arr);
    });
  }, [teamNo]);

  useEffect(() => {
    if (!newMessage) return;
    setMessageList([...messageList, newMessage]);
  }, [newMessage]);

  return (
    <SlidingPaneBox
      isOpen={state}
      title="DB"
      subtitle={
        <ChatInfo>
          <BsFillPeopleFill />
          {/* <span>{messageList?.length}</span> */}
        </ChatInfo>
      }
      width="500px"
      onRequestClose={showChat}
    >
      <ChatContainer>
        {messageList.map((element: any, idx: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamChatting);
