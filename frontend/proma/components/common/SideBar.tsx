import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";

const SideBarContainer = styled.div`
  width: 200px;
  height: 90vh;
  padding: 30px;
  background-color: #c4c4c4;
  position: relative;
  z-index: -1;
`;

const Title = styled.a`
    font-size: 25px;
    font-weight:
    width: 90%;
    background: white;
    padding-left: 5%;
    padding-right: 5%;
    border-bottom: 3px solid black;
    display: flex;
    place-items: center;
`;

const Team = styled.div`
  font-size: 20px;
  margin-left: 30px;
  margin-right: 30px;
`;

const TeamDetail = styled.div`
  display: flex;
  place-items: center;
`;

const TeamName = styled.a`
  text-decoration: underline;
  font-size: 20px;
`;

const ChatButton = styled.button`
  margin-left: auto;
  height: 25px;
`;

const AddTeam = styled.div`
  font-size: 20px;
  margin-left: 30px;
  margin-right: 30px;
  bottom: 60px;
  width: 100%;
  position: absolute;
  margin-bottom: 10px;
`;

const Member = styled.div`
  font-size: 20px;
  margin-top: 5px;
  margin-left: 20px;
  display: flex;
  place-items: center;
`;

const MemberName = styled.a`
  font-size: 15px;
  margin-left: 30px;
`;

// 팀 생성 모달
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

const TeamAdd = styled.div`
  height: 50px;
  background: lightgrey;
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

// 더미파일
const dummy = [
  {
    team: "FrontEnd",
  },
  {
    team: "BackEnd",
  },
  {
    team: "Deploy",
  },
  {
    team: "DB",
  },
];

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
    name: "서은민",
    image:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
  },
];

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SideBarContainer>
        <Title>
          <Link href="/project/0">
            <a>Proma</a>
          </Link>
          <ChatButton>chat</ChatButton> 
          <a onClick={handleOpen}>+</a>
        </Title>

        {/* 팀 생성 모달 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TeamAdd>생성할 팀 입력</TeamAdd>
          </Box>
        </Modal>

        <Team>
          {/* 팀 목록 */}
          {dummy.map((element, idx) => {
            return (
              <TeamDetail key={idx}>
                <TeamName>{element.team}</TeamName>{" "}
                <ChatButton>chat</ChatButton>
              </TeamDetail>
            );
          })}

          {/* 맴버 목록 */}
          {dummy2.map((element, idx) => {
            return (
              <Member key={idx}>
                <img
                  style={{ width: "20%", borderRadius: "50%" }}
                  src={`${element.image}`}
                />{" "}
                <MemberName>{element.name}</MemberName>
              </Member>
            );
          })}
        </Team>
        <AddTeam style={{ marginLeft: "auto" }}>
          <Link href="/">
            <a>+ Create New Team</a>
          </Link>
        </AddTeam>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
