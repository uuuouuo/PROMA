/* eslint-disable */
import styled from "styled-components";
import { ThemeType } from "../../../../interfaces/style";
import {
  FaPen,
  FaCheck,
  FaCaretSquareDown,
  FaCaretSquareRight,
} from "react-icons/fa";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import { RootState } from "../../../../store/modules";
import {
  getIssueInfo,
  updateIssueInfo,
  updateIssueSprint,
  updateIssueStatus,
} from "../../../../store/modules/issue";
import { getSprintList, updateSprint } from "../../../../store/modules/sprint";

//styled-components
const IssueContainer = styled.div`
  width: inherit;
  padding: 10px 20px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
  overflow-y: scroll;
`;
const TopicTitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
`;
const TopBar = styled.div`
  width: 100%;
  font-size: 22px;
  display: flex;
  justify-content: flex-end;
`;
const ToggleIconBox = styled.div`
  background: none;
  margin-top: 5px;
  color: ${(props: ThemeType) => props.theme.subPurpleColor};
`;
const SelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 15px;
  ${ToggleIconBox} {
    margin-right: 10px;
  }
  select {
    border: none;
    border-radius: 3px;
    outline: none;
    font-size: 15px;
    color: ${(props: ThemeType) => props.theme.mainColor};
    padding-right: 10px;
    margin: 0 5px;
  }
`;
const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 0;
  p {
    font-size: 25px;
  }
`;
const SubTitle = styled.div`
  color: ${(props: ThemeType) => props.theme.subPurpleColor};
  font-size: 22px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  span {
    margin-left: 15px;
    color: ${(props: ThemeType) => props.theme.textColor};
  }
`;
const UnfilledButton = styled.button`
  font-size: 15px;
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  &:hover {
    cursor: pointer;
  }
`;
const OptionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${UnfilledButton} {
    margin-left: 10px;
  }
`;
const IconBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const IssueDetailBox = styled(SubBox)`
  width: inherit;
  position: relative;
  margin: 20px;
  ${IconBox} {
    position: absolute;
    top: 25px;
    right: 20px;
    color: ${(props: ThemeType) => props.theme.textColor};
    font-size: 20px;
  }
  ${OptionBox} {
    position: absolute;
    top: 10px;
    right: 20px;
    color: ${(props: ThemeType) => props.theme.textColor};
  }
  p {
    font-size: 20px;
  }
`;
const ToggleBox = styled.div`
  margin-bottom: 20px;
  input {
    border-radius: 3px;
    border: none;
    outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    opacity: 0.7;
    padding: 10px 15px;
    font-size: 18px;
    width: 98%;
    margin-right: 100px;
    &:focus {
      border: none;
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
      opacity: 1;
    }
  }
  p {
    font-size: 22px;
    font-weight: 600;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
    margin: 0;
    margin-left: 15px;
  }
`;
const ImageBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  padding-left: 20px;
`;
const AssigneeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const mapStateToProps = (state: RootState) => {
  return {
    issueInfo: state.issueReducer.issueInfo,
    sprints: state.sprintReducer.sprintList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIssueInfo: (params: any) => dispatch(getIssueInfo(params)),
    updateIssueInfo: (issueInfo: any) => dispatch(updateIssueInfo(issueInfo)),
    updateIssueSprint: (issueInfo: any) =>
      dispatch(updateIssueSprint(issueInfo)),
    updateIssueStatus: (issueInfo: any) =>
      dispatch(updateIssueStatus(issueInfo)),
    getSprintList: (projectNo: string) => dispatch(getSprintList(projectNo)),
  };
};

const IssueDetail = ({
  issueInfo,
  getIssueInfo,
  updateIssueInfo,
  sprints,
  getSprintList,
  updateIssueSprint,
  updateIssueStatus,
}: {
  issueInfo: any;
  getIssueInfo: any;
  updateIssueInfo: any;
  sprints: any;
  getSprintList: any;
  updateIssueSprint: any;
  updateIssueStatus: any;
}) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  const [updateIssue, setUpdateIssue] = useState<boolean>(false);
  const [issueDetail, setIssueDetail] = useState<any>({
    description: "",
    title: "",
    topicNo: 0,
    userNo: "",
  });
  const [statusName, setStatusName] = useState<string>("");
  const [statusList, setStatusList] = useState<any>([]);
  const [sprintName, setSprintName] = useState<string>("");
  const status = [
    { name: "To Do", value: "todo" },
    { name: "In Progress", value: "inprogress" },
    { name: "Done", value: "done" },
  ];
  const [sprintList, setSprintList] = useState<any>([]);

  const setSprint = () => {
    const issueSprint = sprints.find(
      (element: any) => element.sprintNo === issueInfo.sprintNo
    );
    const name = issueSprint?.title;
    setSprintName(name ? name : "");

    const list = sprints
      .filter((element: any) => element.sprintNo !== issueInfo.sprintNo)
      .filter((element: any) => element.status !== 2);
    console.log(list);
    setSprintList(list ? list : []);
  };

  const setStatus = () => {
    const issueStatus = status.find(
      (element) => element.value === issueInfo.status
    );
    const name = issueStatus?.name;
    setStatusName(name ? name : "");

    const list = status.filter((element) => element.value !== issueInfo.status);
    setStatusList(list ? list : []);
  };

  const onSelectSprint = (e: any) => {
    const value = e.target.value;
    updateIssueSprint({
      sprintNo: value,
      issueNo: issueInfo.issueNo,
    });
  };

  const onSelectStatus = (e: any) => {
    const value = e.target.value;
    console.log(value);
    updateIssueStatus({
      issueNo: issueInfo.issueNo,
      status: value,
    }).then((res: any) => setStatus());
  };

  const onChangeIssueName = (e: any) => {
    const value = e.target.value;
    setIssueDetail({ ...issueDetail, title: value });
  };
  const onChangeIssueDesc = (e: any) => {
    const value = e.target.value;
    setIssueDetail({ ...issueDetail, description: value });
  };
  const onChangeIssueTopic = (e: any) => {
    const value = e.target.value;
    setIssueDetail({ ...issueDetail, topicNo: value });
  };
  const onChangeIssueAssignee = (e: any) => {
    const value = e.target.value;
    setIssueDetail({ ...issueDetail, userNo: value });
  };

  const onUpdateIssueInfo = () => {
    updateIssueInfo(issueDetail);
    setUpdateIssue((cur) => !cur);
  };

  const onDeleteIssue = () => {
    // const confirmResult = confirm("Are you sure you want to delete the topic?");
    // if (confirmResult) {
    //   deleteIssue(topicNo).then((res: any) =>
    //     router.push(`/project/${projectNo}`)
    //   );
    // }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    const issueCode = router.query.issueCode as string;
    getSprintList(projectCode);
    getIssueInfo({ issueNo: parseInt(issueCode) }).then((res: any) =>
      setIsReady(true)
    );
  }, [router.asPath]);

  useEffect(() => {
    if (!issueInfo || issueInfo === {}) return;

    setStatus();

    //set issue detail
    setIssueDetail({
      description: issueInfo.description,
      title: issueInfo.issueTitle,
      topicNo: issueInfo.topic ? issueInfo.topic.topicNo : null,
      userNo: issueInfo.assignee ? issueInfo.assignee.userNo : null,
    });
    setSprint();
  }, [issueInfo]);

  //   useEffect(() => {
  //     if (!sprints || !issueInfo) return;
  //     setSprint();
  //   }, [sprints, sprintNo]);

  return (
    <>
      {isReady ? (
        <IssueContainer>
          <TopicTitle>
            {issueInfo.team ? issueInfo.team.title : null} | {issueDetail.title}
          </TopicTitle>

          <TopBar>
            <SelectBox>
              <p>Sprint: </p>
              <select
                name="sprintList"
                id="sprintList"
                onChange={onSelectSprint}
              >
                <option value="">{sprintName}</option>
                {sprintList.map((s: any, index: number) => (
                  <option value={s.sprintNo} key={index}>
                    {s.title}
                  </option>
                ))}
              </select>
            </SelectBox>

            <SelectBox>
              <p>Status:</p>
              <select
                name="statusList"
                id="statusList"
                onChange={onSelectStatus}
              >
                <option value="">{statusName}</option>
                {statusList.map((s: any, index: number) => (
                  <option value={s.value} key={index}>
                    {s.name}
                  </option>
                ))}
              </select>
            </SelectBox>
          </TopBar>

          <SubBox>
            <SubTitle>
              <FaCaretSquareDown />
              <span>Details</span>
            </SubTitle>

            <IssueDetailBox>
              {updateIssue ? (
                <OptionBox>
                  <UnfilledButton onClick={onUpdateIssueInfo}>
                    Done
                  </UnfilledButton>
                </OptionBox>
              ) : (
                <OptionBox>
                  <UnfilledButton onClick={() => setUpdateIssue((cur) => !cur)}>
                    Edit
                  </UnfilledButton>
                  <UnfilledButton onClick={onDeleteIssue}>
                    Delete
                  </UnfilledButton>
                </OptionBox>
              )}
              <p>Title</p>
              <ToggleBox>
                {updateIssue ? (
                  <input
                    type="text"
                    value={issueDetail.title}
                    onChange={onChangeIssueName}
                    placeholder="Type Topic Name"
                    required
                  />
                ) : (
                  <p>{issueDetail.title}</p>
                )}
              </ToggleBox>

              <p>Description</p>
              <ToggleBox>
                {updateIssue ? (
                  <input
                    type="text"
                    value={issueDetail.description}
                    onChange={onChangeIssueDesc}
                    placeholder="Type Issue Description"
                    required
                  />
                ) : (
                  <p>{issueDetail.description}</p>
                )}
              </ToggleBox>

              <p>Topic</p>
              <ToggleBox>
                {updateIssue ? (
                  <input
                    type="text"
                    value={issueInfo ? issueInfo.topic.topicTitle : null}
                    onChange={onChangeIssueTopic}
                    required
                  />
                ) : (
                  <p>{issueInfo ? issueInfo.topic.topicTitle : null}</p>
                )}
              </ToggleBox>

              <p>Assignee</p>
              <ToggleBox>
                {updateIssue ? (
                  <input
                    type="text"
                    value={issueInfo ? issueInfo.assignee.nickname : null}
                    onChange={onChangeIssueAssignee}
                    placeholder="Type Issue Description"
                    required
                  />
                ) : (
                  <AssigneeInfo>
                    <ImageBox>
                      <Image src="/profileimg.png" width={25} height={25} />
                    </ImageBox>
                    <p>{issueInfo ? issueInfo.assignee.nickname : null}</p>
                  </AssigneeInfo>
                )}
              </ToggleBox>
            </IssueDetailBox>
          </SubBox>
        </IssueContainer>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetail);
