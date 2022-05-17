/* eslint-disable */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { createNewIssue, getIssueList } from "../../store/modules/issue";
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
    onlyMyIssue: state.modeReducer.onlyMyIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewIssue: (issueInfo: any) => dispatch(createNewIssue(issueInfo)),
    getTopicList: (projectNo: any) => dispatch(getTopicList(projectNo)),
    getTeamMembers: (teamNo: any) => dispatch(getTeamMembers(teamNo)),
    getIssueList: (params: any) => dispatch(getIssueList(params)),
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
  getIssues,
  onlyMyIssue,
  getIssueList,
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
  getIssues?: any;
  onlyMyIssue?: boolean;
  getIssueList?: any;
}) => {
  const router = useRouter();

  interface issueType {
    title: string;
    sprintNo: number;
    description: string;
    topicNo: any;
    userNo: string;
    teamNo: number;
    status: string;
  }

  const [newIssueInfo, setNewIssueInfo] = useState<issueType>({
    title: "",
    sprintNo,
    description: "",
    topicNo: "",
    userNo: "",
    teamNo,
    status: "todo",
  });
  const [memberList, setMemberList] = useState<any>([]);
  const [topicList, setTopicList] = useState<any>([]);
  const [projectNo, setProjectNo] = useState<string>("");

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
    const userNo = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, userNo }));
  };

  const cancelCreateIssue = () => showIssueCreateModal();

  const addNewIssue = () => {
    if (!newIssueInfo.title) {
      alert("이슈 제목을 작성해주세요.");
      return;
    } else if (!newIssueInfo.description) {
      alert("이슈 설명을 작성해주세요.");
      return;
    } else if (!newIssueInfo.topicNo) {
      alert("해당 토픽을 선택해주세요.");
      return;
    } else if (!newIssueInfo.userNo) {
      alert("담당자를 선택해주세요.");
      return;
    }

    createNewIssue(newIssueInfo).then((res: any) => {
      getIssueList({ projectNo, onlyMyIssue });
      getIssues();
    });
    showIssueCreateModal();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    setProjectNo(projectCode);
    getTopicList(projectCode);
  }, [router.asPath]);

  useEffect(() => {
    getTeamMembers(teamNo);
  }, [teamNo]);

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
