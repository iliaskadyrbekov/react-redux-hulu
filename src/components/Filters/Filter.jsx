import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SortBy} from "./SortBy";

const Filter = () => {
  const {isSearching, totalMovies, searchMovies} = useSelector(({search}) => search);
  const {isFetchingMovies} = useSelector(({movies}) => movies);

  const openFilterPopup = () => {
    document.body.classList.add('body__model--open');
  };

  return (
    <section className="filter">
      {!isSearching &&
      <div className="filter__menu">
        <Link to="/filters" className="filter__btn-wrapper">
          <button
            className="filter__button"
            onClick={openFilterPopup}
          >Filters
          </button>
        </Link>
        <SortBy/>
      </div>
      }
      {isSearching && !isFetchingMovies && searchMovies[0] &&
      <h2 className="filter__results-count">The total number of found movies is {totalMovies}</h2>}
    </section>
  )
};

export default Filter;
