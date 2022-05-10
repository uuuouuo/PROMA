/* eslint-disable */
import Team from "./Team";
import SprintUpdateModal from "../../components/Modals/SprintUpdateModal";

import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import { deleteSprint, updateSprintStatus } from "../../store/modules/sprint";
import { RootState } from "../../store/modules";
import { getIssueList } from "../../store/modules/issue";

//styled-components
const Title = styled.h2`
  color: black;
  font-weight: 600;
  font-size: 22px;
  margin: 0;
  margin-bottom: 10px;
  p {
    font-weight: 300;
    font-size: 15px;
    margin: 0;
    margin-top: 10px;
  }
`;
const SprintBox = styled.div`
  margin-top: 15px;
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  padding: 15px;
`;
const TeamBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  margin-top: 5px;
`;
const FlexBox = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const FilledButton = styled.button`
  font-size: 15px;
  padding: 5px 10px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: none;
  border-radius: 3px;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const OptionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: black;
  margin-top: 10px;
  ${FilledButton} {
    font-size: 12px;
    margin-left: 10px;
  }
`;
const UnfilledButton = styled.button`
  font-size: 15px;
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.mainColor};
  &:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    isInProgress: state.sprintReducer.isInProgress,
    inProgressSprintInfo: state.sprintReducer.inProgressSprintInfo,
    onlyMyIssue: state.modeReducer.onlyMyIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteSprint: (sprintInfo: any) => dispatch(deleteSprint(sprintInfo)),
    updateSprintStatus: (sprintInfo: any) =>
      dispatch(updateSprintStatus(sprintInfo)),
    getIssueList: (params: any) => dispatch(getIssueList(params)),
  };
};

const Sprint = ({
  sprint,
  deleteSprint,
  updateSprintStatus,
  isInProgress,
  sprintIndex,
  onlyMyIssue,
  getIssueList,
}: {
  sprint: any;
  deleteSprint?: any;
  updateSprintStatus?: any;
  isInProgress?: boolean;
  sprintIndex: number;
  onlyMyIssue?: boolean;
  getIssueList?: any;
}) => {
  const router = useRouter();

  const [inProgress, setInProgress] = useState<boolean>(sprint.status);
  const [teams, setTeams] = useState<Array<Object>>([]);
  const [sprintUpdateModal, setSprintUpdateModal] = useState<boolean>(false);
  const [projectNo, setProjectNo] = useState<string>("");
  const [sprintNo, setSprintNo] = useState<any>("");

  const showSprintUpdateModal = () => setSprintUpdateModal((cur) => !cur);

  const onDeleteSprint = () => {
    let deleteConfirm = confirm("Are you sure you want to delete the sprint?");
    if (deleteConfirm) {
      deleteSprint({
        sprintNo,
        projectNo,
      });
    }
  };

  const onToggleSprintStatus = () => {
    updateSprintStatus({
      sprintNo,
      projectNo,
    }).then((res: any) => {
      alert(inProgress ? "Sprint is finished" : "Sprint is started");
      setInProgress((cur) => !cur);
      getIssueList({
        projectNo,
        onlyMyIssue,
      });
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    const projectNo = router.query.projectCode as string;
    setProjectNo(projectNo);
  }, [router.asPath]);

  useEffect(() => {
    if (!sprint) return;
    setSprintNo(sprint.sprintNo);
    setTeams(sprint.teams);
  }, [sprint]);

  return (
    <SprintBox>
      <FlexBox>
        <Title>
          {sprint.title ? sprint.title : "Backlog"}
          <p>
            {sprint.startDate
              ? `From: ${sprint.startDate} | To: ${sprint.endDate}`
              : null}
          </p>
        </Title>
        <SprintUpdateModal
          sprintUpdateModal={sprintUpdateModal}
          showSprintUpdateModal={showSprintUpdateModal}
          sprintInfo={sprint}
        />
        {sprint.sprintNo !== null ? (
          !isInProgress ? (
            <FilledButton onClick={onToggleSprintStatus}>
              Start Sprint
            </FilledButton>
          ) : sprint.status ? (
            <FilledButton onClick={onToggleSprintStatus}>
              Finish Sprint
            </FilledButton>
          ) : null
        ) : null}
      </FlexBox>
      <TeamBox>
        {teams
          ? teams?.map((team, index) => (
              <Team
                team={team}
                key={index}
                sprintNo={sprintNo}
                sprintIndex={sprintIndex}
                teamIndex={index}
              />
            ))
          : null}
      </TeamBox>
      {sprint.sprintNo && !sprint.status ? (
        <OptionBox>
          <UnfilledButton onClick={showSprintUpdateModal}>Edit</UnfilledButton>
          <UnfilledButton onClick={onDeleteSprint}>Delete</UnfilledButton>
        </OptionBox>
      ) : null}
    </SprintBox>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
