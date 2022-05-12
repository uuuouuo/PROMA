/* eslint-disable */
import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Team from "./Team";
import Link from "next/link";
import { useEffect, useState } from "react";
import Chatting from "../../chatting/Chatting";
import TeamCreateModal from "../../Modals/TeamCreateModal";
import { useRouter } from "next/router";
import { projectChat } from "../../../store/modules/chat";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: any) => {
  return {
    projectChat: (projectNo: string) => dispatch(projectChat(projectNo)),
  };
};

//styled-components
const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: ThemeType) => props.theme.elementBgColor};
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  border-radius: 3px;
  padding: 0 10px 0 15px;
  a {
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
  }
  div {
    display: flex;
    align-items: center;
  }
`;
const ChatButton = styled.button`
  border: 2px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  background-color: white;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 13px;
  padding: 2px 5px;
  margin-right: 5px;
  width: 43px;
  &:hover {
    cursor: pointer;
  }
`;
const ArrowButton = styled.button`
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  font-size: 20px;
  display: flex;
  align-items: center;
`;
const AddTeamButton = styled.button`
  background-color: inherit;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 15px;
  text-decoration: underline;
  border: none;
  margin: 20px;
  text-align: start;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;
const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px 0 10px;
  ${AddTeamButton} {
    align-self: flex-start;
    padding: 10px;
    margin: 0;
  }
`;

const Project = ({ projectInfo, projectChat }: { projectInfo: any; projectChat: any }) => {
  const router = useRouter();

  const [showTeams, setShowTeams] = useState<boolean>(false);
  const [teamCreateModal, setTeamCreateModal] = useState<boolean>(false);
  const [teams, setTeams] = useState<Array<Object>>([]);
  const showTeamCreateModal = () => setTeamCreateModal((cur) => !cur);

  // 채팅창 띄우기
  const [state, setState] = useState(false);
  const showChat = () => setState((cur) => !cur);

  useEffect(() => {
    setTeams(projectInfo.teamList);
  }, [projectInfo]);

  useEffect(() => {
    if (router.query.projectCode) {
      if (router.query.projectCode === projectInfo.projectNo)
        setShowTeams(true);
      else setShowTeams(false);
    }
  }, [router.asPath]);

  return (
    <ProjectContainer>
      <Header>
        <Link href={`/project/${projectInfo.projectNo}`}>
          <a>{projectInfo.title}</a>
        </Link>
        <div>
          <ChatButton onClick={() => {
            setState(true)
          }}>Chat</ChatButton>
          <Chatting state={state} showChat={showChat} projectNo={projectInfo.projectNo}/>
          <ArrowButton onClick={() => setShowTeams((cur) => !cur)}>
            {showTeams ? <FaAngleDown /> : <FaAngleRight />}
          </ArrowButton>
        </div>
      </Header>
      {showTeams ? (
        <TeamBox>
          {teams
            ? teams.map((team: any, index: any) => (
                <Team
                  teamInfo={team}
                  projectNo={projectInfo.projectNo}
                  currentTeam={showTeams}
                  key={index}
                />
              ))
            : null}
          <AddTeamButton onClick={showTeamCreateModal}>
            + Add Team
          </AddTeamButton>
          <TeamCreateModal
            teamCreateModal={teamCreateModal}
            projectNo={projectInfo.projectNo}
            showTeamCreateModal={showTeamCreateModal}
          />
        </TeamBox>
      ) : null}
    </ProjectContainer>
  );
};

// export default Project;
export default connect(null, mapDispatchToProps)(Project);