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
import SideBar from "../components/common/SideBar/SideBar";
import Footer from "../components/common/Footer";
import Head from "next/head";
import { connect } from "react-redux";
import { RootState } from "../store/modules";
import ErrorPage from "./404";
import ErrorBoundary from "../ErrorBoundary";
import { getNotificationList } from "../store/modules/notify";

const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Akshar', sans-serif;
      }
    `;

const darkTheme: DefaultTheme = {
  bgColor: "#3e3f42",
  textColor: "#ffffff",
  mainColor: "#6667AB",
  subPurpleColor: "#c1c6db",
  subBeigeColor: "#F1F0EC",
  warnColor: "#D0B9C7",
  elementBgColor: "#6667AB",
  elementTextColor: "#ffffff",
};

const lightTheme: DefaultTheme = {
  bgColor: "#ffffff",
  textColor: "black",
  mainColor: "#6667AB",
  subPurpleColor: "#c1c6db",
  subBeigeColor: "#F1F0EC",
  warnColor: "#D0B9C7",
  elementBgColor: "#ffffff",
  elementTextColor: "#6667AB",
};

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 92%;
`;

const mapStateToProps = (state: RootState) => {
  return {
    darkModeState: state.modeReducer.darkMode,
    isLogin: state.userReducer.isLogin,
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getNotificationList: () => dispatch(getNotificationList()),
  };
};

function MyApp({
  Component,
  pageProps,
  isLogin,
  userInfo,
  darkModeState,
  getNotificationList,
}: AppProps & {
  darkModeState: boolean;
  isLogin: boolean;
  userInfo: any;
  getNotificationList: any;
}) {
  return (
    <>
      <Head>
        <title>PROMA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={darkModeState ? darkTheme : lightTheme}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Container>
            <NavBar />
            <MainComponent>
              <SideBar />
              <Component {...pageProps} />
            </MainComponent>
            <Footer />
          </Container>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
