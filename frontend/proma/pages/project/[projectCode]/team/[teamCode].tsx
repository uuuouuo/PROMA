import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaPen, FaCheck } from "react-icons/fa";
import { ThemeType } from "../../../../interfaces/style";
import Image from "next/image";
import {
  IssueCreateModal,
  WarningModal,
} from "../../../../components/common/Modal";

import { connect } from "react-redux";
import { getTeamInfo } from "../../../../store/modules/team";
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
  };
};

const TeamSpace = ({
  getTeamInfo,
  teamInfo,
}: {
  getTeamInfo: any;
  teamInfo: any;
}) => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const router = useRouter();

  const [updateTeamName, setUpdateTeamName] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>("Team Name");
  const [updateSprintName, setUpdateSprintName] = useState<boolean>(false);
  const [sprintName, setSprintName] = useState<string>("Sprint Name");

  useEffect(() => {
    if (!router.isReady) return;

    const project_code = router.query.projectCode;
    const team_code = router.query.teamCode;

    getTeamInfo(team_code);
  }, [router.isReady]);

  useEffect(() => {
    setTeamName(teamInfo.title);
  }, [teamInfo]);

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
  };

  //issue create modal
  const [issueCreateModal, setIssueCreateModal] = useState<boolean>(false);
  const showIssueCreateModal = () => setIssueCreateModal((cur) => !cur);

  // 팀 나가기 / 삭제하기
  const [warningListModal, setWarningListModal] = useState<boolean>(false);
  const [warningListModal2, setWarningListModal2] = useState<boolean>(false);
  const [warningCreateModal, setWarningCreateModal] = useState<boolean>(false);
  const [warningCreateModal2, setWarningCreateModal2] =
    useState<boolean>(false);
  const showWarningListModal = () => setWarningListModal((cur) => !cur);
  const showWarningListModal2 = () => setWarningListModal2((cur) => !cur);
  const showWarningCreateModal = () => setWarningCreateModal((cur) => !cur);
  const showWarningCreateModal2 = () => setWarningCreateModal2((cur) => !cur);
  const [comment, setComment] = useState<string>(
    "팀을 나가는 즉시<br/> 팀 내 활동 정보가 모두 삭제되며, <br/> 삭제된 데이터는 복구가 불가합니다.<br/><br/> 팀에서 나가시겠습니까?"
  );
  const [comment2, setComment2] = useState<string>(
    "팀을 삭제하면 즉시<br/> 팀 내 모든 활동 정보가 모두 삭제되며, <br/> 삭제된 데이터는 복구가 불가합니다.<br/><br/> 팀에서 삭제하시겠습니까?"
  );

  return (
    <TeamSpaceContainer>
      <TopBar>
        {updateTeamName ? (
          <FlexBox>
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Type Team Name"
              required
              autoFocus
            />
            <FaCheck onClick={() => setUpdateTeamName((cur) => !cur)} />
          </FlexBox>
        ) : (
          <FlexBox>
            <h1>{teamName}</h1>
            <FaPen onClick={() => setUpdateTeamName((cur) => !cur)} />
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
            <FaPen onClick={() => setUpdateSprintName((cur) => !cur)} />
          </FlexBox>
        )}
        <ButtonBox>
          <button>Only My Issue</button>
          <button onClick={showIssueCreateModal}>+ Add Issue</button>
          <IssueCreateModal
            issueCreateModal={issueCreateModal}
            showIssueCreateModal={showIssueCreateModal}
          />
        </ButtonBox>
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
      <WarnButtonBox>
        <button onClick={showWarningCreateModal}>팀 나가기</button>
        <button onClick={showWarningCreateModal2}>팀 삭제</button>

        <WarningModal
          warningCreateModal={warningCreateModal}
          showWarningListModal={showWarningListModal}
          showWarningCreateModal={showWarningCreateModal}
          comment={comment}
        />
        <WarningModal
          warningCreateModal={warningCreateModal2}
          showWarningListModal={showWarningListModal2}
          showWarningCreateModal={showWarningCreateModal2}
          comment={comment2}
        />
      </WarnButtonBox>
    </TeamSpaceContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSpace);
