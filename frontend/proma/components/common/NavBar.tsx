import * as React from 'react';
import styled from "styled-components";

const Nav_bar = styled.div`
  height: 100px;
  padding-left: 30px;
  display: grid;
  grid-template-columns: 180px auto 100px 200px;
  background-color: grey;
`;

const Logo = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-align: -webkit-center;
  align-self: center;
`;

const Profileimg = styled.div`
  text-align: -webkit-center;
`;

const Profile = styled.div`
  align-self: center;
`;

const Memberfunc = styled.div`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`;

const NavBar = () => {
  return (
    <>
      <Nav_bar>
        <Logo>
          <a>PROMA</a>
        </Logo>
        <div></div>
        <Profile>
          <Profileimg>
            <img style={{width: "50%"}} src="/profileimg.png"/>
          </Profileimg>
        </Profile>
        <Memberfunc>
          <a>로그인 / 회원가입</a>
        </Memberfunc>
      </Nav_bar>
    </>
  );
};

export default NavBar;
