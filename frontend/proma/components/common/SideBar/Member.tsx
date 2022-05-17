/* eslint-disable */
import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import Image from "next/image";
import { useEffect, useState } from "react";
import MemberChatting from "../../chatting/MemberChatting";
import { RootState } from "../../../store/modules";
import { connect } from "react-redux";

//styled-components
const MemberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  font-size: 18px;
  padding: 0px;
  margin-bottom: 5px;
  div {
    display: flex;
    align-items: center;
    span {
      font-size: 15px;
    }
  }
`;
const ImageBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
`;
const ChatButton = styled.button`
  border: 2px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.elementBgColor};
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  font-size: 10px;
  padding: 2px 5px;
  margin-right: 5px;
  width: 35px;
  &:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
  };
};

const Member = ({
  memberInfo,
  projectNo,
  userInfo,
}: {
  memberInfo: any;
  projectNo: any;
  userInfo?: any;
}) => {
  // 채팅창 띄우기
  const [state, setState] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const showChat = () => setState((cur) => !cur);

  useEffect(() => {
    setImage(memberInfo.image);
  }, [memberInfo]);

  return (
    <MemberContainer>
      <div>
        <ImageBox>
          {image ? (
            <Image src={`${image}`} width={20} height={20} />
          ) : (
            <Image src="/profileimg.png" width={20} height={20} />
          )}
        </ImageBox>
        <span>{memberInfo.nickname}</span>
      </div>
      {userInfo.no !== memberInfo.userNo ? (
        <ChatButton onClick={() => setState(true)}>Chat</ChatButton>
      ) : null}
      <MemberChatting
        state={state}
        showChat={showChat}
        memberInfo={memberInfo}
      />
    </MemberContainer>
  );
};

export default connect(mapStateToProps, null)(Member);
