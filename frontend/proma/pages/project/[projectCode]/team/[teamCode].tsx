import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaPen, FaCheck } from "react-icons/fa";
import { ThemeType } from "../../../../interfaces/style";
import Image from "next/image";

import WarningModal from "../../../../components/Modals/WarningModal";
import { IssueCreateModal } from "../../../../components/common/Modal";

import { connect } from "react-redux";
import {
  getTeamInfo,
  updateTeamInfo,
  deleteTeam,
  outTeam,
} from "../../../../store/modules/team";
import { RootState } from "../../../../store/modules";

//team info get api 필요

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
    font-size: 25px;
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

//더미 데이터
const issueData = [
  {
    issueNo: 0,
    issueTitle: "컴포넌트 구성",
    description: "컴포넌트 구성합니다.",
    assignee: "Sue",
  },
  {
    issueNo: 1,
    issueTitle: "db 설계",
    description: "db 설계합니다.",
    assignee: "Eus",
  },
];

const mapStateToProps = (state: RootState) => {
  return {
    teamInfo: state.teamReducer.teamInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTeamInfo: (teamNo: string) => dispatch(getTeamInfo(teamNo)),
    updateTeamInfo: (teamInfo: any) => dispatch(updateTeamInfo(teamInfo)),
    deleteTeam: (teamInfo: any) => dispatch(deleteTeam(teamInfo)),
    outTeam: (teamInfo: any) => dispatch(outTeam(teamInfo)),
  };
};

const TeamSpace = ({
  getTeamInfo,
  teamInfo,
  updateTeamInfo,
  deleteTeam,
  outTeam,
}: {
  getTeamInfo: any;
  teamInfo: any;
  updateTeamInfo: any;
  deleteTeam: any;
  outTeam: any;
}) => {
  const router = useRouter();

  const [isReady, setIsReady] = useState<boolean>(false);

  const [updateTitle, setUpdateTitle] = useState<boolean>(false);
  const [projectNo, setProejctNo] = useState<string>("");
  const [teamNo, setTeamNo] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("Team Name");
  const [updateSprintName, setUpdateSprintName] = useState<boolean>(false);
  const [sprintName, setSprintName] = useState<string>("Sprint Name");
  const [isMember, setIsMember] = useState<boolean>(false);

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

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
  };

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

  //DOM 준비되었을 때 렌더링
  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const projectCode = router.query.projectCode as string;
    const teamCode = router.query.teamCode as string;

    setProejctNo(projectCode);
    setTeamNo(teamCode);

    getTeamInfo(teamCode);
  }, [router.asPath]);

  useEffect(() => {
    setTeamName(teamInfo.title);
    setIsMember(teamInfo.isMember);
  }, [teamInfo]);

  return (
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
            <FaCheck onClick={() => updateTeamName} />
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
        {updateSprintName ? (
          <FlexBox>
            <span>Active: </span>
            <input
              value={sprintName}
              onChange={(e) => setSprintName(e.target.value)}
              placeholder="Type Sprint Name"
              required
              autoFocus
            />
            <FaCheck onClick={() => setUpdateSprintName((cur) => !cur)} />
          </FlexBox>
        ) : (
          <FlexBox>
            <span>Active: </span>
            <h2>{sprintName}</h2>
            {isMember ? (
              <FaPen onClick={() => setUpdateSprintName((cur) => !cur)} />
            ) : null}
          </FlexBox>
        )}
        {isMember ? (
          <ButtonBox>
            <button>Only My Issue</button>
            <button onClick={showIssueCreateModal}>+ Add Issue</button>
            <IssueCreateModal
              issueCreateModal={issueCreateModal}
              showIssueCreateModal={showIssueCreateModal}
            />
          </ButtonBox>
        ) : null}
      </SubTopBar>

      {isReady ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <WorkSpace>
            <Droppable droppableId="todo">
              {(provided) => (
                <StatusBox ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>To Do</h2>
                  <IssueContainer>
                    {issueData.map((issue, index) => (
                      <Draggable
                        draggableId={`todo_${issue.issueTitle}`}
                        index={issue.issueNo}
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
                              <p>{issue.issueTitle}</p>
                            </IssueSubBox>
                            <IssueSubBox>
                              <ImageBox>
                                <Image
                                  src="/profileimg.png"
                                  width={20}
                                  height={20}
                                />
                              </ImageBox>
                              <p>{issue.assignee}</p>
                            </IssueSubBox>
                          </IssueBox>
                        )}
                      </Draggable>
                    ))}
                  </IssueContainer>
                  {provided.placeholder}
                </StatusBox>
              )}
            </Droppable>
            <Droppable droppableId="inprogress">
              {(provided) => (
                <StatusBox ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>In Progress</h2>
                  <IssueContainer>
                    {issueData.map((issue, index) => (
                      <Draggable
                        draggableId={`inprogress_${issue.issueTitle}`}
                        index={issue.issueNo}
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
                              <p>{issue.issueTitle}</p>
                            </IssueSubBox>
                            <IssueSubBox>
                              <ImageBox>
                                <Image
                                  src="/profileimg.png"
                                  width={20}
                                  height={20}
                                />
                              </ImageBox>
                              <p>{issue.assignee}</p>
                            </IssueSubBox>
                          </IssueBox>
                        )}
                      </Draggable>
                    ))}
                  </IssueContainer>
                  {provided.placeholder}
                </StatusBox>
              )}
            </Droppable>
            <Droppable droppableId="done">
              {(provided) => (
                <StatusBox ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>Done</h2>
                  <IssueContainer>
                    {issueData.map((issue, index) => (
                      <Draggable
                        draggableId={`done_${issue.issueTitle}`}
                        index={issue.issueNo}
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
                              <p>{issue.issueTitle}</p>
                            </IssueSubBox>
                            <IssueSubBox>
                              <ImageBox>
                                <Image
                                  src="/profileimg.png"
                                  width={20}
                                  height={20}
                                />
                              </ImageBox>
                              <p>{issue.assignee}</p>
                            </IssueSubBox>
                          </IssueBox>
                        )}
                      </Draggable>
                    ))}
                  </IssueContainer>
                  {provided.placeholder}
                </StatusBox>
              )}
            </Droppable>
          </WorkSpace>
        </DragDropContext>
      ) : null}
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSpace);
