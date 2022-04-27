import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FaRegUserCircle,
  FaPencilAlt,
  FaCheck,
  FaGithub,
} from "react-icons/fa";
import { ThemeType } from "../../interfaces/style";
import Link from "next/link";

//styling
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  width: "inherit",
  boxShadow: 24,
  p: 4,
};

//styled components
const ModalBox = styled(Modal)`
  .MuiBox-root {
    width: fit-content;
    min-width: 400px;
    padding: 0px;
    border: 0px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
    input,
    textarea {
      padding: 5px 10px;
      border: none;
      outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
      border-radius: 3px;
      resize: none;
      width: 100%;
      font-size: 18px;
      &:focus {
        outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
      }
    }
    textarea {
      height: 100px;
    }
    button {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const Header = styled.div`
  height: 50px;
  padding: 5px 20px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;
const BodyContainer = styled.div`
  margin: 0;
  padding: 10px 25px;
  font-size: 22px;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  a {
    text-decoration: none;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
  }
  p {
    margin: 10px 0;
  }
`;
const InputArea = styled.div`
  width: inherit;
  padding-right: 25px;
`;
const TextButton = styled.button`
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  text-decoration: underline;
  background-color: inherit;
  border: none;
  width: 100%;
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 5px;
`;
const Button = styled.button`
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  padding: 3px 10px;
  font-size: 15px;
  width: 70px;
  margin-left: 10px;
`;
const CancelButton = styled(Button)`
  color: ${(props: ThemeType) => props.theme.mainColor};
  background-color: white;
`;
const CreateButton = styled(Button)`
  color: white;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
`;
const WarningModalBox = styled(Modal)`
    .MuiBox-root {
        width: fit-content;
        min-width: 300px;
        padding: 0px;
        border: 0px;
        border-radius: 3px;
        overflow: hidden;
        background-color: ${(props: ThemeType) => props.theme.bgColor};
        input,
        textarea {
        padding: 3px 10px;
        border: none;
        outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
        border-radius: 3px;
        resize: none;
        width: 100%;
        &:focus {
            outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
        }
        }
        button {
        &:hover {
            cursor: pointer;
        }
        }
    }
`;
const WarningContainer = styled.div`
    padding: 5px 5px;
    font-size: 22px;
    font-weight: 550;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
    text-align-last: center;
    p {
    color: red;
}
`;
const Warningimg = styled.img`
    width: 30%;
`;
const WarningMainArea = styled.div`
    width: inherit;
`;
const WarningButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 15px;
`;
const MaintainButton = styled(Button)`
    color: white;
    background-color: ${(props: ThemeType) => props.theme.mainColor};
    font-size: 18px;
    width: 50%;
`;
const DeleteButton = styled(Button)`
    color: grey;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
    border: 0px solid ${(props: ThemeType) => props.theme.bgColor};
    font-size: 15px;
    width: 50%;
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const SprintCreateModal = ({
  sprintCreateModal,
  showSprintCreateModal,
}: {
  sprintCreateModal: boolean;
  showSprintCreateModal: any;
}) => {
  interface sprintType {
    title: string;
    startDate: string;
    endDate: string;
  }

  const [newSprintInfo, setNewSprintInfo] = useState<sprintType>({
    title: "",
    startDate: "",
    endDate: "",
  });

  const onChangeSprintName = (e: any) => {
    const value = e.target.value as string;
    setNewSprintInfo((cur) => ({ ...cur, title: value }));
  };

  const onSelectStartDate = (e: any) => {
    const value = e.target.value;
    setNewSprintInfo((cur) => ({ ...cur, startDate: value }));
  };

  const onSelectEndDate = (e: any) => {
    const value = e.target.value as string;
    if (!newSprintInfo.startDate) {
      alert("Please choose start date first.");
      e.target.value = "";
      return;
    }

    if (new Date(newSprintInfo.startDate) >= new Date(value)) {
      e.target.value = "";
      alert(
        "The end date must be later than the start date. Please choose again"
      );
    }

    setNewSprintInfo((cur) => ({ ...cur, endDate: value }));
  };

  const cancelCreateSprint = () => {
    showSprintCreateModal();
  };

  const createNewSprint = () => {
    if (!newSprintInfo.title) {
      alert("Please type sprint title");
      return;
    }
    if (!newSprintInfo.startDate) {
      alert("Please choose start date");
      return;
    }
    if (!newSprintInfo.endDate) {
      alert("Please choose end date");
      return;
    }

    //post new sprint api

    showSprintCreateModal();
  };

  return (
    <ModalBox
      open={sprintCreateModal}
      onClose={showSprintCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Create Sprint</Header>
        <BodyContainer>
          <InputArea>
            <p>Title</p>
            <input
              type="text"
              value={newSprintInfo.title}
              placeholder="Type New Topic Name.."
              onChange={onChangeSprintName}
            />
            <p>Start Date</p>
            <input type="date" lang="en" onChange={onSelectStartDate} />
            <p>End Date</p>
            <input type="date" lang="en" onChange={onSelectEndDate} />
          </InputArea>
          <ButtonBox>
            <CancelButton onClick={cancelCreateSprint}>Cancel</CancelButton>
            <CreateButton onClick={createNewSprint}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const TopicListModal = ({
  topicListModal,
  showTopicListModal,
  showTopicCreateModal,
}: {
  topicListModal: boolean;
  showTopicListModal: any;
  showTopicCreateModal: any;
}) => {
  //dummy data
  const topicList = ["Topic1", "Topic2", "Topic3"];

  const showCreateTopicModal = () => {
    showTopicCreateModal();
    showTopicListModal();
  };

  return (
    <ModalBox
      open={topicListModal}
      onClose={showTopicListModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Topic List</Header>
        <BodyContainer>
          {topicList.map((topic, index) => (
            <Link href={`/project/projectCode/topic/topicCode`} key={index}>
              <a>
                <p key={index}>{topic}</p>
              </a>
            </Link>
          ))}
          <TextButton onClick={showCreateTopicModal}>+ Add Topic</TextButton>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const TopicCreateModal = ({
  topicCreateModal,
  showTopicListModal,
  showTopicCreateModal,
}: {
  topicCreateModal: boolean;
  showTopicListModal: any;
  showTopicCreateModal: any;
}) => {
  const [newTopicName, setNewTopicName] = useState<string>("");
  const [newTopicDesc, setNewTopicDesc] = useState<string>("");

  const cancelCreateTopic = () => {
    showTopicListModal();
    showTopicCreateModal();
  };

  const createNewTopic = () => {
    //post new topic api

    showTopicCreateModal();
  };

  return (
    <ModalBox
      open={topicCreateModal}
      onClose={showTopicCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Create Topic</Header>
        <BodyContainer>
          <InputArea>
            <p>Title</p>
            <input
              type="text"
              value={newTopicName}
              placeholder="Type New Topic Name.."
              onChange={(e) => setNewTopicName(e.target.value)}
            />
            <p>Description</p>
            <textarea
              value={newTopicDesc}
              placeholder="Type New Topic Description.."
              onChange={(e) => setNewTopicDesc(e.target.value)}
            ></textarea>
          </InputArea>
          <ButtonBox>
            <CancelButton onClick={cancelCreateTopic}>Cancel</CancelButton>
            <CreateButton onClick={createNewTopic}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const IssueCreateModal = ({
  issueCreateModal,
  showIssueCreateModal,
}: {
  issueCreateModal: boolean;
  showIssueCreateModal: any;
}) => {
  //dummy data
  const topicList = ["Topic1", "Topic2", "Topic3"];
  const memberList = ["Kim", "Park", "Choi", "Seo", "Jang"];

  interface issueType {
    title: string;
    desc: string;
    topic: string;
    assignee: string;
  }

  const [newIssueInfo, setNewIssueInfo] = useState<issueType>({
    title: "",
    desc: "",
    topic: "",
    assignee: "",
  });

  const onSelectTopic = (e: any) => {
    const value = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, topic: value }));
  };

  const onSelectAssignee = (e: any) => {
    const value = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, assignee: value }));
  };

  const cancelCreateIssue = () => showIssueCreateModal();

  const createNewIssue = () => {
    //topic, assignee 리스트 내 존재하는 value인지 확인
    if (topicList.indexOf(newIssueInfo.topic) === -1) {
      alert("Please select an existing topic name in the list.");
      return;
    }
    if (memberList.indexOf(newIssueInfo.assignee) === -1) {
      alert("Please select an existing assignee name in the list.");
      return;
    }

    //post new issue api

    showIssueCreateModal();
  };

  return (
    <ModalBox
      open={issueCreateModal}
      onClose={showIssueCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Create Issue</Header>

        <BodyContainer>
          <InputArea>
            <p>Title</p>
            <input
              type="text"
              value={newIssueInfo.title}
              placeholder="Type New Issue Title.."
            />

            <p>Description</p>
            <textarea
              value={newIssueInfo.desc}
              placeholder="Type New Issue Description.."
            />

            <p>Topic</p>
            <form>
              <input
                type="text"
                list="topicList"
                value={newIssueInfo.topic}
                placeholder="Choose Topic"
                onChange={onSelectTopic}
                onInput={onSelectTopic}
              />
              <datalist id="topicList">
                {topicList.map((topic, index) => (
                  <option value={topic} key={index}>
                    {topic}
                  </option>
                ))}
              </datalist>
            </form>

            <p>Assignee</p>
            <form>
              <input
                type="text"
                list="memberList"
                value={newIssueInfo.assignee}
                placeholder="Choose Issue Assignee"
                onChange={onSelectAssignee}
                onInput={onSelectAssignee}
              />
              <datalist id="memberList">
                {memberList.map((member, index) => (
                  <option value={member} key={index}>
                    {member}
                  </option>
                ))}
              </datalist>
            </form>
          </InputArea>

          <ButtonBox>
            <CancelButton onClick={cancelCreateIssue}>Cancel</CancelButton>
            <CreateButton onClick={createNewIssue}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const WarningModal = ({
  warningCreateModal,
  showWarningListModal,
  showWarningCreateModal,
  }: {
      warningCreateModal: boolean;
      showWarningListModal: any;
      showWarningCreateModal: any;
  }) => {    
      const cancelCreateTopic = () => {
          showWarningListModal();
          showWarningCreateModal();
      };
  
      const createNewTopic = () => {
      //post new topic api
  
      showWarningCreateModal();
  };

      return (
          <WarningModalBox
              open={warningCreateModal}
              onClose={showWarningCreateModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <WarningContainer>
                      <Warningimg src="/img/warning-icon.png"></Warningimg>
                  <WarningMainArea>
                      <p>
                          프로젝트 종료 시<br />
                          프로젝트 내 활동 정보가 모두 삭제되며, <br/>
                          삭제된 데이터는 복구가 불가합니다.<br/><br/>

                          정말 종료하시겠습니까?
                      </p>
                  </WarningMainArea>
                      <WarningButtonBox>
                          <MaintainButton>아니요 유지할래요!</MaintainButton>
                          <DeleteButton>네 삭제할게요</DeleteButton>
                      </WarningButtonBox>
                  </WarningContainer>
              </Box>
          </WarningModalBox>
      );
};