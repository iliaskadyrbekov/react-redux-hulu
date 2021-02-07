import {combineReducers} from "redux";
import moviesReducer from "./moviesReducer";
import searchReducer from "./searchReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  moviesReducer,
  searchReducer,
  filterReducer,
});

export default rootReducer;
