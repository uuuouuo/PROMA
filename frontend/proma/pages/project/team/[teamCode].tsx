import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TeamSpace = () => {
  const router = useRouter();
  //   const [isUpdated, setIsUpdated] = useState([]);
  //   const [teamName, setTeamName] = useState(team.teamName);
  //   const onChangeTeamName = (e: any) => {
  //     setTeamName(e.target.value);
  //   };

  useEffect(() => {
    console.log(router);
  }, [router.isReady]);

  return (
    <>
      <div>Team Space</div>
    </>
  );
};

export default TeamSpace;
