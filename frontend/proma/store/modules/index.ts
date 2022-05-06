import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./counter";
import projectReducer from "./project";
import themeReducer from "./theme";
import userReducer from "./member";
import teamReducer from "./team";
import sprintReducer from "./sprint";
import topicReducer from "./topic";

const persistConfig = {
  key: "root",
  // localStorage에 저장
  storage,
  //  localstorage에 저장헐 reducer 배열로 넣기
  whitelist: ["themeReducer", "userReducer"],
};

export const rootReducer = combineReducers({
  counterReducer,
  projectReducer,
  themeReducer,
  userReducer,
  teamReducer,
  sprintReducer,
  topicReducer,
  // 모듈 추가시 여기에 추가
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
