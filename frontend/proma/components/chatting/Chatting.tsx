import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import { BsFillPeopleFill } from 'react-icons/bs';
import { ThemeType } from "../../interfaces/style";

const Chatting = ({state, showChat}:{state:boolean; showChat:any}) => {
    // const [func, setFunc] = useState({
    //     isPaneOpen: false,
    // });

    const SlidingPaneBox = styled(SlidingPane)`
        .slide-pane {
            height: 100vh;
        }
        .slide-pane__header {
            background-color: #6667AB;
            color: white;
            flex: 0 0 6%;
            z-index: 2;
            position: relative;
        }
        .slide-pane__content {
            background-color: #C1C6DB;
            overflow: auto;
            flex: 0 0 94%;
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

    const ChatContainer = styled.div`
        width: 100%;
        height: 83%;
        background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
        padding: 20px;
        overflow: auto;
    `;
    
    const [dummy2, setDummy2] = useState([
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
    ]);

    const [chat, setChat] = useState<string>("");

    // 댓글 내용 작성 
    const onChange = (e: any) => {
    setChat(e.target.value);
    };

    // 댓글 작성 완료 -> 채팅장으로 
    const handleKeyPress = (e: any) => {
    const value = {name: '박주한', image:"https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png",content : e.target.value};

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
        subtitle="DB 단체회의방입니다."
        width="500px"
        onRequestClose={showChat}
        >
        <ChatInfo style={{marginTop: "-6%", position: "absolute"}}>
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
                        }}>
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
                        }}>
                        {element.content}
                    </a>
                    </div>
                </>
                );
            })}
        </ChatContainer>
        <br />
        <div style={{textAlign: "center"}}>
            <InputChat value={chat} onChange={onChange} onKeyPress={handleKeyPress}></InputChat>
        </div>
        
        </SlidingPaneBox>
    );
};
export default Chatting;