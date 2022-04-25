import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ThemeType } from "../../../interfaces/style";
import Project from "./Project";
import { FaBlackberry } from "react-icons/fa";

const SideBarContainer = styled.div`
  width: 20vw;
  min-width: 200px;
  height: 100%;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const H4 = styled.h4`
  color: ${(props: ThemeType) => props.theme.mainColor};
  margin-left: 20px;
`;

const ProjectsContainer = styled.div`
  height: 90%;
  padding: 0 20px;
`;

const AddProjectButton = styled.button`
  background-color: inherit;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 15px;
  text-decoration: underline;
  border: none;
  margin: 20px 0;
  text-align: start;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const ModalBox = styled(Modal)`
  .MuiBox-root {
    padding: 0px;
    width: 600px;
    border: 0px;
    border-radius: 10px 10px 10px 10px / 10px 10px 10px 10px;
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
  border-radius: 5px 5px 0px 0px / 5px 5px 0px 0px;
`;

const ModalBody = styled.div`
  height: 500px;
  font-size: 25px;
  color: #6667AB;
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

const projects = ["one", "two", "three"];

const SideBar = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SideBarContainer>
      <H4>My Projects</H4>
      <ProjectsContainer>
        {projects.map((project) => (
          <Project projectName={project}></Project>
        ))}
        <AddProjectButton onClick={handleOpen}>+ Create New Project</AddProjectButton>
      </ProjectsContainer>

      {/* 프로젝트 생성 모달 */}
      <ModalBox
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalHeader>Create Project</ModalHeader>
            <ModalBody>
              <>
                <div style={{ width: "100%", marginBottom: "3%" }}>
                  <a>Project</a>
                  <input style={{
                    width: "96%",
                    height: "20px",
                    padding: "1% 2% 1% 2%"
                  }}></input>
                </div>
              
                <div style={{ width: "100%", marginBottom: "3%" }}>
                  <a>Introduce</a>
                  <textarea style={{
                    width: "96%",
                    height: "100px",
                    padding: "1% 2% 1% 2%"
                  }}></textarea>
                </div>
              
                <div style={{ width: "100%", marginBottom: "3%" }}>
                  <a>Write an email to invite members</a>
                  <input style={{
                    width: "96%",
                    height: "20px",
                    padding: "1% 2% 1% 2%"
                  }}></input>
                </div>
              
                <div style={{ width: "100%" }}>
                  <a>Members</a>
                  <div style={{
                    width: "96%",
                    height: "90px",
                    padding: "1% 2% 1% 2%"
                  }}></div>
                </div>
              
                <div style={{marginTop: "2%", marginLeft: "auto", display: "flex" }}>
                  <ModalButton1>Cancel</ModalButton1>
                  <ModalButton2>Create</ModalButton2>
                </div>
              </>
            </ModalBody>
          </Box>
      </ModalBox>

    </SideBarContainer>
  );
};

export default SideBar;
