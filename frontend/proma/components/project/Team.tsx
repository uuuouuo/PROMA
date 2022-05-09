/* eslint-disable */
import Issue from "./Issue";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ThemeType } from "../../interfaces/style";
import IssueCreateModal from "../Modals/IssueCreateModal";

//styled-components
const TeamBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  padding: 0px 15px 10px 15px;
  display: flex;
  flex-direction: column;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px 0;
`;
const TeamName = styled.a`
  color: white;
  margin: 5px 0;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;
const Title = styled.span`
  color: ${(props: ThemeType) => props.theme.textColor};
  font-weight: 400;
  font-size: 22px;
`;
const AddButton = styled.button`
  background-color: inherit;
  text-decoration: underline;
  border: none;
  font-size: 13px;
  align-self: end;
  color: ${(props: ThemeType) => props.theme.textColor};
  &:hover {
    cursor: pointer;
  }
`;

const Team = ({ team, sprint }: { team: any; sprint: any }) => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  const [issueCreateModal, setIssueCreateModal] = useState<boolean>(false);
  const showIssueCreateModal = () => setIssueCreateModal((cur) => !cur);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const droppableId = `${sprint.title}_${team.teamName}`;

  return (
    <>
      {isReady ? (
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <TeamBox ref={provided.innerRef} {...provided.droppableProps}>
              <TopBar>
                <Link href={`/project/${team.projectNo}/team/${team.teamNo}`}>
                  <TeamName>
                    <Title>{team.title}</Title>
                  </TeamName>
                </Link>
                {team.isMember ? (
                  <AddButton onClick={showIssueCreateModal}>
                    + Add Issue
                  </AddButton>
                ) : null}
                <IssueCreateModal
                  issueCreateModal={issueCreateModal}
                  showIssueCreateModal={showIssueCreateModal}
                  teamNo={team.teamNo}
                  sprintNo={sprint.sprintNo}
                />
              </TopBar>
              {/* {issueData.map((issue, index) => (
                <Issue issue={issue} key={index} droppableId={droppableId} />
              ))} */}
              {provided.placeholder}
            </TeamBox>
          )}
        </Droppable>
      ) : null}
    </>
  );
};

export default Team;
