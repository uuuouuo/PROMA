import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

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

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [state, setState] = React.useState({
    isPaneOpen: false
  });

  const dummy2 = [
    {
      name: "김일환",
      image:
        "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png",
    },
    {
      name: "장소명",
      image:
        "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png",
    },
    {
      name: "장다빈",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
    },
    {
      name: "박주한",
      image:
        "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png",
    },
    {
      name: "서은민",
      image:
        "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
    },
  ];

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

        <button onClick={() => setState({ isPaneOpen: true })}>
        Click me to open right pane!
      </button>
      <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={state.isPaneOpen}
          title="DB"
          subtitle="DB 단체회의방입니다."
          width="800px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            setState({ isPaneOpen: false });
          }}
        >
          <div>
            {dummy2.map((element, idx) => {
              if (element.name !== "박주한")
                return (
                  <div style={{ display: "flex", marginBottom: "4%" }} key={idx}>
                    <img style={{ width: "8%", height: "60px", borderRadius: "50%", marginRight: "2%" }} src={`${element.image}`} />
                    <div style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                      <a style={{ fontWeight: "bold" }}>{element.name}</a>{" "}
                      <a onClick={() => setState({ isPaneOpen: true })}>내용 작성했습니다.</a>
                    </div>
                  </div>
                );
              else
                return (
                  <div style={{ display: "flex", marginBottom: "4%", justifyContent: "right" }} key={idx}>
                    <img style={{ width: "8%", height: "60px", borderRadius: "50%", marginRight: "2%" }} src={`${element.image}`} />
                    <div style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                      <a style={{ fontWeight: "bold" }}>{element.name}</a>{" "}
                      <a onClick={() => setState({ isPaneOpen: true })}>내용 작성했습니다.</a>
                    </div>
                  </div>
                );
            })}
          </div>
          <br />
        </SlidingPane>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
