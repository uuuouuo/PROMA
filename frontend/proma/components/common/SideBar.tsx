import * as React from "react";
import styled from "styled-components";

const Side_bar = styled.div`
  padding: 30px;
  background-color: grey;
  width: 200px;
  height: inherit;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight:
    width: 90%;
    background: white;
    padding-left: 5%;
    padding-right: 5%;
    border-bottom: 3px solid black;
    display: flex;
    place-items: center;
`;

const Team = styled.div`
  font-size: 30px;
  margin-left: 30px;
  margin-right: 30px;
`;

const TeamDetail = styled.div`
  display: flex;
  place-items: center;
`;

const TeamName = styled.a`
  text-decoration: underline;
  font-size: 25px;
`;

const ChatButton = styled.button`
  margin-left: auto;
  height: 25px;
`;

const AddTeam = styled.div`
  font-size: 30px;
  margin-left: 30px;
  margin-right: 30px;
  bottom: 60px;
  width: 100%;
`;

const Member = styled.div`
  font-size: 30px;
  margin-top: 5px;
  margin-left: 20px;
  display: flex;
  place-items: center;
`;

const MemberName = styled.a`
  font-size: 20px;
  margin-left: 30px;
`;

const NavBar = () => {
  return (
    <>
      <Side_bar>
        <Title>
          <a>Proma</a> <ChatButton>chat</ChatButton> <a>+</a>
        </Title>
        <Team>
          <TeamDetail>
            <TeamName>FrontEnd</TeamName> <ChatButton>chat</ChatButton>
          </TeamDetail>
          <TeamDetail>
            <TeamName>BackEnd</TeamName> <ChatButton>chat</ChatButton>
          </TeamDetail>
          <TeamDetail>
            <TeamName>DB</TeamName> <ChatButton>chat</ChatButton>
          </TeamDetail>
          <TeamDetail>
            <TeamName>Deploy</TeamName> <ChatButton>chat</ChatButton>
          </TeamDetail>
          <Member>
            <img style={{ width: "20%" }} src="/profileimg.png" />{" "}
            <MemberName>김일환</MemberName>
          </Member>
          <Member>
            <img style={{ width: "20%" }} src="/profileimg.png" />{" "}
            <MemberName>서은민</MemberName>
          </Member>
          <Member>
            <img style={{ width: "20%" }} src="/profileimg.png" />{" "}
            <MemberName>장다빈</MemberName>
          </Member>
          <Member>
            <img style={{ width: "20%" }} src="/profileimg.png" />{" "}
            <MemberName>장소명</MemberName>
          </Member>
        </Team>
        <AddTeam>
          <a style={{ textDecoration: "underline", fontSize: "20px" }}>
            + create new Team
          </a>
        </AddTeam>
      </Side_bar>
    </>
  );
};

export default NavBar;
