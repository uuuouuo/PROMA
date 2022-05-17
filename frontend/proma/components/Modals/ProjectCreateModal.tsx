/* eslint-disable */
import { useState } from "react";
import { FaUserAlt, FaRegTimesCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import {
  style,
  ModalBox,
  ButtonBox,
  Header,
  BodyContainer,
  InputArea,
  MemberBox,
  CancelButton,
  CreateButton,
} from "./index";

export const ProjectCreateModal = ({
  projectCreateModal,
  showProjectCreateModal,
  postNewProject,
}: {
  projectCreateModal: boolean;
  showProjectCreateModal: any;
  postNewProject: any;
}) => {
  interface projectType {
    title: string;
    introduction: string;
    inviteMails: Array<string>;
  }

  const [newProjectInfo, setNewProjectInfo] = useState<projectType>({
    title: "",
    introduction: "",
    inviteMails: [],
  });

  const [memberEmail, setMemberEmail] = useState<string>("");

  const onChangeProjectName = (e: any) => {
    const value = e.target.value as string;
    setNewProjectInfo((cur) => ({ ...cur, title: value }));
  };

  const onChangeProjectDesc = (e: any) => {
    const value = e.target.value as string;
    setNewProjectInfo((cur) => ({ ...cur, introduction: value }));
  };

  const onChangeMemberEmail = (e: any) => {
    const value = e.target.value as string;
    setMemberEmail(value);
  };

  const addMember = (e: any) => {
    if (
      newProjectInfo.inviteMails.indexOf(memberEmail) === -1 &&
      e.key === "Enter"
    ) {
      setNewProjectInfo((cur) => ({
        ...cur,
        inviteMails: [...cur.inviteMails, memberEmail],
      }));
      setMemberEmail("");
    } else if (
      newProjectInfo.inviteMails.indexOf(memberEmail) > -1 &&
      e.key === "Enter"
    ) {
      alert("이미 목록에 존재하는 이메일입니다.");
    } else {
      return;
    }
  };

  const removeMember = (index: number) => {
    let memberList = newProjectInfo.inviteMails;
    let updatedList = memberList.splice(index, 1);
    setNewProjectInfo((cur) => ({
      ...cur,
      invitedMembers: updatedList,
    }));
  };

  const createNewProject = () => {
    console.log(newProjectInfo);
    postNewProject(newProjectInfo);
    showProjectCreateModal();
    setNewProjectInfo({
      title: "",
      introduction: "",
      inviteMails: [],
    });
  };

  return (
    <ModalBox
      open={projectCreateModal}
      onClose={showProjectCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Create Project</Header>
        <BodyContainer>
          <InputArea>
            <p>Title</p>
            <input
              type="text"
              value={newProjectInfo.title}
              placeholder="Please type project title."
              onChange={onChangeProjectName}
              autoFocus
            />

            <p>Introduction</p>
            <textarea
              value={newProjectInfo.introduction}
              placeholder="Please type project introduction."
              onChange={onChangeProjectDesc}
            />

            <p>Write an email to invite members</p>
            <input
              type="email"
              value={memberEmail}
              placeholder="Please type member's email."
              onChange={onChangeMemberEmail}
              onKeyPress={addMember}
            />

            <p>Members</p>
            <div>
              {newProjectInfo.inviteMails.map((member, index) => (
                <MemberBox key={index}>
                  <FaUserAlt />
                  <span>{member}</span>
                  <FaRegTimesCircle onClick={() => removeMember(index)} />
                </MemberBox>
              ))}
            </div>
          </InputArea>

          <ButtonBox>
            <CancelButton onClick={showProjectCreateModal}>Cancel</CancelButton>
            <CreateButton onClick={createNewProject}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};
