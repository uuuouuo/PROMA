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

const SprintCreateModal = ({
  sprintCreateModal,
  showSprintCreateModal,
}: {
  sprintCreateModal: boolean;
  showSprintCreateModal: any;
}) => {
  interface sprintType {
    title: string;
    startDate: string;
    endDate: string;
  }

  const [newSprintInfo, setNewSprintInfo] = useState<sprintType>({
    title: "",
    startDate: "",
    endDate: "",
  });

  const onChangeSprintName = (e: any) => {
    const value = e.target.value as string;
    setNewSprintInfo((cur) => ({ ...cur, title: value }));
  };

  const onSelectStartDate = (e: any) => {
    const value = e.target.value;
    setNewSprintInfo((cur) => ({ ...cur, startDate: value }));
  };

  const onSelectEndDate = (e: any) => {
    const value = e.target.value as string;
    if (!newSprintInfo.startDate) {
      alert("Please choose start date first.");
      e.target.value = "";
      return;
    }

    if (new Date(newSprintInfo.startDate) >= new Date(value)) {
      e.target.value = "";
      alert(
        "The end date must be later than the start date. Please choose again"
      );
    }

    setNewSprintInfo((cur) => ({ ...cur, endDate: value }));
  };

  const cancelCreateSprint = () => {
    showSprintCreateModal();
  };

  const createNewSprint = () => {
    if (!newSprintInfo.title) {
      alert("Please type sprint title");
      return;
    }
    if (!newSprintInfo.startDate) {
      alert("Please choose start date");
      return;
    }
    if (!newSprintInfo.endDate) {
      alert("Please choose end date");
      return;
    }

    //post new sprint api

    showSprintCreateModal();
  };

  return (
    <ModalBox
      open={sprintCreateModal}
      onClose={showSprintCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Create Sprint</Header>
        <BodyContainer>
          <InputArea>
            <p>Title</p>
            <input
              type="text"
              value={newSprintInfo.title}
              placeholder="Type New Topic Name.."
              onChange={onChangeSprintName}
            />
            <p>Start Date</p>
            <input type="date" lang="en" onChange={onSelectStartDate} />
            <p>End Date</p>
            <input type="date" lang="en" onChange={onSelectEndDate} />
          </InputArea>
          <ButtonBox>
            <CancelButton onClick={cancelCreateSprint}>Cancel</CancelButton>
            <CreateButton onClick={createNewSprint}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(null, mapDispatchToProps)(SprintCreateModal);
