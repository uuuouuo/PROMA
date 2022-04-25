//해당 스프린트 내 해당 팀 내 이슈 컴포넌트
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ThemeType } from "../../interfaces/style";

interface IssueType {
  issueNo: number;
  issueTitle: string;
  description: string;
  assignee: string;
}

//styled-components
const IssueBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.subBeigeColor};
  color: black;
  padding: 3px 15px;
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Issue = ({
  issue,
  droppableId,
}: {
  issue: IssueType;
  droppableId: string;
}) => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const draggableId = `${droppableId}_${issue.issueTitle}`;
  return (
    <>
      {isReady ? (
        <Draggable
          draggableId={draggableId}
          index={issue.issueNo}
          key={issue.issueNo}
        >
          {(provided) => (
            <IssueBox
              ref={provided.innerRef}
              {...provided.dragHandleProps} //드래그를 하기 위해 마우스로 선택할 수 있는 영역
              {...provided.draggableProps} //드래그 되는 영역
            >
              <div>
                <p>이슈번호: {issue.issueNo}</p>
                <p>제목: {issue.issueTitle}</p>
              </div>
              <p>담당자: {issue.assignee}</p>
            </IssueBox>
          )}
        </Draggable>
      ) : null}
    </>
  );
};

export default Issue;
