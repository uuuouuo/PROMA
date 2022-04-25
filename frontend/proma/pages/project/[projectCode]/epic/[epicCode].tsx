import { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeType } from "../../../../interfaces/style";
import { FaPen, FaCheck, FaCaretSquareDown } from "react-icons/fa";
import Image from "next/image";

//styled-components
const EpicContainer = styled.div`
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
const IconBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
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
  }
`;
const EpicDetailBox = styled(SubBox)`
  width: inherit;
  position: relative;
  ${IconBox} {
    position: absolute;
    top: 10px;
    right: 10px;
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
    color: ${(props: ThemeType) => props.theme.mainColor};
    margin: 0;
    margin-left: 15px;
  }
`;
const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
  border-radius: 3px;
  padding: 10px;
  padding-top: 0;
  overflow-y: scroll;
  margin: 0 10px;
`;
const IssueBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  margin-top: 10px;
  padding: 5px 15px;
  color: black;
  div {
    display: flex;
    p {
      font-size: 15px;
      font-weight: 500;
      &:first-child {
        margin-right: 15px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
`;
const ImageBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
`;
const AssigneeBox = styled.div`
  display: flex;
  align-items: center;
`;

const EpicDetail = () => {
  const [updateTopic, setUpdateTopic] = useState<boolean>(false);

  //dummyData
  const [topicName, setTopicName] = useState<string>("Topic Name");
  const [topicDesc, setTopicDesc] = useState<string>("description..");
  const issueData = [
    {
      issueNo: 0,
      issueTitle: "컴포넌트 구성",
      description: "컴포넌트 구성합니다.",
      assignee: "Sue",
    },
    {
      issueNo: 1,
      issueTitle: "db 설계",
      description: "db 설계합니다.",
      assignee: "Eus",
    },
  ];

  return (
    <EpicContainer>
      <TopicTitle>{topicName}</TopicTitle>

      <SubBox>
        <SubTitle>
          <FaCaretSquareDown />
          <span>Details</span>
        </SubTitle>

        <EpicDetailBox>
          <IconBox onClick={() => setUpdateTopic((cur) => !cur)}>
            {updateTopic ? <FaCheck /> : <FaPen />}
          </IconBox>
          <p>Title</p>
          <ToggleBox>
            {updateTopic ? (
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Type Topic Name"
                required
              />
            ) : (
              <p>{topicName}</p>
            )}
          </ToggleBox>
          <p>Description</p>
          <ToggleBox>
            {updateTopic ? (
              <input
                type="text"
                value={topicDesc}
                onChange={(e) => setTopicDesc(e.target.value)}
                placeholder="Type Topic Description"
                required
              />
            ) : (
              <p>{topicDesc}</p>
            )}
          </ToggleBox>
        </EpicDetailBox>
      </SubBox>

      <SubBox>
        <SubTitle>
          <FaCaretSquareDown />
          <span>Issues</span>
        </SubTitle>

        <IssueContainer>
          {issueData.map((issue, index) => (
            <IssueBox key={index}>
              <div>
                <p>No. {issue.issueNo}</p>
                <p>{issue.issueTitle}</p>
              </div>
              <AssigneeBox>
                <ImageBox>
                  <Image src="/profileimg.png" width={20} height={20} />
                </ImageBox>
                <p>{issue.assignee}</p>
              </AssigneeBox>
            </IssueBox>
          ))}
        </IssueContainer>
      </SubBox>
    </EpicContainer>
  );
};

export default EpicDetail;
