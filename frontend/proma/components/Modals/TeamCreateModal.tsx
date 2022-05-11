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
import { getIssueList } from "../../store/modules/issue";
import { RootState } from "../../store/modules";

const mapStateToProps = (state: RootState) => {
  return {
    onlyMyIssue: state.modeReducer.onlyMyIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewTeam: (newProjectInfo: any) =>
      dispatch(createNewTeam(newProjectInfo)),
    getIssueList: (params: any) => dispatch(getIssueList(params)),
  };
};

const TeamCreateModal = ({
  teamCreateModal,
  showTeamCreateModal,
  projectNo,
  createNewTeam,
  onlyMyIssue,
  getIssueList,
}: {
  teamCreateModal: boolean;
  showTeamCreateModal: any;
  projectNo: string;
  createNewTeam?: any;
  onlyMyIssue?: boolean;
  getIssueList?: any;
}) => {
  const [teamName, setTeamName] = useState<string>("");

  const addNewTeam = () => {
    const newProjectInfo = {
      projectNo,
      title: teamName,
    };
    createNewTeam(newProjectInfo).then((res: any) =>
      getIssueList({ projectNo, onlyMyIssue })
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamCreateModal);
