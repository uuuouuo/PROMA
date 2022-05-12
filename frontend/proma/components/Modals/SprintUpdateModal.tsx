/* eslint-disable */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
import { updateSprint } from "../../store/modules/sprint";

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSprint: (sprintObj: any) => dispatch(updateSprint(sprintObj)),
  };
};

const SprintUpdateModal = ({
  sprintUpdateModal,
  showSprintUpdateModal,
  sprintInfo,
  updateSprint,
}: {
  sprintUpdateModal: boolean;
  showSprintUpdateModal: any;
  sprintInfo: any;
  updateSprint?: any;
}) => {
  const router = useRouter();

  interface sprintType {
    title: string;
    startDate: string;
    endDate: string;
    projectNo: string;
  }

  const [newSprintInfo, setNewSprintInfo] = useState<sprintType>({
    title: sprintInfo.title,
    startDate: sprintInfo.startDate,
    endDate: sprintInfo.endDate,
    projectNo: sprintInfo.projectNo,
  });

  const onChangeSprintName = (e: any) => {
    const value = e.target.value as string;
    setNewSprintInfo((cur) => ({ ...cur, title: value }));
  };

  const onSelectStartDate = (e: any) => {
    const value = e.target.value;
    if (newSprintInfo.endDate) {
      if (new Date(newSprintInfo.endDate) <= new Date(value)) {
        alert(
          "The start date must be faster than the end date. Please choose again."
        );
        setNewSprintInfo((cur) => ({ ...cur, startDate: "" }));
        return;
      }
    }
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
      return;
    }

    setNewSprintInfo((cur) => ({ ...cur, endDate: value }));
  };

  const cancelUpdateSprint = () => showSprintUpdateModal();

  const updateSprintInfo = () => {
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

    const sprintObj = {
      sprintNo: sprintInfo.sprintNo,
      sprintInfo: newSprintInfo,
    };
    updateSprint(sprintObj);

    showSprintUpdateModal();
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
      open={sprintUpdateModal}
      onClose={showSprintUpdateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>Update Sprint</Header>
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
            <input
              type="date"
              lang="en"
              onChange={onSelectStartDate}
              value={newSprintInfo.startDate}
            />
            <p>End Date</p>
            <input
              type="date"
              lang="en"
              onChange={onSelectEndDate}
              value={newSprintInfo.endDate}
            />
          </InputArea>
          <ButtonBox>
            <CancelButton onClick={cancelUpdateSprint}>Cancel</CancelButton>
            <CreateButton onClick={updateSprintInfo}>Update</CreateButton>
          </ButtonBox>
        </BodyContainer>
      </Box>
    </ModalBox>
  );
};

export default connect(null, mapDispatchToProps)(SprintUpdateModal);
