import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";

const NavBarContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #6667ab;
  color: white;
`;

const Logo = styled.div``;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background-color: inherit;
  border: none;
  font-size: 25px;
  color: white;
  margin-right: 20px;
`;

const MenuIconButton = styled(MenuButton)`
  font-size: 35px;
  margin-top: 10px;
`;

const MenuToggleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
`;

const Profileimg = styled.div`
  text-align: -webkit-center;
`;

const Profile = styled.div`
  align-self: center;
`;

{
  /* 로그인 모달 */
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

{
  /* 마이페이지 모달 */
}
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  paddingTop: "80px",
  paddingBottom: "80px",
};

const Login = styled.div`
  height: 50px;
  justify-content: center;
  background: lightgrey;
  font-weight: bold;
  font-size: 23px;
  display: flex;
  align-items: center;
`;

const Username = styled.div`
  width: 40%;
  height: 40px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const NavBar = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: any;
  darkMode: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  return (
    <>
      <NavBarContainer>
        <Logo>
          <Image src="/logo.png" width={170} height={70} />
        </Logo>
        <MenuBox>
          {name == "" ? (
            <MenuToggleBox>
              <MenuButton onClick={handleOpen}>Login</MenuButton>
              <MenuButton onClick={handleOpen}>Join</MenuButton>
            </MenuToggleBox>
          ) : (
            <MenuToggleBox>
              <MenuIconButton onClick={handleOpen2}>
                <FaRegUserCircle />
              </MenuIconButton>
              <MenuButton onClick={() => location.reload()}>Logout</MenuButton>
            </MenuToggleBox>
          )}
          <MenuButton onClick={toggleDarkMode}>
            {darkMode ? "dark" : "light"}
          </MenuButton>
        </MenuBox>

        {/* 로그인 모달 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Login
              onClick={() => {
                setName("박주한");
                setImage(
                  "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png"
                );
                handleClose();
              }}
            >
              Github
            </Login>
          </Box>
        </Modal>

        {/* 마이페이지 모달 */}
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Profile>
              <Profileimg>
                {image == "" ? (
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    src="/profileimg.png"
                  />
                ) : (
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    onClick={handleOpen2}
                    src={image}
                  />
                )}
              </Profileimg>
            </Profile>
            <Username>{name}</Username>
          </Box>
        </Modal>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
