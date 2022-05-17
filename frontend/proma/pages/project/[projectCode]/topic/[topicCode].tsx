/* eslint-disable */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeType } from "../../../../interfaces/style";
import { FaCaretSquareDown } from "react-icons/fa";

import Image from "next/image";
import { connect } from "react-redux";
import {
  getTopicInfo,
  updateTopicInfo,
  deleteTopic,
  getIssueUnderTopic,
} from "../../../../store/modules/topic";
import { RootState } from "../../../../store/modules";
import { useRouter } from "next/router";
import Link from "next/link";

interface topicType {
  title: string;
  description: string;
  topicNo: number;
}

//styled-components
const TopicContainer = styled.div`
  width: inherit;
  padding: 10px 20px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
  height: 98%;
  overflow-y: scroll;
`;
const TopicTitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
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
const TopicDetailBox = styled(SubBox)`
  width: inherit;
  position: relative;
  ${OptionBox} {
    position: absolute;
    top: 20px;
    right: 20px;
    color: ${(props: ThemeType) => props.theme.textColor};
  }
  p {
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
    width: 98%;
    margin-right: 100px;
    font-size: 18px;
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
const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
  border-radius: 3px;
  padding: 10px;
  padding-top: 0;
  overflow-y: scroll;
  margin: 0 10px;
  max-height: 45vh;
  span {
    margin: 20px;
    margin-bottom: 10px;
    font-weight: 500;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
  }
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
  cursor: pointer;
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

const mapStateToProps = (state: RootState) => {
  return {
    topicInfo: state.topicReducer.topicInfo,
    issueList: state.topicReducer.issueList,
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTopicInfo: (topicNo: string) => dispatch(getTopicInfo(topicNo)),
    deleteTopic: (topicNo: string) => dispatch(deleteTopic(topicNo)),
    getIssueUnderTopic: (topicNo: string) =>
      dispatch(getIssueUnderTopic(topicNo)),
    updateTopicInfo: (topicInfo: any) => dispatch(updateTopicInfo(topicInfo)),
  };
};

const TopicDetail = ({
  getTopicInfo,
  topicInfo,
  updateTopicInfo,
  deleteTopic,
  getIssueUnderTopic,
  issueList,
  userInfo,
}: {
  getTopicInfo: any;
  topicInfo: any;
  updateTopicInfo: any;
  deleteTopic: any;
  getIssueUnderTopic: any;
  issueList: any;
  userInfo: any;
}) => {
  const router = useRouter();
  const [updateTopic, setUpdateTopic] = useState<boolean>(false);
  const [projectNo, setProjectNo] = useState<string>("");
  const [topicNo, setTopicNo] = useState<string>("");
  const [topicDetail, setTopicDetail] = useState<any>({
    title: "",
    description: "",
    topicNo: 0,
  });

  const onChangeTopicInfo = (e: any) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setTopicDetail((cur: any) => ({ ...cur, [name]: value }));
  };

  const onUpdateTopicInfo = () => {
    updateTopicInfo({
      topicNo,
      updatedInfo: {
        title: topicDetail.title,
        description: topicDetail.description,
      },
    });
    setUpdateTopic((cur) => !cur);
  };

  const onDeleteTopic = () => {
    const confirmResult = confirm("Are you sure you want to delete the topic?");
    if (confirmResult) {
      deleteTopic(topicNo).then((res: any) =>
        router.push(`/project/${projectNo}`)
      );
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    const topicCode = router.query.topicCode as string;
    setProjectNo(projectCode);
    setTopicNo(topicCode);
    getTopicInfo(topicCode);
    getIssueUnderTopic(topicCode);
  }, [router.asPath, userInfo]);

  useEffect(() => {
    if (!topicInfo) return;
    setTopicDetail(topicInfo);
  }, [topicInfo]);

  return (
    <TopicContainer>
      <TopicTitle>{topicDetail.title}</TopicTitle>

      <SubBox>
        <SubTitle>
          <FaCaretSquareDown />
          <span>Details</span>
        </SubTitle>

        <TopicDetailBox>
          {updateTopic ? (
            <OptionBox>
              <UnfilledButton onClick={onUpdateTopicInfo}>Done</UnfilledButton>
            </OptionBox>
          ) : (
            <OptionBox>
              <UnfilledButton onClick={() => setUpdateTopic((cur) => !cur)}>
                Edit
              </UnfilledButton>
              <UnfilledButton onClick={onDeleteTopic}>Delete</UnfilledButton>
            </OptionBox>
          )}
          <p>Title</p>
          <ToggleBox>
            {updateTopic ? (
              <input
                type="text"
                name="title"
                value={topicDetail.title}
                onChange={onChangeTopicInfo}
                placeholder="Type Topic Title"
                required
              />
            ) : (
              <p>{topicDetail.title}</p>
            )}
          </ToggleBox>
          <p>Description</p>
          <ToggleBox>
            {updateTopic ? (
              <input
                type="text"
                name="description"
                value={topicDetail.description}
                onChange={onChangeTopicInfo}
                placeholder="Type Topic Description"
                required
              />
            ) : (
              <p>{topicDetail.description}</p>
            )}
          </ToggleBox>
        </TopicDetailBox>
      </SubBox>

      <SubBox>
        <SubTitle>
          <FaCaretSquareDown />
          <span>Issues</span>
        </SubTitle>

        <IssueContainer>
          {issueList && issueList.length > 0 ? (
            issueList.map((issue: any, index: number) => (
              <Link
                href={`/project/${projectNo}/issue/${issue.issueNo}`}
                key={index}
              >
                <IssueBox>
                  <div>
                    <p>No. {issue.issueNo}</p>
                    <p>{issue.title}</p>
                  </div>
                  <AssigneeBox>
                    <ImageBox>
                      <Image
                        src={`${
                          issue.assignee
                            ? issue.assignee.image
                            : "/profileImg.png"
                        }`}
                        width={20}
                        height={20}
                      />
                    </ImageBox>
                    <p>{issue.assignee.nickname}</p>
                  </AssigneeBox>
                </IssueBox>
              </Link>
            ))
          ) : (
            <span>No issues yet.</span>
          )}
        </IssueContainer>
      </SubBox>
    </TopicContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);
