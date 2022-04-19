import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const NavBarContainer = styled.div`
  height: 100px;
  padding-left: 30px;
  display: grid;
  grid-template-columns: 180px auto 100px 200px;
  background-color: #C4C4C4;
`;

const Logo = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-align: -webkit-center;
  align-self: center;
`;

const Profileimg = styled.div`
  text-align: -webkit-center;
`;

const Profile = styled.div`
  align-self: center;
`;

const Memberfunc = styled.div`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`;

{/* 로그인 모달 */}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

{/* 마이페이지 모달 */}
const style2 = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  paddingTop: '80px',
  paddingBottom: '80px'
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

// const name = "박주한";
// const image = "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png";

const NavBar = () => {
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
          <a>PROMA</a>
        </Logo>
        <div></div>
        <Profile>
          <Profileimg>
            {
              image == "" ? <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src="/profileimg.png" /> 
                : <img style={{width: "50px", height: "50px", borderRadius: "50%"}} onClick={handleOpen2} src={ image }/>
            }
          </Profileimg>
        </Profile>
        <Memberfunc>
          {
            name == "" ? <a onClick={handleOpen}>로그인 / 회원가입</a> : <div><a>{name}</a> <a onClick={() => location.reload()}>로그아웃</a></div>
          }
        </Memberfunc>

        {/* 로그인 모달 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Login onClick={() => {
              setName('박주한');
              setImage('https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png');
              handleClose();
            }}>
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
              {
                image == "" ? <img style={{width: "150px", height: "150px", borderRadius: "50%"}} src="/profileimg.png" /> 
                  : <img style={{width: "150px", height: "150px", borderRadius: "50%"}} onClick={handleOpen2} src={ image }/>
              }
              </Profileimg>
            </Profile>
            <Username>
              {name}
            </Username>
          </Box>
        </Modal>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
