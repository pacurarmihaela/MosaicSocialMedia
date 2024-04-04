import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import boardReducer from "./boardReducer";
import commentReducer from "./commentReducer";
import userInfoReducer from "./userInfoReducer";
import chatReducer from "./chatReducer";

export const reducers = combineReducers({authReducer, userInfoReducer,postReducer, boardReducer,commentReducer,chatReducer});