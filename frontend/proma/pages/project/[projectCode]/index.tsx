//프로젝트 워크스페이스
import styled from "styled-components";
import Sprint from "../../../components/project/Sprint";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ThemeType } from "../../../interfaces/style";
import { FaPen, FaCheck } from "react-icons/fa";
import {
  SprintCreateModal,
  TopicListModal,
  TopicCreateModal,
} from "../../../components/common/Modal";

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
const InitialBox = styled(FlexBox)`
  /* margin-top: 300px; */
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

const ProjectSpace = () => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const [updateTitle, setUpdateTitle] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("Project Name");

  const [topicListModal, setTopicListModal] = useState<boolean>(false);
  const [topicCreateModal, setTopicCreateModal] = useState<boolean>(false);
  const [sprintCreateModal, setSprintCreateModal] = useState<boolean>(false);
  const showTopicListModal = () => setTopicListModal((cur) => !cur);
  const showTopicCreateModal = () => setTopicCreateModal((cur) => !cur);
  const showSprintCreateModal = () => setSprintCreateModal((cur) => !cur);

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
            {updateTitle ? (
              <TopBar>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  placeholder="Type Project Name"
                  required
                  autoFocus
                />
                <FaCheck onClick={() => setUpdateTitle((cur) => !cur)} />
              </TopBar>
            ) : (
              <TopBar>
                <h1>{projectName}</h1>
                <FaPen onClick={() => setUpdateTitle((cur) => !cur)} />
              </TopBar>
            )}
            <FlexBox>
              <UnfilledButton>Only My Issues</UnfilledButton>
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
