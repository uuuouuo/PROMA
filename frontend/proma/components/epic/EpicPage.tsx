import * as React from 'react';
import styled from "styled-components";

const EpicPageContainer = styled.div`
    background-color: #C4C4C4;
    padding: 2%;
    width: 100%;
    height: 77vh;
    display: flex;
    flex-direction : column;
`;

const EpicBox = styled.div`
    height: 300px;
    width: 96%;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 2%;
    background-color: white;
    border : 1px solid black;
    margin-top: 1%;
`;

const EpicRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2%;
`

const EpicBox2 = styled(EpicBox)`
    width: 96%;
    margin-top: 3%;
    padding: 2%;
    display: flex;
    flex-direction: column;
`;

const EpicStory = styled.div`
    height: 20%;
    width: 98%;
    background-color: #C4C4C4;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    padding-left: 1%;
    padding-right: 1%; 
    font-weight: bold;
    border-radius: 10px 10px 10px 10px / 10px 10px 10px 10px;
`;

const EpicPage = () => {

    return (
        <>
            <EpicPageContainer>
                <a style={{fontSize: "30px", fontWeight: "bold", textDecoration: "underline"}}>예약번호</a>
                <EpicBox>
                    <EpicRow>
                        <a style={{fontSize: "20px", fontWeight: "bold", marginRight: "2%"}}>제목</a>
                        <input style={{
                            width: "80%",
                            height: "50px",
                            backgroundColor: "#C4C4C4",
                            border: "0px",
                            paddingLeft: "1%",
                            paddingRight: "1%"
                        }}></input>
                    </EpicRow>

                    <EpicRow>
                        <a style={{fontSize: "20px", fontWeight: "bold", marginRight: "2%"}}>설명</a>
                        <input style={{
                            width: "80%",
                            height: "100px",
                            backgroundColor: "#C4C4C4",
                            border: "0px",
                            paddingLeft: "1%",
                            paddingRight: "1%"
                        }}></input>
                    </EpicRow>
                </EpicBox>

                <EpicBox2>
                    <EpicStory>
                        <a>에픽 하위 스토리</a>
                    </EpicStory>
                    <EpicStory>
                        <a>에픽 하위 스토리</a>
                    </EpicStory>
                    <EpicStory>
                        <a>에픽 하위 스토리</a>
                    </EpicStory>
                </EpicBox2>
            </EpicPageContainer>
        </>
    );
};

export default EpicPage;
