import {combineReducers} from "redux";
import moviesReducer from "./movies";
import searchReducer from "./search";

const rootReducer = combineReducers({
  moviesReducer,
  searchReducer,
});

export default rootReducer;
