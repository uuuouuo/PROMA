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

//styled components
const ModalBox = styled(Modal)`
  .MuiBox-root {
    padding: 0px;
    border: 0px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
  }
`;
const Header = styled.div`
  height: 50px;
  padding: 3px 20px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;
const ModalBody = styled.div``;

//styling
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalContainer = ({
  title,
  bodyContents,
}: {
  title: string;
  bodyContents: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((cur) => !cur);

  return (
    <>
      {/* <ModalBox
        open={showModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header>{title}</Header>
        </Box>
        <ModalBody>{bodyContents}</ModalBody>
      </ModalBox> */}
    </>
  );
};

export default ModalContainer;
