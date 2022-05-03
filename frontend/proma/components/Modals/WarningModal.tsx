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
  warningModal,
  showWarningModal,
  comment,
  deleteFunc,
}: {
  warningModal: boolean;
  showWarningModal: any;
  comment: string;
  deleteFunc: any;
}) => {
  return (
    <ModalBox
      open={warningModal}
      onClose={showWarningModal}
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
            <MaintainButton onClick={showWarningModal}>
              아니요 유지할래요!
            </MaintainButton>
            <DeleteButton onClick={deleteFunc}>네 삭제할게요</DeleteButton>
          </WarningButtonBox>
        </WarningContainer>
      </Box>
    </ModalBox>
  );
};
