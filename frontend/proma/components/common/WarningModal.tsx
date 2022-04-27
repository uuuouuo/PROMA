import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
    FaRegUserCircle,
    FaPencilAlt,
    FaCheck,
    FaGithub,
    } from "react-icons/fa";
import { ThemeType } from "../../interfaces/style";
import Link from "next/link";

//styling
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    width: "inherit",
    boxShadow: 24,
    p: 4,
};

//styled components
const ModalBox = styled(Modal)`
    .MuiBox-root {
        width: fit-content;
        min-width: 300px;
        padding: 0px;
        border: 0px;
        border-radius: 3px;
        overflow: hidden;
        background-color: ${(props: ThemeType) => props.theme.bgColor};
        input,
        textarea {
        padding: 3px 10px;
        border: none;
        outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
        border-radius: 3px;
        resize: none;
        width: 100%;
        &:focus {
            outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
        }
        }
        button {
        &:hover {
            cursor: pointer;
        }
        }
    }
`;
const BodyContainer = styled.div`
    padding: 5px 5px;
    font-size: 22px;
    font-weight: 550;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
    text-align-last: center;
    p {
    color: red;
}
`;
const Mainimg = styled.img`
    width: 30%;
`;
const MainArea = styled.div`
    width: inherit;
`;
const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 15px;
`;
const Button = styled.button`
    border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    border-radius: 3px;
    padding: 3px 10px;
    font-size: 15px;
    width: 70px;
    margin-left: 10px;
`;
const MaintainButton = styled(Button)`
    color: white;
    background-color: ${(props: ThemeType) => props.theme.mainColor};
    font-size: 18px;
    width: 50%;
`;
const DeleteButton = styled(Button)`
    color: grey;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
    border: 0px solid ${(props: ThemeType) => props.theme.bgColor};
    font-size: 15px;
    width: 50%;
    margin-top: 15px;
    margin-bottom: 5px;
`;



export const WarningModal = ({
    warningCreateModal,
    showWarningListModal,
    showWarningCreateModal,
    }: {
        warningCreateModal: boolean;
        showWarningListModal: any;
        showWarningCreateModal: any;
    }) => {    
        const cancelCreateTopic = () => {
            showWarningListModal();
            showWarningCreateModal();
        };
    
        const createNewTopic = () => {
        //post new topic api
    
        showWarningCreateModal();
    };

        return (
            <ModalBox
                open={warningCreateModal}
                onClose={showWarningCreateModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <BodyContainer>
                        <Mainimg src="/img/warning-icon.png"></Mainimg>
                    <MainArea>
                        <p>
                            프로젝트 종료 시<br />
                            프로젝트 내 활동 정보가 모두 삭제되며, <br/>
                            삭제된 데이터는 복구가 불가합니다.<br/><br/>

                            정말 종료하시겠습니까?
                        </p>
                    </MainArea>
                        <ButtonBox>
                            <MaintainButton>아니요 유지할래요!</MaintainButton>
                            <DeleteButton>네 삭제할게요</DeleteButton>
                    </ButtonBox>
                    </BodyContainer>
                </Box>
            </ModalBox>
        );
};

