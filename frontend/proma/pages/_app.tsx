/* eslint-disable */
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import wrapper from "../store/configureStore";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from "styled-components";
import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import Footer from "../components/common/Footer";
import Head from "next/head";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `;

const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
};

const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
};

const Container = styled.div`
  height: 100vh;
`;

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
`;

const Button = styled.button``;

let sock = new SockJS("http://j6c103.p.ssafy.io:8081/ws-stomp");
let client = Stomp.over(sock);

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  const onToggleDarkMode = () => setDarkMode((cur) => !cur);

  useEffect(() => {
    client.connect({}, () => {
      //   client.send(
      //     "http://j6c103.p.ssafy.io:8081/notification/send?userNo=U001"
      //   );
      // client.send(`/app/chat/${(메세지받을대상)user.id}`,{},JSON.stringify(res.data));
      client.subscribe("/queue/notification/U001", (res) => {
        const messagedto = JSON.parse(res.body);
        console.log(messagedto);
        alert(messagedto.message);
      });
    });
    // return () => client.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>PROMA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          {/* <Button onClick={onToggleDarkMode}>
          {darkMode ? "dark" : "light"}
        </Button> */}
          <NavBar />
          <MainComponent>
            <SideBar />
            <Component {...pageProps} />
          </MainComponent>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
