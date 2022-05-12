import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./counter";
import projectReducer from "./project";
import modeReducer from "./mode";
import userReducer from "./member";
import teamReducer from "./team";
import chatReducer from "./chat";
import sprintReducer from "./sprint";
import topicReducer from "./topic";
import issueReducer from "./issue";

const persistConfig = {
  key: "root",
  // localStorage에 저장
  storage,
  //  localstorage에 저장헐 reducer 배열로 넣기
  whitelist: ["themeReducer", "userReducer", "chatReducer"],
};

export const rootReducer = combineReducers({
  counterReducer,
  projectReducer,
  modeReducer,
  userReducer,
  teamReducer,
  sprintReducer,
  topicReducer,
  issueReducer,
  chatReducer,
  // 모듈 추가시 여기에 추가
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
