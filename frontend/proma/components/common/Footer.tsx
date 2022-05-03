import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";

//styled-components
const FooterBox = styled.div`
  height: 60px;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
`;

const Footer = () => {
  return (
    <FooterBox>
      <p>
        Copyright ⓒ2022 PROMA. All rights reserved.
        <br />
        Contact: PROMA@ssafy.com
      </p>
    </FooterBox>
  );
};

export default Footer;
