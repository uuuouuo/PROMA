import { useEffect, useState } from "react";
import styled from "styled-components";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Image from "next/image";
import { ThemeType } from "../../interfaces/style";
import Link from "next/link";
import Toggle from "./Toggle";
import { LoginModal, JoinModal, UserProfileModal } from "./Modal";
import { FaRegUserCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { RootState } from "../../store/modules";

const NavBarContainer = styled.div`
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: white;
  button {
    &:hover {
      cursor: pointer;
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
  font-size: 30px;
  margin-top: 10px;
`;
const MenuToggleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
`;

const mapStateToProps = (state: RootState) => {
  return {
      userInfo : state.userReducer.userInfo,
  };
}
  
const NavBar = ({
  userInfo,
}: {
    userInfo: any;
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [joinModal, setJoinModal] = useState<boolean>(false);
  const [userProfileModal, setUserProfileModal] = useState<boolean>(false);

  const toggleLoginStatus = () => setIsLogin((cur) => !cur);
  const showLoginModal = () => setLoginModal((cur) => !cur);
  const showJoinModal = () => setJoinModal((cur) => !cur);
  const showUserProfileModal = () => setUserProfileModal((cur) => !cur);

  const setLogOut = () => {
    setIsLogin(false);
  }; 

  return (
    <NavBarContainer>
      <Link href="/">
        <Logo>
          <Image src="/logo.png" width={130} height={55} />
        </Logo>
      </Link>

      <MenuBox>
        {!userInfo ? (
          <MenuToggleBox>
            <MenuButton onClick={showLoginModal}>Login</MenuButton>
            <LoginModal
              loginModal={loginModal}
              showLoginModal={showLoginModal}
              showJoinModal={showJoinModal}
              toggleLoginStatus={toggleLoginStatus}
            />
            <JoinModal
              joinModal={joinModal}
              showJoinModal={showJoinModal}
              toggleLoginStatus={toggleLoginStatus}
            />
          </MenuToggleBox>
        ) : (
          <MenuToggleBox>
            <MenuIconButton onClick={showUserProfileModal}>
              <FaRegUserCircle />
            </MenuIconButton>
            <UserProfileModal
              userProfileModal={userProfileModal}
              showUserProfileModal={showUserProfileModal}
            />
            <MenuButton onClick={setLogOut}>Logout</MenuButton>
          </MenuToggleBox>
        )}

        <Toggle />
      </MenuBox>
    </NavBarContainer>
  );
};

export default  connect(mapStateToProps, null)(NavBar);
