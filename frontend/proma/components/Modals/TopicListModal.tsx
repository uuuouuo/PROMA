/* eslint-disable */
import Link from "next/link";
import Box from "@mui/material/Box";
import { style, ModalBox, Header, BodyContainer, TextButton } from "./index";

import { connect } from "react-redux";
import { getTopicList } from "../../store/modules/topic";
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
    getTopicList: (projectNo: string) => dispatch(getTopicList(projectNo)),
  };
};

export const TopicListModal = ({
  topicListModal,
  showTopicListModal,
  showTopicCreateModal,
  topicList,
  getTopicList,
}: {
  topicListModal: boolean;
  showTopicListModal: any;
  showTopicCreateModal: any;
  topicList?: Array<topicType>;
  getTopicList?: any;
}) => {
  const router = useRouter();

  const [projectNo, setProjectNo] = useState<string>("");
  const [topics, setTopics] = useState<Array<topicType>>([]);

  const showCreateTopicModal = () => {
    showTopicCreateModal();
    showTopicListModal();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    setProjectNo(projectCode);
    getTopicList(projectCode);
  }, [router.asPath]);

  useEffect(() => {
    if (!topicList) return;
    setTopics(topicList);
  }, [topicList]);

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
          {topics ? (
            topics.length > 0 ? (
              topics.map((topic, index) => (
                <Link
                  href={`/project/${projectNo}/topic/${topic.topicNo}`}
                  key={index}
                >
                  <a>
                    <p key={index}>{topic.title}</p>
                  </a>
                </Link>
              ))
            ) : (
              <p>There are no topics yet.</p>
            )
          ) : null}
          <TextButton onClick={showCreateTopicModal}>+ Add Topic</TextButton>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicListModal);
