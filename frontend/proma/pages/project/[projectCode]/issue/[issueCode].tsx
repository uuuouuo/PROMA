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
  height: inherit;
  overflow-y: scroll;
`;
const TopicTitle = styled.h1`
  font-size: 35px;
`;
const TopBar = styled.div``;
const SelectBox = styled.div`
  display: flex;
`;

const IssueDetail = () => {
  const [updateSprint, setUpdateSprint] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [updateIssue, setUpdateIssue] = useState<boolean>(false);

  //dummy data
  const [sprintName, setSprintName] = useState<string>("sprint1");
  const [topicName, setTopicName] = useState<string>("Topic Name");
  const [issueName, setIssueName] = useState<string>("Issue Name");
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
      setUpdateSprint(false);
    }
  };

  return (
    <IssueContainer>
      <TopicTitle>
        {topicName} | {issueName}
      </TopicTitle>

      <TopBar>
        <SelectBox>
          <button onClick={() => setUpdateSprint((cur) => !cur)}>
            {updateSprint ? <FaCaretSquareDown /> : <FaCaretSquareRight />}
          </button>
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
          <button onClick={() => setUpdateStatus((cur) => !cur)}>
            {updateStatus ? <FaCaretSquareDown /> : <FaCaretSquareRight />}
          </button>
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
    </IssueContainer>
  );
};

export default IssueDetail;
