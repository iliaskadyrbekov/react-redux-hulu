import {combineReducers} from "redux";
import moviesReducer from "./movies";
import searchReducer from "./search";
import filterReducer from "./filter";

const rootReducer = combineReducers({
  moviesReducer,
  searchReducer,
  filterReducer,
});

export default rootReducer;
