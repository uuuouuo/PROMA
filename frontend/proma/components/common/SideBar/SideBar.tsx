import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ThemeType } from "../../../interfaces/style";
import Project from "./Project";
import { FaUserAlt, FaRegTimesCircle } from "react-icons/fa";

const SideBarContainer = styled.div`
  width: 20vw;
  min-width: 200px;
  height: 100%;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const H4 = styled.h4`
  color: ${(props: ThemeType) => props.theme.mainColor};
  margin-left: 20px;
`;

const ProjectsContainer = styled.div`
  height: 90%;
  padding: 0 20px;
`;

const AddProjectButton = styled.button`
  background-color: inherit;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 15px;
  text-decoration: underline;
  border: none;
  margin: 20px 0;
  text-align: start;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const ModalBox = styled(Modal)`
  .MuiBox-root {
    padding: 0px;
    width: 600px;
    border: 0px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
  }
`;

const ModalHeader = styled.div`
  height: 50px;
  padding: 3px 20px;
  background: #6667ab;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

const ModalBody = styled.div`
  height: 500px;
  font-size: 25px;
  font-weight: 600;
  color: #6667ab;
  display: flex;
  flex-direction: column;
  margin: 32px 32px 50px 32px;
  align-items: center;
  color: ${(props: ThemeType) => props.theme.mainColor};
  input {
    border: none;
    border-radius: 3px;
    font-size: 20px;
    padding: 5px 10px;
    outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    &:focus {
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    }
  }
  textarea {
    border: none;
    border-radius: 3px;
    font-size: 20px;
    padding: 5px 10px;
    outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    &:focus {
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    }
  }
`;

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

const ModalButton1 = styled.button`
  background: white;
  height: 25px;
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  margin: 10px 0px 0px 10px;
  border-radius: 3px;
  color: ${(props: ThemeType) => props.theme.mainColor};
`;

const ModalButton2 = styled(ModalButton1)`
  background: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
`;

const projects = ["one", "two", "three"];

const SideBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 추가할 회원 아이디 작성 
  const onChange = (e: any) => {
    setEmail(e.target.value);
  };

  // 회원 추가 기능
  const handleKeyPress = (e: any) => {
    let value = e.target.value;

    if (todos.indexOf(value) == -1 && e.key === "Enter") {
      setTodos([...todos, value]);
    }
    else if(todos.indexOf(value) > -1 && e.key === "Enter"){
      javascript:alert('중복된 맴버입니다.');
    }
  };

  // 회원 삭제 기능
  const deleteEmail = (e: any) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i] === e) {
        todos.splice(i, 1);
        i--;
        setTodos([...todos]);
      }
    }
  };

  return (
    <SideBarContainer>
      <H4>My Projects</H4>
      <ProjectsContainer>
        {projects.map((project, index) => (
          <Project projectName={project} key={index}></Project>
        ))}
        <AddProjectButton onClick={handleOpen}>
          + Create New Project
        </AddProjectButton>
      </ProjectsContainer>

      {/* 프로젝트 생성 모달 */}
      <ModalBox
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalHeader>Create Project</ModalHeader>
          <ModalBody>
            <>
              {/* 프로젝트 이름 */}
              <div style={{ width: "100%", marginBottom: "3%" }}>
                <a>Project</a>
                <input
                  style={{
                    width: "96%",
                    height: "20px",
                    padding: "1% 2% 1% 2%",
                  }}
                ></input>
              </div>

              {/* 팀 소개 */}
              <div style={{ width: "100%", marginBottom: "3%" }}>
                <a>Introduce</a>
                <textarea
                  style={{
                    width: "96%",
                    height: "100px",
                    padding: "1% 2% 1% 2%",
                  }}
                ></textarea>
              </div>

              {/* 팀원 초대 */}
              <div style={{ width: "100%", marginBottom: "3%" }}>
                <a>Write an email to invite members</a>
                <input
                  style={{
                    width: "96%",
                    height: "20px",
                    padding: "1% 2% 1% 2%",
                  }}
                  value={email}
                  onChange={onChange}
                  onKeyPress={handleKeyPress}
                ></input>
              </div>

              <div style={{ width: "100%" }}>
                <a>Members</a>

                {/* 추가된 팀원  */}
                <div style={{ width: "96%", height: "90px", padding: "1% 2% 1% 2%", overflow: "auto" }}>
                  {todos.map((datas, index) => {
                    return (
                      <div key={index} style={{display: "flex", alignItems: "center", marginBottom: "1%"}}>
                        <FaUserAlt
                          style={{
                            width: "4%",
                            height: "4%",
                            marginRight: "1%",
                          }}
                        />
                        <a style={{fontWeight: "normal", fontSize: "20px", textDecoration: "underline"}}>{datas}</a>
                        <FaRegTimesCircle
                          style={{
                            width: "4%",
                            height: "4%",
                            marginLeft: "2%",
                          }}
                          onClick={() => deleteEmail(datas)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                style={{ marginTop: "2%", marginLeft: "auto", display: "flex" }}
              >
                <ModalButton1 onClick={handleClose}>Cancel</ModalButton1>
                <ModalButton2>Create</ModalButton2>
              </div>
            </>
          </ModalBody>
        </Box>
      </ModalBox>
    </SideBarContainer>
  );
};

export default SideBar;
