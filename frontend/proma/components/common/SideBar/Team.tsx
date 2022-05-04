import Member from "./Member";
import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Chatting from "../../chatting/Chatting";

//styled-components
const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  padding: 0 5px;
  margin-bottom: 10px;
  a {
    font-size: 18px;
    text-decoration: none;
    color: black;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
const ChatJoinButton = styled.button`
  border: 2px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.elementBgColor};
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  font-size: 12px;
  padding: 2px 5px;
  margin-right: 5px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;
const ArrowButton = styled.button`
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 22px;
  display: flex;
  align-items: center;
`;
const MemberBox = styled.div`
  padding: 10px 20px 10px 10px;
`;

const Team = ({
  teamInfo,
  projectNo,
  currentTeam,
}: {
  teamInfo: any;
  projectNo: string;
  currentTeam: boolean;
}) => {
  const [showMembers, setShowMembers] = useState<boolean>(currentTeam);
  const [members, setMembers] = useState<Array<Object>>([]);

  // 채팅창 띄우기
  const [state, setState] = useState(false);
  const showChat = () => setState((cur) => !cur);

  useEffect(() => {
    setMembers(teamInfo.memberList);
  }, [teamInfo]);

  const onJoinTeam = () => {
    //join 하겠냐는 모달창 띄우고 거기서(추후 제작)
  };

  const onShowChat = () => {};

  return (
    <TeamContainer>
      <Header>
        <Link href={`/project/${projectNo}/team/${teamInfo.teamNo}`}>
          <a>{teamInfo.title}</a>
        </Link>
        <div>
          {teamInfo.isInMember ? (
            <>
              <ChatJoinButton onClick={() => setState(true)}>
                Chat
              </ChatJoinButton>
              <Chatting state={state} showChat={showChat} />
            </>
          ) : (
            <ChatJoinButton onClick={onJoinTeam}>Join</ChatJoinButton>
          )}
          <ArrowButton onClick={() => setShowMembers((cur) => !cur)}>
            {showMembers ? <FaAngleDown /> : <FaAngleRight />}
          </ArrowButton>
        </div>
      </Header>
      {showMembers ? (
        <MemberBox>
          {members
            ? members.map((member, index) => (
                <Member memberInfo={member} key={index} />
              ))
            : null}
        </MemberBox>
      ) : null}
    </TeamContainer>
  );
};

export default Team;
