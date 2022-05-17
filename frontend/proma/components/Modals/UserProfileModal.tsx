/* eslint-disable */
import Box from "@mui/material/Box";
import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";
import {
  style,
  ModalBox,
  Header,
  BodyContainer,
  UserProfileBox,
  WarnButton,
} from "./index";

import { connect } from "react-redux";
import { createNewTopic } from "../../store/modules/topic";
import { RootState } from "../../store/modules";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  updateUserImage,
  updateUserNickname,
  getUserInfo,
} from "../../store/modules/member";
import { FaCheck, FaPen } from "react-icons/fa";
import { getProjectList } from "../../store/modules/project";

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px 0;
  margin-right: 65px;
`;
const ToggleButton = styled.button`
  background-color: inherit;
  border: none;
  padding: 0;
  margin-left: 10px;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  text-decoration: underline;
`;
const ResetButton = styled(ToggleButton)`
  margin-top: 20px;
`;
const ImageBox = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    opacity: 0;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: inherit;
      height: inherit;
      cursor: pointer;
      color: ${(props: ThemeType) => props.theme.subBeigeColor};
      background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
    }
    input[type="file"] {
      width: 0;
      height: 0;
      padding: 0;
      border: 0;
      overflow: hidden;
      visibility: hidden;
    }
    &:hover {
      opacity: 0.6;
    }
  }
`;
const ToggleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  margin-left: 25px;
  cursor: pointer;
  input[type="text"],
  p {
    cursor: text;
    font-size: 22px;
    margin-right: 10px;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    updateUserNickname: (newNickname: any) =>
      dispatch(updateUserNickname(newNickname)),
    updateUserImage: (newUserImage: any) =>
      dispatch(updateUserImage(newUserImage)),
    getProjectList: () => dispatch(getProjectList()),
  };
};

const UserProfileModal = ({
  userProfileModal,
  showUserProfileModal,
  userInfo,
  getUserInfo,
  updateUserImage,
  updateUserNickname,
  getProjectList,
}: {
  userProfileModal: boolean;
  showUserProfileModal: any;
  userInfo?: any;
  getUserInfo?: any;
  updateUserImage?: any;
  updateUserNickname?: any;
  getProjectList?: any;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);

  const bringToken = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=e9aef6fccada43586c11`;
  };

  const onChangeProfileImage = (e: any) => {
    if (e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setProfileImage(fileReader.result as string);
      };
    }
    const newUserImage = new FormData();
    newUserImage.append("images", e.target.files[0]);
    updateUserImage(newUserImage).then((res: any) => getUserInfo());
  };

  const onResetProfileImage = () => {
    setProfileImage(
      "https://promaproject.s3.ap-northeast-2.amazonaws.com/image/proma.png"
    );
    updateUserImage("").then((res: any) => getUserInfo());
  };

  const onChangeUserNickname = (e: any) => {
    setUserName(e.target.value);
  };

  const onUpdateUserNickname = () => {
    if (userName === "") {
      alert("닉네임을 작성해주세요.");
      return;
    }
    setUpdateStatus(false);
    const newNickname = {
      nickname: userName,
    };
    updateUserNickname(newNickname).then((res: any) => getProjectList());
  };

  useEffect(() => {
    if (!userInfo) return;
    setUserName(userInfo.nickname);
    setProfileImage(userInfo.profileImage);
  }, [userInfo]);

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
            <ImageBox>
              <Image src={profileImage} width={180} height={180} />
              <div>
                <label htmlFor="file">
                  <FaPen />
                </label>
                <input type="file" id="file" onInput={onChangeProfileImage} />
              </div>
            </ImageBox>
            <ResetButton onClick={onResetProfileImage}>
              Set Basic Image
            </ResetButton>
            {updateStatus ? (
              <ToggleBox>
                <input
                  type="text"
                  value={userName}
                  placeholder="Type your name."
                  onChange={onChangeUserNickname}
                  autoFocus
                />
                <FaCheck onClick={onUpdateUserNickname} />
              </ToggleBox>
            ) : (
              <ToggleBox>
                <p>{userName}</p>
                <FaPen onClick={() => setUpdateStatus((cur) => !cur)} />
              </ToggleBox>
            )}
            <WarnButton onClick={bringToken}>Leave Proma</WarnButton>
          </UserProfileBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModal);
