// import React from 'react';
import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";

const InputWrapper = styled.label`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
  &:checked + span {
    &:before {
      left: 25px;
    }
  }
`;

const Slider = styled.span`
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 25px;
  border-radius: 100px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  position: relative;
  transition: background-color 0.2s;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    border-radius: 45px;
    transition: 0.2s;
    background: ${(props: ThemeType) => props.theme.subPurpleColor};
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
  }

  &:active:before {
    width: 28px;
    background: ${(props: ThemeType) => props.theme.subPurpleColor};
  }
`;

const Toggle = ({ changeMode }: { changeMode: any }) => (
  <InputWrapper>
    <Input type="checkbox" onChange={changeMode} />
    <Slider />
  </InputWrapper>
);

export default Toggle;
