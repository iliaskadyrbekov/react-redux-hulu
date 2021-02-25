import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SortBy} from "./SortBy";
import {setIsOpenFilterPopup} from "../../redux/popups/popupsActionCreator";

const Filter = () => {
  const dispatch = useDispatch();
  const {isSearching, totalMovies, searchMovies} = useSelector(({search}) => search);
  const {isFetchingMovies} = useSelector(({movies}) => movies);

  const openPopup = () => {
    dispatch(setIsOpenFilterPopup(true));
    document.body.classList.add('body__model--open');
  };

  return (
    <section className="filter">
      {!isSearching &&
      <div className="filter__menu">
        <Link to="/filters" className="filter__btn-wrapper">
          <button
            className="filter__button"
            onClick={openPopup}
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
