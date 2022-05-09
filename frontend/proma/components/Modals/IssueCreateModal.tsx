/* eslint-disable */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { createNewIssue } from "../../store/modules/issue";
import { getTopicList } from "../../store/modules/topic";
import { getTeamMembers } from "../../store/modules/team";
import { RootState } from "../../store/modules";

import Box from "@mui/material/Box";
import {
  style,
  ModalBox,
  ButtonBox,
  Header,
  BodyContainer,
  InputArea,
  CancelButton,
  CreateButton,
} from "./index";

const mapStateToProps = (state: RootState) => {
  return {
    teamMembers: state.teamReducer.teamMembers,
    topics: state.topicReducer.topicList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewIssue: (issueInfo: any) => dispatch(createNewIssue(issueInfo)),
    getTopicList: (projectNo: any) => dispatch(getTopicList(projectNo)),
    getTeamMembers: (teamNo: any) => dispatch(getTeamMembers(teamNo)),
  };
};

const IssueCreateModal = ({
  issueCreateModal,
  showIssueCreateModal,
  teamNo,
  sprintNo,
  createNewIssue,
  teamMembers,
  topics,
  getTopicList,
  getTeamMembers,
}: {
  issueCreateModal: boolean;
  showIssueCreateModal: any;
  teamNo: number;
  sprintNo: number;
  createNewIssue?: any;
  teamMembers?: any;
  topics?: any;
  getTopicList?: any;
  getTeamMembers?: any;
}) => {
  const router = useRouter();

  interface issueType {
    title: string;
    sprintNo: number;
    description: string;
    topicNo: any;
    assignee: string;
    teamNo: number;
    status: string;
  }

  const [newIssueInfo, setNewIssueInfo] = useState<issueType>({
    title: "",
    sprintNo,
    description: "",
    topicNo: "",
    assignee: "",
    teamNo,
    status: "todo",
  });
  const [memberList, setMemberList] = useState<any>([]);
  const [topicList, setTopicList] = useState<any>([]);

  const onChangeTitle = (e: any) => {
    const value = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, title: value }));
  };
  const onChangeDesc = (e: any) => {
    const value = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, description: value }));
  };
  const onSelectTopic = (e: any) => {
    console.dir(e.target);
    const topicNo = e.target.value as number;
    setNewIssueInfo((cur) => ({ ...cur, topicNo }));
  };
  const onSelectAssignee = (e: any) => {
    const assignee = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, assignee }));
  };

  const cancelCreateIssue = () => showIssueCreateModal();

  const addNewIssue = () => {
    if (!newIssueInfo.title) {
      alert("Please type issue title");
      return;
    } else if (!newIssueInfo.description) {
      alert("Please type issue description");
      return;
    } else if (!newIssueInfo.topicNo) {
      alert("Please choose topic");
      return;
    } else if (!newIssueInfo.assignee) {
      alert("Please choose issue assignee");
      return;
    }

    createNewIssue(newIssueInfo);
    showIssueCreateModal();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectNo = router.query.projectCode as string;
    getTopicList(projectNo);
    getTeamMembers(teamNo);
  }, [router.asPath]);

  useEffect(() => {
    if (!teamMembers) return;
    setMemberList(teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    if (!topics) return;
    setTopicList(topics);
  }, [topics]);

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
              placeholder="Please type new issue title.."
              onChange={onChangeTitle}
            />

            <p>Description</p>
            <textarea
              value={newIssueInfo.description}
              placeholder="Please type new issue description.."
              onChange={onChangeDesc}
            />

            <p>Topic</p>
            <form>
              <select name="topicList" id="topicList" onChange={onSelectTopic}>
                <option value="">---Please choose Topic---</option>
                {topicList ? (
                  topicList.map((topic: any, index: number) => (
                    <option value={topic.topicNo} key={index}>
                      {topic.title}
                    </option>
                  ))
                ) : (
                  <p>Please make topic first.</p>
                )}
              </select>
            </form>

            <p>Assignee</p>
            <form>
              <select
                name="memberList"
                id="memberList"
                onChange={onSelectAssignee}
              >
                <option value="">---Please choose Issue Assignee---</option>
                {memberList.map((member: any, index: number) => (
                  <option value={member.userNo} key={index}>
                    {member.nickName}
                  </option>
                ))}
              </select>
            </form>
          </InputArea>

          <ButtonBox>
            <CancelButton onClick={cancelCreateIssue}>Cancel</CancelButton>
            <CreateButton onClick={addNewIssue}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueCreateModal);
