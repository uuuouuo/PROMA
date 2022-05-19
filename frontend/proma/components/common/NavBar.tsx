/* eslint-disable */
import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";
import { FaRegUserCircle, FaRegBell, FaBell } from "react-icons/fa";
import "react-sliding-pane/dist/react-sliding-pane.css";

import Toggle from "./Toggle";
import { LoginModal, JoinModal } from "./Modal";
import UserProfileModal from "../Modals/UserProfileModal";
import { ToastContainer, toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { connect } from "react-redux";
import { RootState } from "../../store/modules";
import { getLogout } from "../../store/modules/member";
import {
  getNotificationList,
  updateNotificationConfirmed,
} from "../../store/modules/notify";

import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { BACKEND_URL } from "../../config";
import { userInstance } from "../../api";

const userApi = userInstance();

const NavBarContainer = styled.div`
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: white;
  position: relative;
  button {
    &:hover {
      cursor: pointer;
    }
  }
`;
const NotiElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 15px;
  color: black;
  padding: 15px 20px;
  span {
    font-size: 12px;
  }
  p {
    align-self: flex-start;
    margin: 0;
  }
  .mainText {
    font-weight: 500;
    padding: 10px 0;
    text-decoration: none;
  }
  button {
    color: ${(props: ThemeType) => props.theme.mainColor};
    background-color: ${(props: ThemeType) => props.theme.subBeigeColor};
    border: none;
    border-radius: 3px;
    padding: 3px 5px;
    font-size: 12px;
  }
`;
const NotiBox = styled.div`
  position: absolute;
  width: 300px;
  max-height: 400px;
  right: 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0 0 0 3px;
  z-index: 2;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  overflow-y: scroll;
  border: 3px solid ${(props: ThemeType) => props.theme.subBeigeColor};
  ${NotiElement} {
    width: 88%;
    border-bottom: 3px solid ${(props: ThemeType) => props.theme.subBeigeColor};
    &:last-child {
      border: none;
      border-radius: 0 0 0 3px;
    }
  }
`;
const Logo = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;
const MenuButton = styled.button`
  background-color: inherit;
  border: none;
  font-size: 20px;
  color: white;
  margin-right: 20px;
`;
const MenuIconButton = styled(MenuButton)`
  font-size: 25px;
  margin-top: 10px;
`;
const MenuToggleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
`;
const ImageBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${(props: ThemeType) => props.theme.subPurpleColor};
  margin-bottom: 2px;
`;
const StyledComponent = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    * {
      margin: 0;
      color: ${(props: ThemeType) => props.theme.elementTextColor};
    }
  }
  .Toastify__toast {
    border: 0.5px solid ${(props: ThemeType) => props.theme.elementTextColor};
    min-width: 300px;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
  }
  .Toastify__toast-body {
    .toastContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p {
        font-size: 15px;
      }
      button {
        align-self: flex-end;
        color: ${(props: ThemeType) => props.theme.elementTextColor};
        background-color: ${(props: ThemeType) => props.theme.elementBgColor};
        border: 1px solid ${(props: ThemeType) => props.theme.elementTextColor};
        border-radius: 3px;
        padding: 3px 5px;
        font-size: 12px;
      }
    }
  }
  .Toastify__progress-bar {
    background-color: black;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
    isLogin: state.userReducer.isLogin,
    notificationList: state.notifyReducer.notificationList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLogout: () => dispatch(getLogout()),
    getNotificationList: () => dispatch(getNotificationList()),
    updateNotificationConfirmed: (notificationNo: number) =>
      dispatch(updateNotificationConfirmed(notificationNo)),
  };
};

const getRefresh = async () => {
  return await userApi
    .post(`/user/refresh`)
    .then((res: any) => {
      localStorage.setItem("Authorization", res.headers.authorization);
    })
    .catch((err: any) => err);
};

const NavBar = ({
  userInfo,
  isLogin,
  getLogout,
  notificationList,
  getNotificationList,
  updateNotificationConfirmed,
}: {
  userInfo: any;
  isLogin: boolean;
  getLogout: any;
  notificationList: any;
  getNotificationList: any;
  updateNotificationConfirmed: any;
}) => {
  const router = useRouter();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [joinModal, setJoinModal] = useState<boolean>(false);
  const [userProfileModal, setUserProfileModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<Object>>([]);
  const [image, setImage] = useState<string>("");

  const showLoginModal = () => setLoginModal((cur) => !cur);
  const showJoinModal = () => setJoinModal((cur) => !cur);
  const showUserProfileModal = () => setUserProfileModal((cur) => !cur);
  const showNotificationBox = () => setShowNotifications((cur) => !cur);

  const onLogOut = () => getLogout();

  const confirmNotification = (notificationNo: number) => {
    updateNotificationConfirmed(notificationNo).then((res: any) =>
      getNotificationList()
    );
  };

  const notify = (messagedto: any) => {
    toast(
      <div className="toastContainer">
        <p>
          {messagedto.notificationTime.split("T").join(" / ").split(".")[0]}
        </p>
        <br />
        <p>
          <strong>{messagedto.message.split("\n")[0]}</strong>
        </p>
        <p>{messagedto.message.split("\n")[1]}</p>
        <br />
        <button onClick={() => confirmNotification(messagedto.notificationNo)}>
          Confirm
        </button>
      </div>,
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    setIsReady(true);
  }, [router.isReady]);

  useEffect(() => {
    if (!isLogin) return;
    if (!userInfo.no) return;
    getRefresh();
    setInterval(() => getRefresh(), 850000);
    setImage(userInfo.profileImage);
    getNotificationList().then((res: any) => {
      const sock = new SockJS(`${BACKEND_URL}/ws-stomp`);
      const client = Stomp.over(sock, { debug: false });
      const Authorization = localStorage
        .getItem("Authorization")
        ?.split(" ")[1]
        .toString();

      const NOTI_SUBSCRIBE_URL = `/queue/notification/${userInfo.no}`;
      //   console.log(NOTI_SUBSCRIBE_URL);

      client.connect({ Authorization }, () => {
        client.subscribe(NOTI_SUBSCRIBE_URL, (res: any) => {
          const messagedto = JSON.parse(res.body);
          getNotificationList();
          alert(messagedto.message);

          //   notify(messagedto);
        });
      });
    });
  }, [isLogin, userInfo]);

  useEffect(() => {
    if (!notificationList) return;
    setNotifications(notificationList);
  }, [notificationList]);

  return (
    <>
      {isReady ? (
        <NavBarContainer>
          <Link href="/">
            <Logo>
              <Image src="/logo.png" width={130} height={55} />
            </Logo>
          </Link>

          <MenuBox>
            {!isLogin ? (
              <MenuToggleBox>
                <MenuButton onClick={showLoginModal}>Login</MenuButton>
                <LoginModal
                  loginModal={loginModal}
                  showLoginModal={showLoginModal}
                  showJoinModal={showJoinModal}
                  toggleLoginStatus={isLogin}
                />
                <JoinModal
                  joinModal={joinModal}
                  showJoinModal={showJoinModal}
                  toggleLoginStatus={isLogin}
                />
              </MenuToggleBox>
            ) : (
              <MenuToggleBox>
                <MenuIconButton onClick={showUserProfileModal}>
                  <ImageBox>
                    {image ? (
                      <Image src={`${image}`} width={30} height={30} />
                    ) : (
                      <Image src="/profileimg.png" width={30} height={30} />
                    )}
                  </ImageBox>
                </MenuIconButton>
                <UserProfileModal
                  userProfileModal={userProfileModal}
                  showUserProfileModal={showUserProfileModal}
                />
                <MenuIconButton>
                  {showNotifications ? (
                    <FaBell onClick={showNotificationBox} />
                  ) : (
                    <FaRegBell onClick={showNotificationBox} />
                  )}
                </MenuIconButton>
                <StyledComponent
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                {showNotifications ? (
                  <NotiBox>
                    {notifications && notifications.length > 0 ? (
                      notifications?.map((notification: any) => (
                        <NotiElement key={notification.notificationNo}>
                          <span>
                            {notification.notificationTime
                              .split("T")
                              .join(" / ")}
                          </span>
                          <p>{notification.message.split("\n")[0]}</p>
                          <p className="mainText">
                            {notification.message.split("\n")[1]}
                          </p>
                          <button
                            onClick={() =>
                              confirmNotification(notification.notificationNo)
                            }
                          >
                            Confirm
                          </button>
                        </NotiElement>
                      ))
                    ) : (
                      <NotiElement>
                        <p className="noNoti">
                          There are no new notifications.
                        </p>
                      </NotiElement>
                    )}
                  </NotiBox>
                ) : null}
                <MenuButton onClick={onLogOut}>Logout</MenuButton>
              </MenuToggleBox>
            )}

            <Toggle />
          </MenuBox>
        </NavBarContainer>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
