import styled from "styled-components";

//styled-components
const FooterBox = styled.div`
  height: 100px;
  background-color: beige;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Footer = () => {
  return <FooterBox>footer</FooterBox>;
};

export default Footer;
