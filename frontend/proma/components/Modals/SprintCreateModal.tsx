import { useEffect, useState } from "react";
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
import { createNewSprint } from "../../store/modules/sprint";
import { useRouter } from "next/router";

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewSprint: (newSprintInfo: any) =>
      dispatch(createNewSprint(newSprintInfo)),
  };
};

const SprintCreateModal = ({
  sprintCreateModal,
  showSprintCreateModal,
  createNewSprint,
}: {
  sprintCreateModal: boolean;
  showSprintCreateModal: any;
  createNewSprint?: any;
}) => {
  const router = useRouter();

  interface sprintType {
    title: string;
    startDate: string;
    endDate: string;
    projectNo: string;
  }

  const [newSprintInfo, setNewSprintInfo] = useState<sprintType>({
    title: "",
    startDate: "",
    endDate: "",
    projectNo: "",
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
        "The end date must be later than the start date. Please choose again."
      );
    }

    setNewSprintInfo((cur) => ({ ...cur, endDate: value }));
  };

  const cancelCreateSprint = () => {
    showSprintCreateModal();
  };

  const addNewSprint = () => {
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
    createNewSprint(newSprintInfo);

    showSprintCreateModal();
  };

  useEffect(() => {
    if (!router.isReady) return;
    setNewSprintInfo((cur) => ({
      ...cur,
      projectNo: router.query.projectCode as string,
    }));
  }, [router.asPath]);

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
            <CreateButton onClick={addNewSprint}>Create</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(null, mapDispatchToProps)(SprintCreateModal);
