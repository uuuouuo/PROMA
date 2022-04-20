import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//team info get api 필요

//styled-components
const TeamSpaceContainer = styled.div`
  width: 100%;
  padding: 30px;
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
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonBox = styled(FlexBox)`
  justify-content: space-between;
  button {
    background-color: inherit;
    text-decoration: underline;
    border: none;
    font-size: 15px;
  }
`;
const WorkSpace = styled.div`
  height: 70vh;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const StatusBox = styled.div`
  border-radius: 3px;
  background-color: #bfb9c7;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  height: inherit;
`;
const IssueContainer = styled(StatusBox)`
  padding: 0;
  height: inherit;
  overflow-y: scroll;
`;
const IssueBox = styled.div`
  border-radius: 3px;
  background-color: white;
  padding: 0px 15px;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 600;
  p {
    margin-right: 10px;
    &:last-child {
      position: absolute;
      right: 10px;
    }
  }
`;
const WarnButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  button {
    color: red;
    background-color: inherit;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

//더미 데이터
const teamname = "Team Name";

const teamData = {
  teamNo: 0,
  teamName: "frontend",
  projectNo: 10,
};
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

const TeamSpace = () => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const router = useRouter();

  const [isUpdated, setIsUpdated] = useState(false);
  const [teamName, setTeamName] = useState(teamname);
  const [projectCode, setProjectCode] = useState<string>("");
  const [teamCode, setTeamCode] = useState<string>("");

  const toggleUpdateStatus = () => setIsUpdated((cur) => !cur);
  const onChangeTeamName = (e: any) => {
    setTeamName(e.target.value);
  };

  useEffect(() => {
    if (!router.isReady) return;

    const project_code = router.query.projectCode;
    const team_code = router.query.teamCode;

    setProjectCode(project_code as string);
    setTeamCode(team_code as string);
  }, [router.isReady]);

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
  };

  //팀 별 이슈 get api 로직 필요

  //해당 스프린트 해당 팀의 새로운 이슈 생성 로직
  const addNewIssue = () => {};

  return (
    <TeamSpaceContainer>
      {isUpdated ? (
        <FlexBox>
          <input type="text" value={teamName} onChange={onChangeTeamName} />
          <button onClick={toggleUpdateStatus}>완료</button>
        </FlexBox>
      ) : (
        <FlexBox>
          <h1>{teamName}</h1>
          <button onClick={toggleUpdateStatus}>수정</button>
        </FlexBox>
      )}
      <TopBar>
        <h2>현재 스프린트</h2>
        <ButtonBox>
          <button>Only My Issue</button>
          <button onClick={addNewIssue}>+ Add Issue</button>
        </ButtonBox>
      </TopBar>
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
                            <p>이슈번호: {issue.issueNo}</p>
                            <p>제목: {issue.issueTitle}</p>
                            <p>담당자: {issue.assignee}</p>
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
                            <p>이슈번호: {issue.issueNo}</p>
                            <p>제목: {issue.issueTitle}</p>
                            <p>담당자: {issue.assignee}</p>
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
                            <p>이슈번호: {issue.issueNo}</p>
                            <p>제목: {issue.issueTitle}</p>
                            <p>담당자: {issue.assignee}</p>
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
        <button>팀 나가기</button>
        <button>팀 삭제</button>
      </WarnButtonBox>
    </TeamSpaceContainer>
  );
};

export default TeamSpace;
