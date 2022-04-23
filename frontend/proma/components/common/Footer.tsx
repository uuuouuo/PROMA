import styled from "styled-components";

interface ThemeType {
  theme: {
    bgColor: string;
    textColor: string;
    mainColor: string;
    subPurpleColor: string;
    sunBeigeColor: string;
    warnColor: string;
  };
}

//styled-components
const FooterBox = styled.div`
  height: 80px;
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
