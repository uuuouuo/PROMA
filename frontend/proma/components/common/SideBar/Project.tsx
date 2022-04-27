import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Team from "./Team";
import Link from "next/link";
import { useState } from "react";
import Chatting from "../../chatting/Chatting";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: ThemeType) => props.theme.elementBgColor};
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  border-radius: 3px;
  padding: 0 10px 0 15px;
  a {
    font-size: 25px;
    font-weight: 600;
    text-decoration: none;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const ChatButton = styled.button`
  border: 2px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  background-color: white;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 13px;
  padding: 2px 5px;
  margin-right: 5px;
  width: 43px;
  &:hover {
    cursor: pointer;
  }
`;

const ArrowButton = styled.button`
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const AddTeamButton = styled.button`
  background-color: inherit;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 15px;
  text-decoration: underline;
  border: none;
  margin: 20px;
  text-align: start;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  ${AddTeamButton} {
    align-self: flex-start;
    padding: 10px;
    margin: 0;
  }
`;

const ModalBox = styled(Modal)`
  .MuiBox-root {
    padding: 0px;
    border: 0px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
  }
`;

const ModalHeader = styled.div`
  height: 50px;
  padding: 3px 20px;
  background: #6667ab;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

const ModalBody = styled.div`
  height: 50px;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  margin: 32px 32px 50px 32px;
  align-items: center;
  color: ${(props: ThemeType) => props.theme.mainColor};
  input {
    border: none;
    border-radius: 3px;
    font-size: 20px;
    padding: 5px 10px;
    outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    &:focus {
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    }
  }
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalButton1 = styled.button`
  background: white;
  height: 25px;
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  margin: 10px 0px 0px 10px;
  border-radius: 3px;
  color: ${(props: ThemeType) => props.theme.mainColor};
`;

const ModalButton2 = styled(ModalButton1)`
  background: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
`;

//dummy data
const teams = ["team1", "team2", "team3"];

const Project = ({ projectName }: { projectName: string }) => {
  const [showTeams, setShowTeams] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 채팅창 띄우기
  const [state, setState] = useState(false);
  const showChat = () => setState((cur) => !cur);

  return (
    <ProjectContainer>
      <Header>
        <Link href="/project/0">
          <a>{projectName}</a>
        </Link>
        <div>
          <ChatButton onClick={() => setState(true)}>Chat</ChatButton>
          <Chatting state={state} showChat={showChat} />
          <ArrowButton onClick={() => setShowTeams((cur) => !cur)}>
            {showTeams ? <FaAngleDown /> : <FaAngleRight />}
          </ArrowButton>
        </div>
      </Header>
      {showTeams ? (
        <TeamBox>
          {teams.map((team) => (
            <Team teamName={team} />
          ))}
          <AddTeamButton onClick={handleOpen}>+ Add Team</AddTeamButton>
        </TeamBox>
      ) : null}

      {/* 팀 생성 모달 */}
      <ModalBox
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalHeader>Create Team</ModalHeader>
          <ModalBody>
            <div style={{ display: "flex", width: "100%" }}>
              <a style={{ marginRight: "5%" }}>Team</a>
              <input style={{ width: "100%" }}></input>
            </div>
            <div
              style={{ marginTop: "2%", marginLeft: "auto", display: "flex" }}
            >
              <ModalButton1>Cancel</ModalButton1>
              <ModalButton2>Create</ModalButton2>
            </div>
          </ModalBody>
        </Box>
      </ModalBox>
    </ProjectContainer>
  );
};

export default Project;
