import React from "react";
import {Filters} from "../components/Filters";
import {ListMovies} from "../components/Movies";
import {ScrollToTopBtn} from "../components/ScrollToTopBtn";
import {useSelector} from "react-redux";

const Home = () => {
  const {isSearching, totalMovies, searchMovies} = useSelector(({search}) => search);
  const {isFetchingMovies} = useSelector(({movies}) => movies);

  const showTotalCountSearchMovies = () => {
    return isSearching && !isFetchingMovies && searchMovies[0] &&
      <h2 className="search__results">The total number of found movies is {totalMovies}</h2>;
  };

  return (
    <div className="container home__container">
      {!isSearching && <Filters/>}
      {showTotalCountSearchMovies()}
      <ListMovies/>
      <ScrollToTopBtn/>
    </div>
  );
};

export default Home;

