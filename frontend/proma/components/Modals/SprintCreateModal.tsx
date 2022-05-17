/* eslint-disable */
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
import { getIssueList } from "../../store/modules/issue";
import { useRouter } from "next/router";
import { RootState } from "../../store/modules";

const mapStateToProps = (state: RootState) => {
  return {
    onlyMyIssue: state.modeReducer.onlyMyIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewSprint: (newSprintInfo: any) =>
      dispatch(createNewSprint(newSprintInfo)),
    getIssueList: (params: any) => dispatch(getIssueList(params)),
  };
};

const SprintCreateModal = ({
  sprintCreateModal,
  showSprintCreateModal,
  createNewSprint,
  onlyMyIssue,
  getIssueList,
}: {
  sprintCreateModal: boolean;
  showSprintCreateModal: any;
  createNewSprint?: any;
  onlyMyIssue?: boolean;
  getIssueList?: any;
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
  const [projectNo, setProjectNo] = useState<string>("");

  const onChangeSprintName = (e: any) => {
    const value = e.target.value as string;
    setNewSprintInfo((cur) => ({ ...cur, title: value }));
  };

  const onSelectStartDate = (e: any) => {
    const value = e.target.value;
    if (newSprintInfo.endDate) {
      if (new Date(newSprintInfo.endDate) <= new Date(value)) {
        alert("시작일은 마감일보다 빨라야합니다. 다시 선택해주세요.");
        e.target.value = "";
        return;
      }
    }
    setNewSprintInfo((cur) => ({ ...cur, startDate: value }));
  };

  const onSelectEndDate = (e: any) => {
    const value = e.target.value as string;
    if (!newSprintInfo.startDate) {
      alert("시작일을 먼저 선택해주세요.");
      e.target.value = "";
      return;
    }

    if (new Date(newSprintInfo.startDate) >= new Date(value)) {
      e.target.value = "";
      alert("마감일은 시작일보다 빠를 수 없습니다. 다시 선택해주세요.");
    }

    setNewSprintInfo((cur) => ({ ...cur, endDate: value }));
  };

  const cancelCreateSprint = () => showSprintCreateModal();

  const addNewSprint = () => {
    if (!newSprintInfo.title) {
      alert("스프린트 제목을 작성해주세요.");
      return;
    }
    if (!newSprintInfo.startDate) {
      alert("시작일을 선택해주세요.");
      return;
    }
    if (!newSprintInfo.endDate) {
      alert("마감일을 선택해주세요.");
      return;
    }

    //post new sprint api
    createNewSprint(newSprintInfo).then((res: any) => {
      window.location.reload();
      getIssueList({ projectNo, onlyMyIssue });
    });
    showSprintCreateModal();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    setNewSprintInfo((cur) => ({
      ...cur,
      projectNo: projectCode,
    }));
    setProjectNo(projectCode);
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

export default connect(mapStateToProps, mapDispatchToProps)(SprintCreateModal);
