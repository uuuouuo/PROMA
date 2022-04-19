import * as React from 'react';
import styled from "styled-components";

const IssuePageContainer = styled.div`
    background-color: #C4C4C4;
    padding: 2%;
    width: 100%;
    height: 82.5vh;
    display: flex;
    flex-direction : column;
`;

const IssueBox = styled.div`
    height: 600px;
    width: 96%;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 2%;
    background-color: white;
    margin-top: 1%;
`;

const IssueRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2%;
`;

const dummy1 = [
    {
        name: "에픽을 선택하시오.",
    },
    {
        name: "네브바 / 사이트 바 제작",
    },
    {
        name: "기획",
    },
    {
        name: "회의",
    },
    {
        name: "ERD 제작",
    },
    {
        name: "발표 자료 준비",
    },
];

const dummy2 = [
    {
        name: "담당자를 선택하시오.",
    },
    {
        name: "김일환",
    },
    {
        name: "장소명",
    },
    {
        name: "장다빈",
    },
    {
        name: "서은민",
    },
];

const IssuePage = () => {
    
    return (
        <>
            <IssuePageContainer>
                <a>이슈 번호</a>
                <IssueBox>
                    {/* 제목 */}
                    <IssueRow>
                        <a style={{width: "4%", fontSize: "20px", fontWeight: "bold", marginRight: "2%"}}>제목</a>
                        <input style={{
                            width: "90%",
                            height: "50px",
                            backgroundColor: "#C4C4C4",
                            border: "0px",
                            paddingLeft: "1%",
                            paddingRight: "1%"
                        }}></input>
                    </IssueRow>

                    {/* 설명 */}
                    <IssueRow>
                        <a style={{width: "4%", fontSize: "20px", fontWeight: "bold", marginRight: "2%"}}>설명</a>
                        <input style={{
                            width: "90%",
                            height: "300px",
                            backgroundColor: "#C4C4C4",
                            border: "0px",
                            paddingLeft: "1%",
                            paddingRight: "1%"
                        }}></input>
                    </IssueRow>

                    {/* 에픽 */}
                    <IssueRow>
                        <a style={{ width: "4%", fontSize: "20px", fontWeight: "bold", marginRight: "2%" }}>에픽</a>
                        <select style={{ 
                            width: "92%",
                            height: "50px",
                            backgroundColor: "#C4C4C4",
                            border: "0px",
                            paddingLeft: "1%",
                            paddingRight: "1%",
                            fontSize: "15px"
                        }} id = "dropdown" placeholder='에픽을 선택하시오.'>
                            {
                                dummy1.map((element, idx) => {
                                    return (
                                        <option value={idx}>{element.name}</option>
                                    );
                                })
                            }
                        </select>
                    </IssueRow>

                    {/* 담당자 */}
                    <IssueRow>
                        <a style={{width: "4%", fontSize: "20px", fontWeight: "bold", marginRight: "2%"}}>담당자</a>
                        <select style={{ 
                            width: "92%",
                            height: "50px",
                            backgroundColor: "#C4C4C4",
                            border: "0px",
                            paddingLeft: "1%",
                            paddingRight: "1%",
                            fontSize: "15px"
                        }} id = "dropdown">
                            {
                                dummy2.map((element, idx) => {
                                    return (
                                        <option value={idx}>{element.name}</option>
                                    );
                                })
                            }
                        </select>
                    </IssueRow>

                </IssueBox>
            </IssuePageContainer>
        </>
    );
};

export default IssuePage;
