/* eslint-disable */
import styled from "styled-components";
import Sprint from "../../../components/project/Sprint";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ThemeType } from "../../../interfaces/style";
import { FaPen, FaCheck } from "react-icons/fa";
import TopicCreateModal from "../../../components/Modals/TopicCreateModal";
import WarningModal from "../../../components/Modals/WarningModal";
import TopicListModal from "../../../components/Modals/TopicListModal";
import SprintCreateModal from "../../../components/Modals/SprintCreateModal";
import { switchViewOption } from "../../../store/modules/mode";

import { connect } from "react-redux";
import {
  getProjectInfo,
  updateProjectInfo,
  deleteProject,
  getProjectJoinStatus,
  joinProject,
} from "../../../store/modules/project";
import { getTeamList } from "../../../store/modules/team";
import {
  getSprintList,
  getInProgressSprint,
} from "../../../store/modules/sprint";
import { RootState } from "../../../store/modules";
import { useRouter } from "next/router";

const backlog = {
  sprintNo: null,
  title: "Backlog",
};

//styled-components
const Button = styled.button`
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const FilledButton = styled(Button)`
  padding: 5px 10px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: none;
  border-radius: 3px;
`;
const UnfilledButton = styled(Button)`
  background-color: inherit;
  border: none;
  text-decoration: underline;
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const WarnButton = styled(Button)`
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.warnColor};
  align-self: flex-end;
  margin-top: 20px;
`;
const WorkSpace = styled.div`
  width: inherit;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const FlexBox = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TopBar = styled(FlexBox)`
  justify-content: flex-start;
  height: 70px;
  * {
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  h1 {
    margin-right: 15px;
    font-size: 30px;
    &:hover {
      cursor: text;
    }
  }
  input {
    width: auto;
    margin: 25px 15px 25px 0;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    opacity: 0.7;
    &:focus {
      opacity: 1;
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    }
    &:hover {
      cursor: text;
    }
  }
`;
const ButtonBox = styled.div`
  ${UnfilledButton} {
    margin-left: 10px;
  }
`;
const SprintsBox = styled.div`
  margin-top: 10px;
  height: 100%;
  overflow-y: scroll;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
`;

const mapStateToProps = (state: RootState) => {
  return {
    projectInfo: state.projectReducer.projectInfo,
    teamList: state.teamReducer.teamList,
    sprintList: state.sprintReducer.sprintList,
    isLogin: state.userReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    switchViewOption: () => dispatch(switchViewOption()),
    getProjectInfo: (projectNo: string) => dispatch(getProjectInfo(projectNo)),
    deleteProject: (projectNo: string) => dispatch(deleteProject(projectNo)),
    joinProject: (projectInfo: any) => dispatch(joinProject(projectInfo)),
    getTeamList: (projectNo: string) => dispatch(getTeamList(projectNo)),
    getSprintList: (projectNo: string) => dispatch(getSprintList(projectNo)),
    updateProjectInfo: (projectNewInfo: any) =>
      dispatch(updateProjectInfo(projectNewInfo)),
    getProjectJoinStatus: (projectNo: string) =>
      dispatch(getProjectJoinStatus(projectNo)),
    getInProgressSprint: (projectNo: string) =>
      dispatch(getInProgressSprint(projectNo)),
  };
};

const ProjectSpace = ({
  getProjectInfo,
  projectInfo,
  updateProjectInfo,
  deleteProject,
  getProjectJoinStatus,
  isLogin,
  joinProject,
  getTeamList,
  teamList,
  sprintList,
  getSprintList,
  getInProgressSprint,
  switchViewOption,
}: {
  getProjectInfo: any;
  projectInfo: any;
  updateProjectInfo: any;
  deleteProject: any;
  getProjectJoinStatus: any;
  isLogin: boolean;
  joinProject: any;
  getTeamList: any;
  sprintList: any;
  teamList: any;
  getSprintList: any;
  getInProgressSprint: any;
  switchViewOption: any;
}) => {
  const router = useRouter();

  const [isReady, setIsReady] = useState<boolean>(false);

  const [onlyMyIssue, setOnlyMyIssue] = useState<boolean>(false);
  const [projectNo, setProjectNo] = useState<string>("");
  const [isManager, setIsManager] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [teams, setTeams] = useState<Array<Object>>([]);
  const [sprints, setSprints] = useState<Array<Object>>([]);
  const [comment] = useState<string>(
    "프로젝트 종료 시<br/> 프로젝트 내 활동 정보가 모두 삭제되며, <br/> 삭제된 데이터는 복구가 불가합니다.<br/><br/> 정말 종료하시겠습니까?"
  );

  const [updateTitle, setUpdateTitle] = useState<boolean>(false);
  const [topicListModal, setTopicListModal] = useState<boolean>(false);
  const [topicCreateModal, setTopicCreateModal] = useState<boolean>(false);
  const [sprintCreateModal, setSprintCreateModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);

  const showTopicListModal = () => setTopicListModal((cur) => !cur);
  const showTopicCreateModal = () => setTopicCreateModal((cur) => !cur);
  const showSprintCreateModal = () => setSprintCreateModal((cur) => !cur);
  const showWarningModal = () => setWarningModal((cur) => !cur);

  //update project
  const onKeyUpProjectName = (e: any) => {
    if (e.key !== "Enter") return;
    updateProjectName();
  };
  const updateProjectName = () => {
    updateProjectInfo({
      projectNo,
      title,
    });
    setUpdateTitle((cur) => !cur);
  };

  //delete project
  const onDeleteProject = () =>
    deleteProject(projectNo).then((res: any) => router.push("/"));

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
    //이슈 옮겨졌을 때 이슈 수정 post api 로직 필요
    //그 후 재렌더링 로직 필요
  };

  //DOM 준비되었는지, login 상태인지, project에 속한 멤버인지 확인 후 렌더링
  useEffect(() => {
    if (!router.isReady) return;

    const value = router.query.projectCode as string;
    setProjectNo(value);

    if (isLogin) {
      getProjectJoinStatus(value).then((res: any) => {
        if (!res.payload) {
          joinProject({ projectNo: value }).then((res: any) =>
            setIsReady(true)
          );
        } else {
          setIsReady(true);
        }
      });
    } else {
      alert("Please login first");
      router.push("/");
    }
  }, [router.asPath]);

  useEffect(() => {
    if (!projectNo) return;

    getProjectInfo(projectNo);
    getSprintList(projectNo);
    getTeamList(projectNo);
    getInProgressSprint(projectNo);
  }, [projectNo]);

  useEffect(() => {
    if (!projectInfo) return;

    setTitle(projectInfo.title);

    if (projectInfo.role === "MANAGER") setIsManager(true);
    else setIsManager(false);
  }, [projectInfo]);

  useEffect(() => {
    if (!teamList) return;

    setTeams(teamList);
  }, [teamList]);

  useEffect(() => {
    if (!sprintList) return;

    setSprints(sprintList);
  }, [sprintList]);

  return (
    <>
      {isReady ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <WorkSpace>
            {updateTitle ? (
              <TopBar>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyUp={onKeyUpProjectName}
                  value={title}
                  placeholder="Type Project Name"
                  required
                  autoFocus
                />
                <FaCheck onClick={updateProjectName} />
              </TopBar>
            ) : (
              <TopBar>
                <h1>{title}</h1>
                {isManager ? (
                  <FaPen onClick={() => setUpdateTitle((cur) => !cur)} />
                ) : null}
              </TopBar>
            )}
            <FlexBox>
              <UnfilledButton onClick={switchViewOption}>
                Only My Issues
              </UnfilledButton>
              <ButtonBox>
                <FilledButton onClick={showSprintCreateModal}>
                  Create Sprint
                </FilledButton>
                <SprintCreateModal
                  sprintCreateModal={sprintCreateModal}
                  showSprintCreateModal={showSprintCreateModal}
                />
                <UnfilledButton onClick={showTopicListModal}>
                  Topic
                </UnfilledButton>
                <TopicListModal
                  topicListModal={topicListModal}
                  showTopicListModal={showTopicListModal}
                  showTopicCreateModal={showTopicCreateModal}
                />
                <TopicCreateModal
                  topicCreateModal={topicCreateModal}
                  showTopicListModal={showTopicListModal}
                  showTopicCreateModal={showTopicCreateModal}
                />
              </ButtonBox>
            </FlexBox>
            <SprintsBox>
              {sprints?.map((sprint, index) => (
                <Sprint sprint={sprint} key={index} teamList={teams} />
              ))}
              <Sprint sprint={backlog} teamList={teams} />
            </SprintsBox>
            {isManager ? (
              <WarnButton onClick={showWarningModal}>프로젝트 종료</WarnButton>
            ) : null}
            <WarningModal
              warningModal={warningModal}
              showWarningModal={showWarningModal}
              comment={comment}
              deleteFunc={onDeleteProject}
            />
          </WorkSpace>
        </DragDropContext>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSpace);
