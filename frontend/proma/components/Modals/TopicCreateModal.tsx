import Box from "@mui/material/Box";
import {
  style,
  ModalBox,
  Header,
  BodyContainer,
  InputArea,
  ButtonBox,
  CancelButton,
  CreateButton,
} from "./index";

import { connect } from "react-redux";
import { createNewTopic } from "../../store/modules/topic";
import { RootState } from "../../store/modules";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface topicType {
  topicNo: number;
  title: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    topicList: state.topicReducer.topicList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewTopic: (projectNo: string) => dispatch(createNewTopic(projectNo)),
  };
};

export const TopicCreateModal = ({
  topicCreateModal,
  showTopicListModal,
  showTopicCreateModal,
  createNewTopic,
}: {
  topicCreateModal: boolean;
  showTopicListModal: any;
  showTopicCreateModal: any;
  createNewTopic: any;
}) => {
  const router = useRouter();

  const [projectNo, setProjectNo] = useState<string>("");
  const [newTopicName, setNewTopicName] = useState<string>("");
  const [newTopicDesc, setNewTopicDesc] = useState<string>("");

  const cancelCreateTopic = () => {
    showTopicListModal();
    showTopicCreateModal();
  };

  const addNewTopic = () => {
    createNewTopic({
      description: newTopicDesc,
      projectNo,
      title: newTopicName,
    });
    setNewTopicName("");
    setNewTopicDesc("");
    cancelCreateTopic();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    setProjectNo(projectCode);
  }, [router.asPath]);

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
            <CreateButton onClick={addNewTopic}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicCreateModal);
