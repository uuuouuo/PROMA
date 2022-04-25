import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import Image from "next/image";

//styled-components
const MemberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  font-size: 18px;
  padding: 0 10px;
  margin-bottom: 5px;
  div {
    display: flex;
    align-items: center;
  }
`;

const ImageBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
`;

const ChatButton = styled.button`
  border: 2px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.elementBgColor};
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  font-size: 10px;
  padding: 2px 5px;
  margin-right: 5px;
  width: 35px;
  &:hover {
    cursor: pointer;
  }
`;

const Member = ({ memberName }: { memberName: string }) => {
  return (
    <MemberContainer>
      <div>
        <ImageBox>
          <Image src="/profileimg.png" width={25} height={25}></Image>
        </ImageBox>
        <span>{memberName}</span>
      </div>
      <ChatButton>Chat</ChatButton>
    </MemberContainer>
  );
};

export default Member;
