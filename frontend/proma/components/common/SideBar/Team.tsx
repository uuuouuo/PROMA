/* eslint-disable */
import Member from "./Member";
import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import TeamChatting from "../../chatting/TeamChatting";

import { connect } from "react-redux";
import { joinTeam } from "../../../store/modules/team";
import { RootState } from "../../../store/modules";
import { projectChat } from "../../../store/modules/chat";

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    joinTeam: (teamInfo: any) => dispatch(joinTeam(teamInfo)),
    projectChat: (projectNo: string) => dispatch(projectChat(projectNo)),
  };
};

const Team = ({
  teamInfo,
  projectNo,
  currentTeam,
  joinTeam,
}: {
  teamInfo: any;
  projectNo: string;
  currentTeam: boolean;
  joinTeam?: any;
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
    let joinConfirm = confirm("Would you like to join the team?");
    if (joinConfirm) {
      joinTeam({ teamNo: teamInfo.teamNo }).then((res: any) =>
        alert("Team registration is complete.")
      );
    }
  };

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
              <TeamChatting state={state} showChat={showChat} teamInfo={teamInfo}/>
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
              <Member
                memberInfo={member}
                key={index}
                projectNo={projectNo}
              />
              ))
            : null}
        </MemberBox>
      ) : null}
    </TeamContainer>
  );
};

export default connect(null, mapDispatchToProps)(Team);
