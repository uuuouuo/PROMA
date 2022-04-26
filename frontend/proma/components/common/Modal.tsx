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
