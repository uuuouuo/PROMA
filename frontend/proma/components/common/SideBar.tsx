import * as React from 'react';
import styled from "styled-components";

const Side_bar = styled.div`
    margin-left: 30px; 
    margin-right: 30px; 
    margin-bottom: 30px;
    height: 73vh;
    padding: 30px;
    background-color: grey;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight:
    width: 90%;
    background: white;
    padding-left: 5%;
    padding-right: 5%;
    border-bottom: 3px solid black;
`;

const Team = styled.div`
    font-size: 30px;
    margin-left: 30px; 
    margin-right: 30px; 
`

const AddTeam = styled.div`
    font-size: 30px;
    margin-left: 30px; 
    margin-right: 30px; 
    position: fixed; 
    bottom: 60px;
    width: 100%;
`


const NavBar = () => {
    return (
        <>
            <Side_bar>
                <Title>
                    <a>Proma</a> <a style={{float: "right"}}>+</a>
                </Title>
                <Team>
                    <p style={{textDecoration: "underline", fontSize: "25px"}}>FrontEnd</p>
                    <p style={{textDecoration: "underline", fontSize: "25px"}}>BackEnd</p>
                    <p style={{textDecoration: "underline", fontSize: "25px"}}>DB</p>
                    <p style={{textDecoration: "underline", fontSize: "25px"}}>Deploy</p>
                </Team>
                <AddTeam>
                    <a style={{textDecoration: "underline", fontSize: "20px"}}>+ create new Team</a>
                </AddTeam>
            </Side_bar>
        </>
    );
};

export default NavBar;
