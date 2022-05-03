import { useState } from "react";
import Box from "@mui/material/Box";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  style,
  ModalBox,
  WarningContainer,
  WarningButtonBox,
  MaintainButton,
  DeleteButton,
} from "./index";

export const WarningModal = ({
  warningCreateModal,
  showWarningListModal,
  showWarningCreateModal,
  comment,
}: {
  warningCreateModal: boolean;
  showWarningListModal: any;
  showWarningCreateModal: any;
  comment: string;
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
        <WarningContainer>
          <FaExclamationTriangle />
          <p>
            {comment.split("<br/>").map((line, index) => {
              return (
                <span key={index}>
                  {line}
                  <br />
                </span>
              );
            })}
          </p>

          <WarningButtonBox>
            <MaintainButton onClick={showWarningCreateModal}>
              아니요 유지할래요!
            </MaintainButton>
            <DeleteButton>네 삭제할게요</DeleteButton>
          </WarningButtonBox>
        </WarningContainer>
      </Box>
    </ModalBox>
  );
};
