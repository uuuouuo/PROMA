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

const projects = ["one", "two", "three"];

const SideBar = () => {
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
