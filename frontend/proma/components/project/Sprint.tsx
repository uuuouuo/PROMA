//스프린트 컴포넌트
import Team from "./Team";
import SprintUpdateModal from "../../components/Modals/SprintUpdateModal";

import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import { deleteSprint, updateSprintStatus } from "../../store/modules/sprint";

//styled-components
const Title = styled.h2`
  color: black;
  font-weight: 600;
  font-size: 22px;
  margin: 0;
  margin-bottom: 10px;
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
  align-items: center;
`;
const FilledButton = styled.button`
  font-size: 15px;
  padding: 5px 10px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: none;
  border-radius: 3px;
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSprintStatus: (sprintInfo: any) =>
      dispatch(updateSprintStatus(sprintInfo)),
    deleteSprint: (sprintInfo: any) => dispatch(deleteSprint(sprintInfo)),
  };
};

const Sprint = ({
  sprint,
  teamList,
  deleteSprint,
  updateSprintStatus,
}: {
  sprint: any;
  teamList: any;
  deleteSprint?: any;
  updateSprintStatus?: any;
}) => {
  const router = useRouter();

  const [inProgress, setInProgress] = useState<boolean>(sprint.status);
  const [teams, setTeams] = useState<Array<Object>>([]);
  const [sprintUpdateModal, setSprintUpdateModal] = useState<boolean>(false);
  const [projectNo, setProjectNo] = useState<string>("");

  const showSprintUpdateModal = () => setSprintUpdateModal((cur) => !cur);

  const onDeleteSprint = () => {
    let deleteConfirm = confirm("Are you sure you want to delete the sprint?");
    if (deleteConfirm) {
      deleteSprint({
        sprintNo: sprint.sprintNo,
        projectNo,
      });
    }
  };

  const onToggleSprintStatus = () => {
    updateSprintStatus({
      sprintNo: sprint.sprintNo,
      projectNo,
    }).then((res: any) => {
      alert(inProgress ? "Sprint is finished" : "Sprint is started");
      setInProgress((cur) => !cur);
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    setProjectNo(router.query.projectCode as string);
  }, [router.asPath]);

  useEffect(() => {
    if (!teamList) return;

    setTeams(teamList);
  }, [teamList]);

  return (
    <SprintBox>
      <FlexBox>
        <Title>{sprint.title}</Title>
        <SprintUpdateModal
          sprintUpdateModal={sprintUpdateModal}
          showSprintUpdateModal={showSprintUpdateModal}
          sprintInfo={sprint}
        />
        <FilledButton onClick={onToggleSprintStatus}>
          {inProgress ? "Finish Sprint" : "Start Sprint"}
        </FilledButton>
      </FlexBox>
      <TeamBox>
        {teams
          ? teams?.map((team, index) => (
              <Team team={team} key={index} sprintName={sprint.title} />
            ))
          : null}
      </TeamBox>
      {sprint.sprintNo ? (
        <OptionBox>
          <FilledButton onClick={showSprintUpdateModal}>
            Update Sprint
          </FilledButton>
          <FilledButton onClick={onDeleteSprint}>Delete Sprint</FilledButton>
        </OptionBox>
      ) : null}
    </SprintBox>
  );
};

export default connect(null, mapDispatchToProps)(Sprint);
