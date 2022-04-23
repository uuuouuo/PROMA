import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ThemeType } from "../../../interfaces/style";
import Project from "./Project";

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

const H3 = styled.h3`
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

// 팀 생성 모달
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

// 더미파일
const dummy = [
  {
    team: "FrontEnd",
  },
  {
    team: "BackEnd",
  },
  {
    team: "Deploy",
  },
  {
    team: "DB",
  },
];
const dummy2 = [
  {
    name: "김일환",
    image:
      "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png",
  },
  {
    name: "장소명",
    image:
      "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png",
  },
  {
    name: "장다빈",
    image:
      "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
  },
  {
    name: "서은민",
    image:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
  },
];

const projects = ["one", "two", "three"];

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = React.useState({
    isPaneOpen: false,
  });

  return (
    <SideBarContainer>
      <H3>My Projects</H3>
      <ProjectsContainer>
        {projects.map((project) => (
          <Project projectName={project}></Project>
        ))}
        <AddProjectButton>+ Create New Project</AddProjectButton>
      </ProjectsContainer>
    </SideBarContainer>
  );
};

export default SideBar;
