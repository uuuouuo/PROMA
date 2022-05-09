/* eslint-disable */
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  style,
  ModalBox,
  Header,
  BodyContainer,
  InputArea,
  ButtonBox,
  CancelButton,
  CreateButton,
} from "./index";

import { connect } from "react-redux";
import { createNewTeam } from "../../store/modules/team";

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewTeam: (newProjectInfo: any) =>
      dispatch(createNewTeam(newProjectInfo)),
  };
};

const TeamCreateModal = ({
  teamCreateModal,
  showTeamCreateModal,
  projectNo,
  createNewTeam,
}: {
  teamCreateModal: boolean;
  showTeamCreateModal: any;
  projectNo: string;
  createNewTeam?: any;
}) => {
  const [teamName, setTeamName] = useState<string>("");

  const addNewTeam = () => {
    const newProjectInfo = {
      projectNo,
      title: teamName,
    };
    createNewTeam(newProjectInfo);
    setTeamName("");
    showTeamCreateModal();
  };

  return (
    <ModalBox
      open={teamCreateModal}
      onClose={showTeamCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Create Team</Header>
        <BodyContainer>
          <InputArea>
            <p>Team</p>
            <input
              type="text"
              value={teamName}
              placeholder="Please type team name."
              onChange={(e) => setTeamName(e.target.value)}
            />
          </InputArea>

          <ButtonBox>
            <CancelButton onClick={showTeamCreateModal}>Cancel</CancelButton>
            <CreateButton onClick={addNewTeam}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(null, mapDispatchToProps)(TeamCreateModal);
