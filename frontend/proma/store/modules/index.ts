import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./counter";
import projectReducer from "./project";

const persistConfig = {
  key: "root",
  // localStorage에 저장
  storage,
  //  localstorage에 저장헐 reducer 배열로 넣기
  whitelist: ["loginReducer"],
};

export const rootReducer = combineReducers({
  counterReducer,
  projectReducer,
  // 모듈 추가시 여기에 추가
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
