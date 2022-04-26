import { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeType } from "../../../../interfaces/style";
import {
  FaPen,
  FaCheck,
  FaCaretSquareDown,
  FaCaretSquareRight,
} from "react-icons/fa";
import Image from "next/image";

//styled-components
const IssueContainer = styled.div`
  width: inherit;
  padding: 10px 20px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
  overflow-y: scroll;
`;
const TopicTitle = styled.h1`
  font-size: 35px;
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
  margin: 20px;
  padding-right: 20px;
  ${ToggleIconBox} {
    margin-right: 10px;
  }
  form {
    input {
      border: none;
      border-radius: 3px;
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
      font-size: 20px;
      padding: 3px 10px;
    }
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
  font-size: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  span {
    margin-left: 15px;
    color: ${(props: ThemeType) => props.theme.textColor};
    font-size: 30px;
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
`;
const ToggleBox = styled.div`
  input {
    border-radius: 3px;
    border: none;
    outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    opacity: 0.7;
    padding: 10px 15px;
    font-size: 20px;
    width: 98%;
    margin-right: 100px;
    &:focus {
      border: none;
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
      opacity: 1;
    }
  }
  p {
    font-size: 25px;
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

const IssueDetail = () => {
  const [updateSprint, setUpdateSprint] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [updateIssue, setUpdateIssue] = useState<boolean>(false);

  //dummy data
  const [sprintName, setSprintName] = useState<string>("sprint1");
  const [topicName, setTopicName] = useState<string>("Topic Name");
  const [issueName, setIssueName] = useState<string>("Issue Name");
  const [assigneeName, setAssigneeName] = useState<string>("Assignee");
  const [issueDesc, setIssueDesc] = useState<string>("Issue Desc");
  const [status, setStatus] = useState<string>("To Do");
  const sprintList = ["sprint1", "sprint2", "sprint3"];
  const statusList = ["To Do", "In Progress", "Done"];

  //change sprint
  const onSearchSprint = (e: any) => {
    const value = e.target.value;
    setSprintName(value);
  };
  const onChangeSprint = (e: any) => {
    const value = e.target.value;
    //sprint list에 해당 sprint가 존재하는 지 확인
    if (sprintList.indexOf(value) !== -1) {
      //확인됐다면
      setSprintName(value);
      setUpdateSprint(false);
    }
  };

  //change status
  const onSearchStatus = (e: any) => {
    const value = e.target.value;
    setStatus(value);
  };
  const onChangeStatus = (e: any) => {
    const value = e.target.value;
    //sprint list에 해당 sprint가 존재하는 지 확인
    if (statusList.indexOf(value) !== -1) {
      //확인됐다면
      setStatus(value);
      setUpdateStatus(false);
      console.log("equal");
    } else {
      console.log("not equal");
    }
  };

  return (
    <IssueContainer>
      <TopicTitle>
        {topicName} | {issueName}
      </TopicTitle>

      <TopBar>
        <SelectBox>
          <ToggleIconBox onClick={() => setUpdateSprint((cur) => !cur)}>
            {updateSprint ? <FaCaretSquareDown /> : <FaCaretSquareRight />}
          </ToggleIconBox>
          {updateSprint ? (
            <form action="">
              <input
                type="text"
                list="depList"
                value={sprintName}
                onInput={onChangeSprint}
                onChange={onSearchSprint}
              />
              <datalist id="depList">
                {sprintList.map((sprint, index) => (
                  <option value={sprint} key={index}>
                    {sprint}
                  </option>
                ))}
              </datalist>
            </form>
          ) : (
            <span>{sprintName}</span>
          )}
        </SelectBox>

        <SelectBox>
          <ToggleIconBox onClick={() => setUpdateStatus((cur) => !cur)}>
            {updateStatus ? <FaCaretSquareDown /> : <FaCaretSquareRight />}
          </ToggleIconBox>
          {updateStatus ? (
            <form action="">
              <input
                type="text"
                list="statusList"
                value={status}
                onInput={onChangeStatus}
                onChange={onSearchStatus}
              />
              <datalist id="statusList">
                {statusList.map((status, index) => (
                  <option value={status} key={index}>
                    {status}
                  </option>
                ))}
              </datalist>
            </form>
          ) : (
            <span>{status}</span>
          )}
        </SelectBox>
      </TopBar>

      <SubBox>
        <SubTitle>
          <FaCaretSquareDown />
          <span>Details</span>
        </SubTitle>

        <IssueDetailBox>
          <IconBox onClick={() => setUpdateIssue((cur) => !cur)}>
            {updateIssue ? <FaCheck /> : <FaPen />}
          </IconBox>
          <p>Title</p>
          <ToggleBox>
            {updateIssue ? (
              <input
                type="text"
                value={issueName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Type Topic Name"
                required
              />
            ) : (
              <p>{issueName}</p>
            )}
          </ToggleBox>

          <p>Description</p>
          <ToggleBox>
            {updateIssue ? (
              <input
                type="text"
                value={issueDesc}
                onChange={(e) => setIssueDesc(e.target.value)}
                placeholder="Type Issue Description"
                required
              />
            ) : (
              <p>{issueDesc}</p>
            )}
          </ToggleBox>

          <p>Topic</p>
          <ToggleBox>
            {updateIssue ? (
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                required
              />
            ) : (
              <p>{topicName}</p>
            )}
          </ToggleBox>

          <p>Assignee</p>
          <ToggleBox>
            {updateIssue ? (
              <input
                type="text"
                value={issueDesc}
                onChange={(e) => setIssueDesc(e.target.value)}
                placeholder="Type Issue Description"
                required
              />
            ) : (
              <AssigneeInfo>
                <ImageBox>
                  <Image src="/profileimg.png" width={25} height={25} />
                </ImageBox>
                <p>{assigneeName}</p>
              </AssigneeInfo>
            )}
          </ToggleBox>
        </IssueDetailBox>
      </SubBox>
    </IssueContainer>
  );
};

export default IssueDetail;
