/* eslint-disable */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaPen, FaCheck } from "react-icons/fa";
import { ThemeType } from "../../../../interfaces/style";
import Image from "next/image";
import Link from "next/link";

import WarningModal from "../../../../components/Modals/WarningModal";
import IssueCreateModal from "../../../../components/Modals/IssueCreateModal";
import {
  getToDoIssues,
  getInProgressIssues,
  getDoneIssues,
  updateIssueStatus,
} from "../../../../store/modules/issue";
import { switchViewOption } from "../../../../store/modules/mode";
import { getInProgressSprint } from "../../../../store/modules/sprint";

import { connect } from "react-redux";
import {
  getTeamInfo,
  updateTeamInfo,
  deleteTeam,
  outTeam,
} from "../../../../store/modules/team";
import { RootState } from "../../../../store/modules";

//styled-components
const TeamSpaceContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
  position: relative;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  button {
    height: 20px;
    margin-left: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  input {
    font-size: 20px;
  }
  span {
    font-size: 20px;
    margin-right: 15px;
  }
`;
const TopBar = styled(FlexBox)`
  justify-content: flex-start;
  height: 70px;
  * {
    font-size: 18px;
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
const SubTopBar = styled(FlexBox)`
  justify-content: space-between;
  * {
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  h2 {
    margin-left: 3px;
    margin-right: 20px;
    font-size: 20px;
    font-weight: 500;
    &:hover {
      cursor: text;
    }
  }
  input {
    width: auto;
    margin: 25px 15px 25px 0;
    font-size: 15px;
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
const ButtonBox = styled(FlexBox)`
  justify-content: space-between;
  button {
    background-color: inherit;
    text-decoration: underline;
    border: none;
    font-size: 15px;
    color: ${(props: ThemeType) => props.theme.textColor};
  }
`;
const WorkSpace = styled.div`
  height: 73vh;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  color: ${(props: ThemeType) => props.theme.textColor};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  border-radius: 3px;
`;
const StatusBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  height: 73vh;
  h2 {
    font-weight: 500;
  }
`;
const IssueContainer = styled(StatusBox)`
  padding: 0;
  height: inherit;
  overflow-y: scroll;
`;
const IssueSubBox = styled.div`
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
`;
const IssueBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.subBeigeColor};
  color: black;
  padding: 0px 15px;
  margin-bottom: 7px;
  font-weight: 400;
  display: grid;
  grid-template-columns: 4fr 1fr;
  ${IssueSubBox} {
    &:first-child {
      display: grid;
      grid-template-columns: 1fr 5fr;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
  .doneIssue {
    text-decoration: line-through;
  }
`;
const WarnButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 25px;
  button {
    color: ${(props: ThemeType) => props.theme.warnColor};
    background-color: inherit;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;
const ImageBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
`;

const mapStateToProps = (state: RootState) => {
  return {
    teamInfo: state.teamReducer.teamInfo,
    isInProgress: state.sprintReducer.isInProgress,
    inProgressSprintInfo: state.sprintReducer.inProgressSprintInfo,
    onlyMyIssue: state.modeReducer.onlyMyIssue,
    toDoIssues: state.issueReducer.toDoList,
    inProgressIssues: state.issueReducer.inProgressList,
    doneIssues: state.issueReducer.doneList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTeamInfo: (teamNo: string) => dispatch(getTeamInfo(teamNo)),
    updateTeamInfo: (teamInfo: any) => dispatch(updateTeamInfo(teamInfo)),
    deleteTeam: (teamInfo: any) => dispatch(deleteTeam(teamInfo)),
    outTeam: (teamInfo: any) => dispatch(outTeam(teamInfo)),
    switchViewOption: () => dispatch(switchViewOption()),
    getToDoIssues: (params: any) => dispatch(getToDoIssues(params)),
    getInProgressIssues: (params: any) => dispatch(getInProgressIssues(params)),
    getDoneIssues: (params: any) => dispatch(getDoneIssues(params)),
    getInProgressSprint: (projectNo: string) =>
      dispatch(getInProgressSprint(projectNo)),
    updateIssueStatus: (issueInfo: any) =>
      dispatch(updateIssueStatus(issueInfo)),
  };
};

const TeamSpace = ({
  getTeamInfo,
  teamInfo,
  updateTeamInfo,
  deleteTeam,
  outTeam,
  switchViewOption,
  getInProgressSprint,
  isInProgress,
  inProgressSprintInfo,
  onlyMyIssue,
  toDoIssues,
  inProgressIssues,
  doneIssues,
  getToDoIssues,
  getInProgressIssues,
  getDoneIssues,
  updateIssueStatus,
}: {
  getTeamInfo: any;
  teamInfo: any;
  updateTeamInfo: any;
  deleteTeam: any;
  outTeam: any;
  switchViewOption: any;
  getInProgressSprint: any;
  isInProgress: boolean;
  inProgressSprintInfo: any;
  onlyMyIssue: boolean;
  toDoIssues: any;
  inProgressIssues: any;
  doneIssues: any;
  getToDoIssues: any;
  getInProgressIssues: any;
  getDoneIssues: any;
  updateIssueStatus: any;
}) => {
  const router = useRouter();

  const [updateTitle, setUpdateTitle] = useState<boolean>(false);
  const [projectNo, setProjectNo] = useState<string>("");
  const [teamNo, setTeamNo] = useState<number>(0);
  const [teamName, setTeamName] = useState<string>("");
  const [sprintInfo, setSprintInfo] = useState<any>({});
  const [isMember, setIsMember] = useState<boolean>(false);
  const [toDoList, setToDoList] = useState<any>([]);
  const [inProgressList, setInProgressList] = useState<any>([]);
  const [doneList, setDoneList] = useState<any>([]);

  const [issueCreateModal, setIssueCreateModal] = useState<boolean>(false);
  const [warningTeamOutModal, setWarningTeamOutModal] =
    useState<boolean>(false);
  const [warningTeamDeleteModal, setWarningTeamDeleteModal] =
    useState<boolean>(false);
  const [teamOutComment] = useState<string>(
    "팀을 나가는 즉시<br/> 팀 내 활동 정보가 모두 삭제되며, <br/> 삭제된 데이터는 복구가 불가합니다.<br/><br/> 팀에서 나가시겠습니까?"
  );
  const [teamDeleteComment] = useState<string>(
    "팀을 삭제하면 즉시<br/> 팀 내 모든 활동 정보가 모두 삭제되며, <br/> 삭제된 데이터는 복구가 불가합니다.<br/><br/> 팀에서 삭제하시겠습니까?"
  );

  const showIssueCreateModal = () => setIssueCreateModal((cur) => !cur);
  const showWarningTeamOutModal = () => setWarningTeamOutModal((cur) => !cur);
  const showWarningTeamDeleteModal = () =>
    setWarningTeamDeleteModal((cur) => !cur);

  //update team
  const onKeyUpTeamName = (e: any) => {
    if (e.key !== "Enter") return;
    updateTeamName();
  };
  const updateTeamName = () => {
    updateTeamInfo({
      teamNo,
      title: teamName,
    });
    setUpdateTitle((cur) => !cur);
  };

  const onOutTeam = () =>
    outTeam({ teamNo, projectNo }).then((res: any) =>
      router.push(`/project/${projectNo}`)
    );
  const onDeleteTeam = () => deleteTeam({ teamNo, projectNo });

  const getIssues = () => {
    const params = {
      onlyMyIssue,
      sprintNo: sprintInfo.sprintNo,
      status: "todo",
      teamNo,
    };
    console.log(params);

    getToDoIssues(params);
    getInProgressIssues({ ...params, status: "inprogress" });
    getDoneIssues({ ...params, status: "done" });
  };

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    const targetIssueNo = args.draggableId;
    const fromStatus = args.source.droppableId;
    const fromIndex = args.source.index;
    const toStatus = args.destination.droppableId;
    const toIndex = args.destination.index;

    let targetIssue = {};
    if (fromStatus === toStatus) {
      return;
    } else {
      if (fromStatus === "todo") {
        targetIssue = toDoList[fromIndex];
        const newToDoList = [...toDoList];
        newToDoList.splice(fromIndex, 1);
        setToDoList(newToDoList);
      } else if (fromStatus === "inprogress") {
        targetIssue = inProgressList[fromIndex];
        const newInProgressList = [...inProgressList];
        newInProgressList.splice(fromIndex, 1);
        setInProgressList(newInProgressList);
      } else {
        targetIssue = doneList[fromIndex];
        const newDoneList = [...doneList];
        newDoneList.splice(fromIndex, 1);
        setDoneList(newDoneList);
      }

      if (toStatus === "todo") {
        const newToDoList = [...toDoList];
        newToDoList.splice(toIndex, 0, targetIssue);
        setToDoList(newToDoList);
      } else if (toStatus === "inprogress") {
        const newInProgressList = [...inProgressList];
        newInProgressList.splice(toIndex, 0, targetIssue);
        setInProgressList(newInProgressList);
      } else {
        const newDoneList = [...doneList];
        newDoneList.splice(toIndex, 0, targetIssue);
        setDoneList(newDoneList);
      }

      updateIssueStatus({
        issueNo: targetIssueNo,
        status: toStatus,
      }).then((res: any) => getIssues());
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const projectCode = router.query.projectCode as string;
    const teamCode = router.query.teamCode as string;

    setProjectNo(projectCode);
    setTeamNo(parseInt(teamCode));

    getTeamInfo(teamCode);
  }, [router.asPath]);

  useEffect(() => {
    if (!projectNo) return;
    getInProgressSprint(projectNo).then((res: any) => {
      const status = res.payload;
      if (!status) {
        alert(
          "이슈 진행 상태 관리는 활성화된 스프린트에서만 가능합니다. 먼저 스프린트를 활성화해주세요."
        );
      } else {
        console.log("sprint is active");
      }
    });
  }, [projectNo]);

  useEffect(() => {
    if (!teamInfo) return;
    setIsMember(teamInfo.isMember);
    setTeamName(teamInfo.title);
  }, [teamInfo]);

  useEffect(() => {
    getIssues();
  }, [onlyMyIssue]);

  useEffect(() => {
    if (!inProgressSprintInfo) return;
    setSprintInfo(inProgressSprintInfo);
  }, [inProgressSprintInfo]);

  useEffect(() => {
    if (!toDoIssues) return;
    setToDoList(toDoIssues);
  }, [toDoIssues]);

  useEffect(() => {
    if (!inProgressIssues) return;
    setInProgressList(inProgressIssues);
  }, [inProgressIssues]);

  useEffect(() => {
    if (!doneIssues) return;
    setDoneList(doneIssues);
  }, [doneIssues]);

  return (
    <>
      {isInProgress ? (
        <TeamSpaceContainer>
          <TopBar>
            {updateTitle ? (
              <FlexBox>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onKeyUp={onKeyUpTeamName}
                  placeholder="Type Team Name"
                  required
                  autoFocus
                />
                <FaCheck onClick={updateTeamName} />
              </FlexBox>
            ) : (
              <FlexBox>
                <h1>{teamName}</h1>
                {isMember ? (
                  <FaPen onClick={() => setUpdateTitle((cur) => !cur)} />
                ) : null}
              </FlexBox>
            )}
          </TopBar>

          <SubTopBar>
            <FlexBox>
              <span>Active Sprint: </span>
              <h2>{inProgressSprintInfo.title}</h2>
            </FlexBox>
            {isMember ? (
              <ButtonBox>
                <button onClick={switchViewOption}>
                  {onlyMyIssue ? "View every Issue" : "Only My Issue"}
                </button>
                <button onClick={showIssueCreateModal}>+ Add Issue</button>
                <IssueCreateModal
                  issueCreateModal={issueCreateModal}
                  showIssueCreateModal={showIssueCreateModal}
                  teamNo={teamNo}
                  sprintNo={sprintInfo.sprintNo}
                  getIssues={getIssues}
                />
              </ButtonBox>
            ) : null}
          </SubTopBar>

          <DragDropContext onDragEnd={onDragEnd}>
            <WorkSpace>
              <>
                <Droppable droppableId="todo">
                  {(provided) => (
                    <StatusBox>
                      <h2>To Do</h2>
                      <IssueContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {toDoList
                          ? toDoList.map((issue: any, index: number) => (
                              <Draggable
                                draggableId={`${issue.issueNo}`}
                                index={index}
                                key={index}
                              >
                                {(provided) => (
                                  <IssueBox
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps} //드래그를 하기 위해 마우스로 선택할 수 있는 영역
                                    {...provided.draggableProps} //드래그 되는 영역
                                  >
                                    <IssueSubBox>
                                      <p className="issue_number">
                                        No. {issue.issueNo}
                                      </p>
                                      <Link
                                        href={`/project/${projectNo}/issue/${issue.issueNo}`}
                                      >
                                        <a>
                                          <p>{issue.title}</p>
                                        </a>
                                      </Link>
                                    </IssueSubBox>
                                    <IssueSubBox>
                                      <ImageBox>
                                        <Image
                                          src={`${
                                            issue.assignee
                                              ? issue.assignee.image
                                              : "/profileImg.png"
                                          }`}
                                          width={20}
                                          height={20}
                                        />
                                      </ImageBox>
                                      <p>{issue.assignee.nickname}</p>
                                    </IssueSubBox>
                                  </IssueBox>
                                )}
                              </Draggable>
                            ))
                          : null}
                      </IssueContainer>
                      {provided.placeholder}
                    </StatusBox>
                  )}
                </Droppable>
              </>
              <Droppable droppableId="inprogress">
                {(provided) => (
                  <StatusBox>
                    <h2>In Progress</h2>
                    <IssueContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {inProgressList
                        ? inProgressList.map((issue: any, index: number) => (
                            <Draggable
                              draggableId={`${issue.issueNo}`}
                              index={index}
                              key={index}
                            >
                              {(provided) => (
                                <IssueBox
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps} //드래그를 하기 위해 마우스로 선택할 수 있는 영역
                                  {...provided.draggableProps} //드래그 되는 영역
                                >
                                  <IssueSubBox>
                                    <p className="issue_number">
                                      No. {issue.issueNo}
                                    </p>
                                    <Link
                                      href={`/project/${projectNo}/issue/${issue.issueNo}`}
                                    >
                                      <a>
                                        <p>{issue.title}</p>
                                      </a>
                                    </Link>
                                  </IssueSubBox>
                                  <IssueSubBox>
                                    <ImageBox>
                                      <Image
                                        src={`${
                                          issue.assignee
                                            ? issue.assignee.image
                                            : "/profileImg.png"
                                        }`}
                                        width={20}
                                        height={20}
                                      />
                                    </ImageBox>
                                    <p>{issue.assignee.nickname}</p>
                                  </IssueSubBox>
                                </IssueBox>
                              )}
                            </Draggable>
                          ))
                        : null}
                    </IssueContainer>
                    {provided.placeholder}
                  </StatusBox>
                )}
              </Droppable>
              <Droppable droppableId="done">
                {(provided) => (
                  <StatusBox>
                    <h2>Done</h2>
                    <IssueContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {doneList
                        ? doneList.map((issue: any, index: number) => (
                            <Draggable
                              draggableId={`${issue.issueNo}`}
                              index={index}
                              key={index}
                            >
                              {(provided) => (
                                <IssueBox
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps} //드래그를 하기 위해 마우스로 선택할 수 있는 영역
                                  {...provided.draggableProps} //드래그 되는 영역
                                >
                                  <IssueSubBox>
                                    <p className="issue_number">
                                      No. {issue.issueNo}
                                    </p>
                                    <Link
                                      href={`/project/${projectNo}/issue/${issue.issueNo}`}
                                    >
                                      <a>
                                        <p className="doneIssue">
                                          {issue.title}
                                        </p>
                                      </a>
                                    </Link>
                                  </IssueSubBox>
                                  <IssueSubBox>
                                    <ImageBox>
                                      <Image
                                        src={`${
                                          issue.assignee
                                            ? issue.assignee.image
                                            : "/profileImg.png"
                                        }`}
                                        width={20}
                                        height={20}
                                      />
                                    </ImageBox>
                                    <p>{issue.assignee.nickname}</p>
                                  </IssueSubBox>
                                </IssueBox>
                              )}
                            </Draggable>
                          ))
                        : null}
                    </IssueContainer>
                    {provided.placeholder}
                  </StatusBox>
                )}
              </Droppable>
            </WorkSpace>
          </DragDropContext>
          {isMember ? (
            <WarnButtonBox>
              <button onClick={showWarningTeamOutModal}>팀 나가기</button>
              <button onClick={showWarningTeamDeleteModal}>팀 삭제</button>

              <WarningModal
                warningModal={warningTeamOutModal}
                showWarningModal={showWarningTeamOutModal}
                comment={teamOutComment}
                deleteFunc={onOutTeam}
              />
              <WarningModal
                warningModal={warningTeamDeleteModal}
                showWarningModal={showWarningTeamDeleteModal}
                comment={teamDeleteComment}
                deleteFunc={onDeleteTeam}
              />
            </WarnButtonBox>
          ) : null}
        </TeamSpaceContainer>
      ) : (
        <TeamSpaceContainer>
          <TopBar>
            {updateTitle ? (
              <FlexBox>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onKeyUp={onKeyUpTeamName}
                  placeholder="Type Team Name"
                  required
                  autoFocus
                />
                <FaCheck onClick={updateTeamName} />
              </FlexBox>
            ) : (
              <FlexBox>
                <h1>{teamName}</h1>
                {isMember ? (
                  <FaPen onClick={() => setUpdateTitle((cur) => !cur)} />
                ) : null}
              </FlexBox>
            )}
          </TopBar>
          {isMember ? (
            <WarnButtonBox>
              <button onClick={showWarningTeamOutModal}>팀 나가기</button>
              <button onClick={showWarningTeamDeleteModal}>팀 삭제</button>

              <WarningModal
                warningModal={warningTeamOutModal}
                showWarningModal={showWarningTeamOutModal}
                comment={teamOutComment}
                deleteFunc={onOutTeam}
              />
              <WarningModal
                warningModal={warningTeamDeleteModal}
                showWarningModal={showWarningTeamDeleteModal}
                comment={teamDeleteComment}
                deleteFunc={onDeleteTeam}
              />
            </WarnButtonBox>
          ) : null}
        </TeamSpaceContainer>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSpace);
