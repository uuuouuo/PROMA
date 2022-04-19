/* eslint-disable */
import type { AppProps } from "next/app";
import React, { useState } from "react";
import wrapper from "../store/configureStore";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from "styled-components";
import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import Footer from "../components/common/Footer";

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

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  const onToggleDarkMode = () => setDarkMode((cur) => !cur);

  return (
    <>
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
