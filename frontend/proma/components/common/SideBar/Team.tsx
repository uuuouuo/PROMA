import Member from "./Member";
import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

//dummy data
const members = ["kim", "Park", "Choi", "Seo", "Jang"];

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
  padding: 0 10px;
  margin-bottom: 10px;
  a {
    font-size: 20px;
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
  padding: 10px 20px;
`;

const Team = ({ teamName }: { teamName: string }) => {
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const [joinTeam, setJoinTeam] = useState<boolean>(false);

  const onJoinTeam = () => {
    //join 하겠냐는 모달창 띄우고 거기서
    setJoinTeam(true);
  };

  const onShowChat = () => {};

  return (
    <TeamContainer>
      <Header>
        <Link href="/project/0/team/0">
          <a>{teamName}</a>
        </Link>
        <div>
          {joinTeam ? (
            <ChatJoinButton onClick={onShowChat}>Chat</ChatJoinButton>
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
          {members.map((member) => (
            <Member memberName={member} />
          ))}
        </MemberBox>
      ) : null}
    </TeamContainer>
  );
};

export default Team;
