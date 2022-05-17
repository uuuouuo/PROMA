/* eslint-disable */
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { ThemeType } from "../../../interfaces/style";
import { FaPen, FaCheck } from "react-icons/fa";

import Sprint from "../../../components/project/Sprint";
import TopicCreateModal from "../../../components/Modals/TopicCreateModal";
import WarningModal from "../../../components/Modals/WarningModal";
import TopicListModal from "../../../components/Modals/TopicListModal";
import SprintCreateModal from "../../../components/Modals/SprintCreateModal";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import { RootState } from "../../../store/modules";
import { switchViewOption } from "../../../store/modules/mode";
import { getInProgressSprint } from "../../../store/modules/sprint";
import {
  getProjectInfo,
  updateProjectInfo,
  deleteProject,
  getProjectJoinStatus,
  joinProject,
} from "../../../store/modules/project";
import {
  getIssueList,
  updateIssueSprint,
  setDndMoved,
} from "../../../store/modules/issue";

//styled-component
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
  align-items: center;
  justify-content: flex-start;
  height: 70px;
  * {
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  h1 {
    margin-right: 15px;
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: 600;
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
  height: 100%;
  overflow-y: scroll;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
`;

const mapStateToProps = (state: RootState) => {
  return {
    projectInfo: state.projectReducer.projectInfo,
    issueList: state.issueReducer.issueList,
    isLogin: state.userReducer.isLogin,
    onlyMyIssue: state.modeReducer.onlyMyIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    switchViewOption: () => dispatch(switchViewOption()),
    getProjectInfo: (projectNo: string) => dispatch(getProjectInfo(projectNo)),
    deleteProject: (projectNo: string) => dispatch(deleteProject(projectNo)),
    joinProject: (projectInfo: any) => dispatch(joinProject(projectInfo)),
    updateProjectInfo: (projectNewInfo: any) =>
      dispatch(updateProjectInfo(projectNewInfo)),
    getProjectJoinStatus: (projectNo: string) =>
      dispatch(getProjectJoinStatus(projectNo)),
    getInProgressSprint: (projectNo: string) =>
      dispatch(getInProgressSprint(projectNo)),
    updateIssueSprint: (issueInfo: any) =>
      dispatch(updateIssueSprint(issueInfo)),
    getIssueList: (params: any) => dispatch(getIssueList(params)),
    setDndMoved: (dndInfo: any) => dispatch(setDndMoved(dndInfo)),
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
  getInProgressSprint,
  switchViewOption,
  onlyMyIssue,
  updateIssueSprint,
  getIssueList,
  issueList,
}: {
  getProjectInfo: any;
  projectInfo: any;
  updateProjectInfo: any;
  deleteProject: any;
  getProjectJoinStatus: any;
  isLogin: boolean;
  joinProject: any;
  getInProgressSprint: any;
  switchViewOption: any;
  onlyMyIssue: boolean;
  updateIssueSprint: any;
  getIssueList: any;
  issueList: any;
}) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  const [projectNo, setProjectNo] = useState<string>("");
  const [isManager, setIsManager] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
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
  const [issueData, setIssueData] = useState<any>([]);

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
    const targetIssueNo = args.draggableId.split("_")[1];
    const fromSprint = args.source.droppableId.split("_")[0];
    const fromTeam = args.source.droppableId.split("_")[1];
    const fromIndex = args.source.index;
    const toSprint = args.destination.droppableId.split("_")[0];
    const toTeam = args.destination.droppableId.split("_")[1];
    const targetSprintNo = args.destination.droppableId.split("_")[2];
    const toIndex = args.destination.index;

    const newDndMoved = {
      targetIssueNo,
      fromSprint,
      fromTeam,
      fromIndex,
      toSprint,
      toTeam,
      targetSprintNo,
      toIndex,
    };

    if (fromTeam !== toTeam) {
      alert("이슈 이동은 같은 팀 내에서만 가능합니다.");
      return;
    } else if (fromSprint === toSprint) {
      return;
    } else {
      updateIssueSprint(
        toSprint
          ? {
              issueNo: targetIssueNo,
              sprintNo: targetSprintNo,
            }
          : { issueNo: targetIssueNo }
      ).then((res: any) => {
        getIssueList({
          onlyMyIssue,
          projectNo,
        });
      });
    }
  };

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
      alert("로그인이 필요합니다.");
      router.push("/");
    }
  }, [router.asPath]);

  useEffect(() => {
    if (!projectNo) return;
    getProjectInfo(projectNo);
    getIssueList({
      projectNo,
      onlyMyIssue,
    });
    getInProgressSprint(projectNo);
  }, [projectNo, onlyMyIssue]);

  useEffect(() => {
    if (!projectInfo) return;
    setTitle(projectInfo.title);

    if (projectInfo.role === "MANAGER") setIsManager(true);
    else setIsManager(false);
  }, [projectInfo]);

  useEffect(() => {
    if (!issueList) return;
    setIssueData(issueList);
  }, [issueList]);

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
                {onlyMyIssue ? "View Every Issue" : "Only My Issues"}
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
              {issueData?.map((sprint: any, index: number) => (
                <Sprint sprint={sprint} key={index} sprintIndex={index} />
              ))}
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
