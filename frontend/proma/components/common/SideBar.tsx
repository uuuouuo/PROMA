import * as React from 'react';
import styled from "styled-components";

const Side_bar = styled.div`
    margin-left: 30px; 
    margin-right: 30px; 
    height: 500px;
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
`;

const Team = styled.div`
    font-size: 30px;
`


const NavBar = () => {
    return (
        <>
        <Side_bar>
            <Title>
                <a style={{textDecoration: "underline"}}>Proma</a> <a style={{float: "right"}}>+</a>
            </Title>
            <div></div>
            
        </Side_bar>
        </>
    );
};

export default NavBar;
