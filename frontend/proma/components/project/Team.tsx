/* eslint-disable */
import Issue from "./Issue";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ThemeType } from "../../interfaces/style";
import IssueCreateModal from "../Modals/IssueCreateModal";
import { updateIssueSprint, setMovedIssue } from "../../store/modules/issue";
import { connect } from "react-redux";
import { RootState } from "../../store/modules";
import { useRouter } from "next/router";

//styled-components
interface IAreaProps extends ThemeType {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const TeamBox = styled.div<IAreaProps>`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  padding: 0px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: ${(props) =>
    props.isDraggingOver
      ? `5px solid ${props.theme.mainColor}`
      : props.isDraggingFromThis
      ? `5px solid ${props.theme.mainColor}`
      : "none"};
  transition: border 0.3s ease-out;
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

const mapStateToProps = (state: RootState) => {
  return {
    onlyMyIssue: state.modeReducer.onlyMyIssue,
    dndMoved: state.issueReducer.dndMoved,
    movedIssue: state.issueReducer.movedIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMovedIssue: (issueInfo: any) => dispatch(setMovedIssue(issueInfo)),
    updateIssueSprint: (issueInfo: any) =>
      dispatch(updateIssueSprint(issueInfo)),
  };
};

const Team = ({
  team,
  sprintNo,
  onlyMyIssue,
  dndMoved,
  updateIssueSprint,
  setMovedIssue,
  movedIssue,
  sprintIndex,
  teamIndex,
}: {
  team: any;
  sprintNo: any;
  onlyMyIssue: boolean;
  dndMoved?: any;
  updateIssueSprint?: any;
  setMovedIssue?: any;
  movedIssue?: any;
  sprintIndex: number;
  teamIndex: number;
}) => {
  const router = useRouter();
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  const [issueCreateModal, setIssueCreateModal] = useState<boolean>(false);
  const showIssueCreateModal = () => setIssueCreateModal((cur) => !cur);
  const [issueList, setIssueList] = useState<any>([]);
  const [projectNo, setProjectNo] = useState<string>("");

  const getIssues = () => {
    let params = {};
    if (sprintNo === null) {
      params = {
        teamNo: team.teamNo,
        onlyMyIssue,
      };
    } else {
      params = {
        teamNo: team.teamNo,
        sprintNo: sprintNo,
        onlyMyIssue,
      };
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    setIsReady(true);
    const projectCode = router.query.projectCode as string;
    setProjectNo(projectCode);
  }, [router.asPath]);

  useEffect(() => {
    if (!team) return;
    setIssueList(team.issues);
  }, [team]);

  return (
    <>
      {isReady ? (
        <Droppable droppableId={`${sprintIndex}_${teamIndex}_${sprintNo}`}>
          {(provided, snapshot) => (
            <TeamBox
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TopBar>
                <Link href={`/project/${projectNo}/team/${team.teamNo}`}>
                  <TeamName>
                    <Title>{team.title}</Title>
                  </TeamName>
                </Link>
                {/* 밑에 조건 isMember 생기면 바꾸기 */}
                {!team.isMember ? (
                  <AddButton onClick={showIssueCreateModal}>
                    + Add Issue
                  </AddButton>
                ) : null}
                <IssueCreateModal
                  issueCreateModal={issueCreateModal}
                  showIssueCreateModal={showIssueCreateModal}
                  getIssues={getIssues}
                  teamNo={team.teamNo}
                  sprintNo={sprintNo}
                />
              </TopBar>
              {issueList && issueList.length > 0 ? (
                issueList.map((issue: any, index: number) => (
                  <Issue
                    issue={issue}
                    issueIndex={index}
                    key={index}
                    droppableId={`${sprintIndex}_${teamIndex}`}
                  />
                ))
              ) : (
                <p>No issues yet.</p>
              )}
              {provided.placeholder}
            </TeamBox>
          )}
        </Droppable>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
