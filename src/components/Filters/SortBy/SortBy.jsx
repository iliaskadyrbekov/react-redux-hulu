import React, {useEffect, useRef, useState} from 'react';
import SortIcon from "@material-ui/icons/Sort";
import classNames from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {setCurrentSortBy} from "../../../redux/filters/filtersActionCreator";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../../redux/movies/moviesActionCreator";
import {useDispatch, useSelector} from "react-redux";

const SortBy = () => {
  const dispatch = useDispatch();
  const [isOpenSortPopup, setIsOpenSortPopup] = useState(false);
  const sortRef = useRef();
  const currentSortBy = useSelector(({filters}) => Object.values(filters.currentSortBy)[0]);
  const sortBy = {
    'popularity.desc': 'Popular',
    'revenue.desc': 'Revenue',
    'vote_average.desc': 'Vote Average',
    'vote_count.desc': 'Vote Count',
    'original_title.desc': 'Title',
    'release_date.desc': 'Date',
  };

  useEffect(() => {
    window.addEventListener('click', closeSortPopUp);
    return () => window.removeEventListener('click', closeSortPopUp);
  }, [])

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
      onClick={() => onSortBy(key, value)}
    >{value}</li>
  });

  const toggleSortPopupMode = () => {
    setIsOpenSortPopup(!isOpenSortPopup);
  };

  const onSortBy = (key, value) => {
    dispatch(setCurrentSortBy({[key]: value}));
    dispatch(setEmptyMovies([]));
    dispatch(setIsFetchingMovies(true));
    dispatch(setCountPage(1));
  };

  return (
    <div className="filter__sort" onClick={toggleSortPopupMode} ref={sortRef}>
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
  );
};

export default SortBy;