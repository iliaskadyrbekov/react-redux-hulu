import {combineReducers} from "redux";
import moviesReducer from "./movies/moviesReducer";
import searchReducer from "./search/searchReducer";
import filtersReducer from "./filters/filtersReducer";

const rootReducer = combineReducers({
  moviesReducer,
  searchReducer,
  filterReducer: filtersReducer,
});

export default rootReducer;