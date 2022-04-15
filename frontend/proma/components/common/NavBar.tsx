import * as React from 'react';
import styled from "styled-components";

const Nav_bar = styled.div`
  margin: 30px;
  padding: 40px;
  display: grid;
  grid-template-columns: 180px auto 100px 200px;
  background-color: grey;
`;

const Logo = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-align: -webkit-center;
`;

const Profileimg = styled.div`
  height: 50px;
  text-align: -webkit-center;
`;

const Profile = styled.div`
  height: 50px;
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
