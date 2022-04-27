import { useState } from "react";
import styled from "styled-components";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ThemeType } from "../../../interfaces/style";
import Project from "./Project";
import { ProjectCreateModal } from "../Modal";

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

//dummy data
const projects = ["one", "two", "three"];

const SideBar = () => {
  const [projectCreateModal, setProjectCreateModal] = useState<boolean>(false);
  const showProjectCreateModal = () => setProjectCreateModal((cur) => !cur);

  return (
    <SideBarContainer>
      <H4>My Projects</H4>
      <ProjectsContainer>
        {projects.map((project, index) => (
          <Project projectName={project} key={index}></Project>
        ))}
        <AddProjectButton onClick={showProjectCreateModal}>
          + Create New Project
        </AddProjectButton>
        <ProjectCreateModal
          projectCreateModal={projectCreateModal}
          showProjectCreateModal={showProjectCreateModal}
        />
      </ProjectsContainer>
    </SideBarContainer>
  );
};

export default SideBar;
