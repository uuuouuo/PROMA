import styled, { keyframes } from "styled-components";

interface BoxType {
  bgColor: string;
}
const Box = styled.div`
  background-color: ${(props: BoxType) => props.bgColor};
  color: white;
  width: 100px;
  height: 100px;
  font-size: 20px;
  text-align: center;
`;
const ExBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: #6667AB;
  /* background-color: #79607d; */
  margin: 30px;
`;
const Ex = styled.div`
  width: 100px;
  height: 100px;
  /* background-color: #c1c6db; */
  background-color: #f1f0ec;
  margin: 30px;
`;

const RoundedBox = styled(Box)`
  border-radius: 50px;
`;

const FlexBox = styled.div`
  display: flex;
`;
const Input = styled.input.attrs({ required: true, placeholder: "hi" })``;

const animation = keyframes`
    0% {
        transform:rotate(0);
        border-radius: 0;
    }
    50% {
        transform:rotate(360deg);
        border-radius: 50%;
    }
    100% {
        transform:rotate(0);
        border-radius: 0;
    }
`;
const P = styled.p``;
const AnimationBox = styled(Box)`
  animation: ${animation} 5s linear infinite;
  span {
    font-size: 35px;
  }
  ${P} {
    font-size: 25px;
    font-weight: 900;
  }
  &:hover {
    background-color: orange;
  }
  &:active {
    color: black;
  }
`;

interface DarkModeType {
  theme: {
    bgColor: string;
    textColor: string;
  };
}
const DarkModeBox = styled.div`
  background-color: ${(props: DarkModeType) => props.theme.bgColor};
  color: ${(props: DarkModeType) => props.theme.textColor};
  width: 100%;
`;

const Styled = () => {
  return (
    <DarkModeBox>
      <ExBox>
          <Ex>sd</Ex>
      </ExBox>
      <h1>extending & prop</h1>
      <FlexBox>
        <Box bgColor="brown">Box</Box>
        <RoundedBox bgColor="purple">Box</RoundedBox>
      </FlexBox>
      <h1>as & attr</h1>
      <FlexBox as="header">
        <Input />
        <Input />
      </FlexBox>
      <h1>animation & nesting</h1>
      <AnimationBox bgColor="green">
        <span>span</span>
        <P>p</P>
      </AnimationBox>
      <h1>theme</h1>
    </DarkModeBox>
  );
};

export default Styled;
