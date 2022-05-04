//스프린트 컴포넌트
import Team from "./Team";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThemeType } from "../../interfaces/style";

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
  &:hover {
    cursor: pointer;
  }
  padding: 5px 10px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: none;
  border-radius: 3px;
`;

const Sprint = ({ sprint, teamList }: { sprint: any; teamList: any }) => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!teamList) return;

    setTeams(teamList);
  }, [teamList]);

  return (
    <SprintBox>
      <FlexBox>
        <Title>{sprint.title}</Title>
        <FilledButton onClick={() => setInProgress((cur) => !cur)}>
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
    </SprintBox>
  );
};

export default Sprint;
