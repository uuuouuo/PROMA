/* eslint-disable */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import wrapper from "../store/configureStore";
import { useSelector } from "react-redux";
import { RootState } from "../store/modules";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
