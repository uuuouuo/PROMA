import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Team from "./Team";
import Link from "next/link";
import { useState } from "react";

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
  }
`;

const ModalHeader = styled.div`
  height: 50px;
  padding: 0px 0px 0px 10px;
  background: #6667AB;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

const ModalBody = styled.div`
  height: 50px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  margin: 32px 32px 50px 32px;
  align-items: center;
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
  height: 30px;
  border: 2px solid #6667AB;
  margin: 10px 5px 0px 0px;
  border-radius: 5px 5px 5px 5px / 5px 5px 5px 5px;
`;

const ModalButton2 = styled(ModalButton1)`
  background: #6667AB;
  color: white;
  height: 30px;
  border: 2px solid #6667AB;
  margin: 10px 5px 0px 0px;
  border-radius: 5px 5px 5px 5px / 5px 5px 5px 5px;
`;

//dummy data
const teams = ["team1", "team2", "team3"];

const Project = ({ projectName }: { projectName: string }) => {
  const [showTeams, setShowTeams] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ProjectContainer>
      <Header>
        <Link href="/project/0">
          <a>{projectName}</a>
        </Link>
        <div>
          <ChatButton>Chat</ChatButton>
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
              <>
              <div style={{ display: "flex", width: "100%" }}>
                  <a style={{marginRight: "5%"}}>Team</a>
                  <input style={{width: "100%"}}></input>
                </div>
                <div style={{marginTop: "2%", marginLeft: "auto", display: "flex" }}>
                  <ModalButton1>Cancel</ModalButton1>
                  <ModalButton2>Create</ModalButton2>
                </div>
              </>
            </ModalBody>
          </Box>
      </ModalBox>
      
    </ProjectContainer>
  );
};

export default Project;
