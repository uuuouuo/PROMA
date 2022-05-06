import { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeType } from "../../../../interfaces/style";
import { FaPen, FaCheck, FaCaretSquareDown } from "react-icons/fa";
import Image from "next/image";

import { connect } from "react-redux";
import { getTopicInfo } from "../../../../store/modules/topic";
import { RootState } from "../../../../store/modules";
import { useRouter } from "next/router";

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
  }
`;
const TopicDetailBox = styled(SubBox)`
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

const mapStateToProps = (state: RootState) => {
  return {
    topicInfo: state.topicReducer.topicInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTopicInfo: (topicNo: string) => dispatch(getTopicInfo(topicNo)),
  };
};

const TopicDetail = ({
  getTopicInfo,
  topicInfo,
}: {
  getTopicInfo: any;
  topicInfo: any;
}) => {
  const router = useRouter();
  const [updateTopic, setUpdateTopic] = useState<boolean>(false);
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

  useEffect(() => {
    if (!router.isReady) return;
    const topicCode = router.query.topicCode as string;
    setTopicNo(topicCode);
    getTopicInfo(topicCode);
  }, [router.asPath]);

  useEffect(() => {
    if (!topicInfo) return;
    console.log(topicInfo);

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
          <IconBox onClick={() => setUpdateTopic((cur) => !cur)}>
            {updateTopic ? <FaCheck /> : <FaPen />}
          </IconBox>
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
          {/* {issueData.map((issue, index) => (
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
          ))} */}
        </IssueContainer>
      </SubBox>
    </TopicContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);
