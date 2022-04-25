//프로젝트 워크스페이스
import styled from "styled-components";
import Sprint from "../../../components/project/Sprint";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ThemeType } from "../../../interfaces/style";

//해당 프로젝트 내 스프린트 get api 로직 필요

//dummy data
const sprints: any[] = [
  {
    sprintNo: 0,
    sprintName: "1주차",
  },
  {
    sprintNo: 1,
    sprintName: "2주차",
  },
  {
    sprintNo: 2,
    sprintName: "Backlog",
  },
];

//styled-components
const Title = styled.h1``;

const Button = styled.button`
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const TextButton = styled(Button)`
  background-color: inherit;
  border: none;
  text-decoration: underline;
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const WarnButton = styled(Button)`
  background-color: inherit;
  border: none;
  color: red;
  align-self: flex-end;
  margin-top: 20px;
`;

const Box = styled.div`
  width: inherit;
`;
const WorkSpace = styled(Box)`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const TopBar = styled(Box)``;
const FlexBox = styled(Box)`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InitialBox = styled(FlexBox)`
  margin-top: 300px;
  justify-content: center;
  height: inherit;
  ${Button} {
    background-color: #a589c7;
    color: white;
    border: 1px solid #a589c7;
    border-radius: 7px;
    padding: 7px 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;
const ButtonBox = styled.div`
  ${TextButton} {
    margin-left: 10px;
  }
`;
const SprintsBox = styled.div`
  height: 100%;
  overflow-y: scroll;
  margin-top: 20px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
`;

const ProjectSpace = () => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  //최초 프로젝트 시작 시 생성 => 백로그 생성됨
  const onStartProject = () => {
    //백로그라는 스프린트 생성 post api 로직 필요
  };

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
    //이슈 옮겨졌을 때 이슈 수정 post api 로직 필요
    //그 후 재렌더링 로직 필요
  };

  return (
    <>
      {isReady ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <WorkSpace>
            <TopBar>
              <Title>Team Name</Title>
              <FlexBox>
                <TextButton>Only My Issues</TextButton>
                <ButtonBox>
                  <Button>Create Sprint</Button>
                  <TextButton>Epic</TextButton>
                </ButtonBox>
              </FlexBox>
            </TopBar>
            <SprintsBox>
              {sprints.length > 0 ? (
                sprints.map((sprint, index) => (
                  <Sprint sprint={sprint} key={index} />
                ))
              ) : (
                <InitialBox>
                  <Button onClick={onStartProject}>프로젝트 시작하기</Button>
                </InitialBox>
              )}
            </SprintsBox>
            <WarnButton>프로젝트 종료</WarnButton>
          </WorkSpace>
        </DragDropContext>
      ) : null}
    </>
  );
};

export default ProjectSpace;
