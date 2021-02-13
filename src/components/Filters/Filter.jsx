import React, {useEffect, useRef, useState} from "react";
import {FilterPopup} from "./index";
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentSortBy, setIsOpenFilterPopup} from "../../redux/filters/filtersActionCreator";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";

const Filter = () => {
  const dispatch = useDispatch();
  const [isOpenSortPopup, setIsOpenSortPopup] = useState(false);
  const sortRef = useRef();

  const currentSortBy = useSelector(({filtersReducer}) => Object.values(filtersReducer.currentSortBy)[0]);
  const isOpenFilterPopup = useSelector(({filtersReducer}) => filtersReducer.isOpenFilterPopup);
  const {isSearching, totalMovies, searchMovies} = useSelector(({searchReducer}) => searchReducer);
  const {isFetchingMovies} = useSelector(({moviesReducer}) => moviesReducer);

  useEffect(() => {
    window.addEventListener('click', closeSortPopUp);
    return () => window.removeEventListener('click', closeSortPopUp);
  }, [])

  const sortBy = {
    'popularity.desc': 'Popular',
    'revenue.desc': 'Revenue',
    'vote_average.desc': 'Vote Average',
    'vote_count.desc': 'Vote Count',
    'original_title.desc': 'Title',
    'release_date.desc': 'Date',
  };

  const changeFilterSettingsMode = () => {
    window.scrollTo(0, 0);
    dispatch(setIsOpenFilterPopup(true));
    document.body.classList.add('body__model--open');
  };

  const changeSortPopupMode = () => {
    setIsOpenSortPopup(!isOpenSortPopup);
  };

  const changeSortBy = (key, value) => {
    dispatch(setCurrentSortBy({[key]: value}));
    dispatch(setEmptyMovies([]));
    dispatch(setIsFetchingMovies(true));
    dispatch(setCountPage(1));
  };

  const closeSortPopUp = (event) => {
    if (!event.path.includes(sortRef.current)) {
      setIsOpenSortPopup(false);
    }
  };

  const listSortBy = Object.entries(sortBy).map(sortValue => {
    const [key, value] = sortValue;
    return <li
      className={classNames({
        "filter__sort-dropdown-item": true,
        "filter__sort-dropdown-item--active": value === currentSortBy,
      })}
      key={key}
      onClick={() => changeSortBy(key, value)}
    >{value}</li>
  });

  return (
    <section className="filter">
      {!isSearching &&
      <div className="filter__menu">
        <div className="filter__btn-wrapper">
          <button
            className="filter__button"
            onClick={changeFilterSettingsMode}
          >Filters
          </button>
        </div>
        <div className="filter__sort" onClick={changeSortPopupMode} ref={sortRef}>
          <div className="filter__sort-button">
            <span className="filter__sort-icon-wrapper">
              <SortIcon style={{fontSize: 28}}/>
            </span>
            <h3 className="filter__sort-text">
              By {currentSortBy}
            </h3>
            <span className={classNames({
              'filter__arrow-icon-wrapper': true,
              'filter__arrow-icon-wrapper--active': isOpenSortPopup,
            })}>
              <ExpandMoreIcon style={{fontSize: 30}}/>
            </span>
          </div>
          {isOpenSortPopup &&
          <div className="filter__sort-dropdown">
            <ul className="filter__sort-list">
              {listSortBy}
            </ul>
          </div>}
        </div>
      </div>
      }
      {isSearching && !isFetchingMovies && searchMovies[0] &&
      <h2 className="filter__results-count">The total number of found movies is {totalMovies}</h2>}

      {isOpenFilterPopup && <FilterPopup/>}
    </section>
  )
};

export default Filter;
