/* eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FaPen,
  FaCheck,
  FaGithub,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ThemeType } from "../../interfaces/style";
import Link from "next/link";
import Image from "next/image";

//styling
export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  width: "inherit",
  boxShadow: 24,
  p: 4,
};
//styled components
export const ModalBox = styled(Modal)`
  .MuiBox-root {
    width: fit-content;
    min-width: 400px;
    padding: 0px;
    border: 0px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
    input,
    textarea {
      padding: 5px 10px;
      border: none;
      outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
      border-radius: 3px;
      resize: none;
      width: 100%;
      font-size: 18px;
      &:focus {
        outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
      }
    }
    textarea {
      height: 100px;
    }
    button {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export const Header = styled.div`
  height: 50px;
  padding: 5px 20px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;
export const BodyContainer = styled.div`
  margin: 0;
  padding: 10px 25px;
  font-size: 22px;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  a {
    text-decoration: none;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
  }
  p {
    margin: 10px 0;
  }
`;
export const InputArea = styled.div`
  width: inherit;
  padding-right: 25px;
`;
export const TextButton = styled.button`
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  text-decoration: underline;
  background-color: inherit;
  border: none;
  width: 100%;
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 15px 5px 10px 0;
`;
export const Button = styled.button`
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  padding: 3px 10px;
  font-size: 15px;
  width: 70px;
  margin-left: 10px;
`;
export const CancelButton = styled(Button)`
  color: ${(props: ThemeType) => props.theme.mainColor};
  background-color: white;
`;
export const CreateButton = styled(Button)`
  color: white;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
`;
export const WarningContainer = styled.div`
  padding: 30px;
  font-size: 22px;
  font-weight: 550;
  color: #efaf01;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 80px;
  p {
    color: #d71d32;
    font-size: 20px;
    text-align: center;
  }
`;
export const WarningButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
export const MaintainButton = styled(Button)`
  width: inherit;
  margin-top: 20px;
  padding: 5px 15px;
  color: white;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 18px;
`;
export const DeleteButton = styled(Button)`
  color: ${(props: ThemeType) => props.theme.subPurpleColor};
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  border: 0px solid ${(props: ThemeType) => props.theme.bgColor};
  font-size: 15px;
  width: inherit;
  margin-top: 10px;
`;
export const MemberBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  span {
    font-size: 20px;
    margin: 0 10px;
  }
`;
export const SocialLoginButton = styled.button`
  width: 100%;
  margin: 15px 0;
  padding: 15px;
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${(props: ThemeType) => props.theme.bgColor};
  background-color: ${(props: ThemeType) => props.theme.textColor};
  span {
    margin-left: 10px;
    font-size: 22px;
  }
`;
export const UserProfileBox = styled(InputArea)`
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  button {
    position: absolute;
    top: 20px;
    right: 10px;
    border: none;
    color: ${(props: ThemeType) => props.theme.textColor};
    background-color: inherit;
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  div {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p,
    input {
      margin-top: 30px;
      width: inherit;
      font-size: 25px;
    }
    p {
      text-align: center;
      font-weight: 600;
    }
  }
`;

export const IssueCreateModal = ({
  issueCreateModal,
  showIssueCreateModal,
}: {
  issueCreateModal: boolean;
  showIssueCreateModal: any;
}) => {
  //dummy data
  const topicList = ["Topic1", "Topic2", "Topic3"];
  const memberList = ["Kim", "Park", "Choi", "Seo", "Jang"];

  interface issueType {
    title: string;
    desc: string;
    topic: string;
    assignee: string;
  }

  const [newIssueInfo, setNewIssueInfo] = useState<issueType>({
    title: "",
    desc: "",
    topic: "",
    assignee: "",
  });

  const onSelectTopic = (e: any) => {
    const value = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, topic: value }));
  };

  const onSelectAssignee = (e: any) => {
    const value = e.target.value as string;
    setNewIssueInfo((cur) => ({ ...cur, assignee: value }));
  };

  const cancelCreateIssue = () => showIssueCreateModal();

  const createNewIssue = () => {
    //topic, assignee 리스트 내 존재하는 value인지 확인
    if (topicList.indexOf(newIssueInfo.topic) === -1) {
      alert("Please select an existing topic name in the list.");
      return;
    }
    if (memberList.indexOf(newIssueInfo.assignee) === -1) {
      alert("Please select an existing assignee name in the list.");
      return;
    }

    //post new issue api

    showIssueCreateModal();
  };

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
              placeholder="Type New Issue Title.."
            />

            <p>Description</p>
            <textarea
              value={newIssueInfo.desc}
              placeholder="Type New Issue Description.."
            />

            <p>Topic</p>
            <form>
              <input
                type="text"
                list="topicList"
                value={newIssueInfo.topic}
                placeholder="Choose Topic"
                onChange={onSelectTopic}
                onInput={onSelectTopic}
              />
              <datalist id="topicList">
                {topicList.map((topic, index) => (
                  <option value={topic} key={index}>
                    {topic}
                  </option>
                ))}
              </datalist>
            </form>

            <p>Assignee</p>
            <form>
              <input
                type="text"
                list="memberList"
                value={newIssueInfo.assignee}
                placeholder="Choose Issue Assignee"
                onChange={onSelectAssignee}
                onInput={onSelectAssignee}
              />
              <datalist id="memberList">
                {memberList.map((member, index) => (
                  <option value={member} key={index}>
                    {member}
                  </option>
                ))}
              </datalist>
            </form>
          </InputArea>

          <ButtonBox>
            <CancelButton onClick={cancelCreateIssue}>Cancel</CancelButton>
            <CreateButton onClick={createNewIssue}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const LoginModal = ({
  loginModal,
  showLoginModal,
  showJoinModal,
  toggleLoginStatus,
}: {
  loginModal: boolean;
  showLoginModal: any;
  showJoinModal: any;
  toggleLoginStatus: any;
}) => {
  const onSocialLogin = () => {
    //github로 가서 로그인
    //로그인 성공하면 기존 회원인지 여부 확인

    //확인 후 유저라면 바로 로그인 후 로그인 모달 닫기
    // toggleLoginStatus();
    // showLoginModal();

    //아니라면 조인모달 띄움
    showLoginModal();
    showJoinModal();
  };

  return (
    <ModalBox
      open={loginModal}
      onClose={showLoginModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Login</Header>
        <BodyContainer>
          <SocialLoginButton onClick={onSocialLogin}>
            <FaGithub />
            <span>GitHub</span>
          </SocialLoginButton>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const JoinModal = ({
  joinModal,
  showJoinModal,
  toggleLoginStatus,
}: {
  joinModal: boolean;
  showJoinModal: any;
  toggleLoginStatus: any;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [userProfileImage, setUserProfileImage] = useState<string>("");

  const joinProma = () => {
    //post new user api
    //등록 후 바로 로그인 시키고

    //로그인 시 상태 갱신 후 모달 닫기
    toggleLoginStatus();
    showJoinModal();
  };

  return (
    <ModalBox
      open={joinModal}
      onClose={showJoinModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Join</Header>
        <BodyContainer>
          <InputArea>
            <p>Profile Image</p>
            <input type="file" />
            <p>Name</p>
            <input
              type="text"
              value={userName}
              placeholder="Please type your name."
            />
          </InputArea>

          <ButtonBox>
            <CancelButton onClick={showJoinModal}>Cancel</CancelButton>
            <CreateButton onClick={joinProma}>Join</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export const UserProfileModal = ({
  userProfileModal,
  showUserProfileModal,
}: {
  userProfileModal: boolean;
  showUserProfileModal: any;
}) => {
  const [userName, setUserName] = useState<string>("sue");
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);

  return (
    <ModalBox
      open={userProfileModal}
      onClose={showUserProfileModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Profile</Header>
        <BodyContainer>
          <UserProfileBox>
            <button onClick={() => setUpdateStatus((cur) => !cur)}>
              {!updateStatus ? <FaPen /> : <FaCheck />}
            </button>
            {!updateStatus ? (
              <div>
                <Image src="/profileimg.png" width={180} height={180} />
                <p>{userName}</p>
              </div>
            ) : (
              <div>
                <Image src="/profileimg.png" width={180} height={180} />
                <input
                  type="text"
                  value={userName}
                  placeholder="Type your name."
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </UserProfileBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};
