/* eslint-disable */
//해당 스프린트 내 해당 팀 내 이슈 컴포넌트
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ThemeType } from "../../interfaces/style";
import Image from "next/image";

interface IssueType {
  issueNo: number;
  title: string;
  description: string;
  assignee: {
    userNo: string;
    nickname: string;
  };
}

//styled-components
const IssueBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.subBeigeColor};
  color: black;
  padding: 0 15px;
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;
const TitleBox = styled(FlexBox)`
  p {
    &:first-child {
      width: 70px;
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

  return (
    <>
      {isReady ? (
        <Draggable
          draggableId={`${droppableId}_${issue.issueNo}`}
          index={issue.issueNo}
          key={issue.issueNo}
        >
          {(provided) => (
            <IssueBox
              ref={provided.innerRef}
              {...provided.dragHandleProps} //드래그를 하기 위해 마우스로 선택할 수 있는 영역
              {...provided.draggableProps} //드래그 되는 영역
            >
              <TitleBox>
                <p>No. {issue.issueNo}</p>
                <p>{issue.title}</p>
              </TitleBox>
              <FlexBox>
                <ImageBox>
                  <Image src="/profileimg.png" width={20} height={20}></Image>
                </ImageBox>
                <p>{issue.assignee.nickname}</p>
              </FlexBox>
            </IssueBox>
          )}
        </Draggable>
      ) : null}
    </>
  );
};

export default Issue;
