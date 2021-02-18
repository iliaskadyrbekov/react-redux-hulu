import {combineReducers} from "redux";
import moviesReducer from "./movies/moviesReducer";
import searchReducer from "./search/searchReducer";
import filtersReducer from "./filters/filtersReducer";
import movieInfoReducer from "./movieInfo/movieInfoReducer";

const rootReducer = combineReducers({
  moviesReducer,
  searchReducer,
  filtersReducer,
  movieInfoReducer,
});

export default rootReducer;