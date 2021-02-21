import {combineReducers} from "redux";
import moviesReducer from "./movies/moviesReducer";
import searchReducer from "./search/searchReducer";
import filtersReducer from "./filters/filtersReducer";
import movieInfoReducer from "./movieInfo/movieInfoReducer";
import popupsReducer from "./popups/popupsReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  search: searchReducer,
  filters: filtersReducer,
  movieInfo: movieInfoReducer,
  popups: popupsReducer,
});

export default rootReducer;
