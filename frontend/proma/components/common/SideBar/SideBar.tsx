import { useState, useEffect } from "react";
import styled from "styled-components";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ThemeType } from "../../../interfaces/style";
import Project from "./Project";
import { ProjectCreateModal } from "../../Modals/ProjectCreateModal";

import { connect } from "react-redux";
import { getProjectList, postNewProject } from "../../../store/modules/project";
import { RootState } from "../../../store/modules";

//styled-components
const SideBarContainer = styled.div`
  width: 20vw;
  min-width: 250px;
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

const mapStateToProps = (state: RootState) => {
  return {
    projectList: state.projectReducer.projectList,
    isLogin: state.userReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProjects: () => dispatch(getProjectList()),
    postNewProject: (newProjectInfo: any) =>
      dispatch(postNewProject(newProjectInfo)),
  };
};

const SideBar = ({
  projectList,
  getProjects,
  postNewProject,
  isLogin,
}: {
  projectList: any;
  getProjects: any;
  postNewProject: any;
  isLogin: boolean;
}) => {
  const [projectCreateModal, setProjectCreateModal] = useState<boolean>(false);
  const showProjectCreateModal = () => setProjectCreateModal((cur) => !cur);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <SideBarContainer>
      <H4>My Projects</H4>
      {isLogin ? (
        <ProjectsContainer>
          {projectList?.map((project: any, index: any) => (
            <Project projectInfo={project} key={index} />
          ))}
          <AddProjectButton onClick={showProjectCreateModal}>
            + Create New Project
          </AddProjectButton>
          <ProjectCreateModal
            projectCreateModal={projectCreateModal}
            showProjectCreateModal={showProjectCreateModal}
            postNewProject={postNewProject}
          />
        </ProjectsContainer>
      ) : (
        <H4>Please login first.</H4>
      )}
    </SideBarContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
