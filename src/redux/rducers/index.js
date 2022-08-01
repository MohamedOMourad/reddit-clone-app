import { combineReducers } from "redux";
import postsReducer from "./post.reducer";
import UsersReducer from "./users.reducer";

export const reducers = combineReducers({ postsReducer, UsersReducer });