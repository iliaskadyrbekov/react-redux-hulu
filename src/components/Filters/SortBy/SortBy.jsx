import React, {useEffect, useRef, useState} from 'react';
import SortIcon from "@material-ui/icons/Sort";
import classNames from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {setCurrentSortBy} from "../../../redux/filters/filtersActionCreator";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../../redux/movies/moviesActionCreator";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

const SortBy = ({sortBy}) => {
  const dispatch = useDispatch();
  const [isOpenSortPopup, setIsOpenSortPopup] = useState(false);
  const sortRef = useRef();
  const currentSortBy = useSelector(({filters}) => Object.values(filters.currentSortBy)[0]);

  useEffect(() => {
    window.addEventListener('click', onCloseSortPopUp);
    return () => window.removeEventListener('click', onCloseSortPopUp);
  }, [])

  const onCloseSortPopUp = (event) => {
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
      <button className="filter__sort-button">
            <span className="filter__sort-icon-wrapper">
              <SortIcon className="filter__sort-icon"/>
            </span>
        <h3 className="filter__sort-text">
          By {currentSortBy}
        </h3>
        <span className={classNames({
          'filter__arrow-icon-wrapper': true,
          'filter__arrow-icon-wrapper--active': isOpenSortPopup,
        })}>
          <ExpandMoreIcon className="filter__arrow-icon"/>
        </span>
      </button>
      {isOpenSortPopup &&
      <div className="filter__sort-dropdown">
        <ul className="filter__sort-list">
          {listSortBy}
        </ul>
      </div>}
    </div>
  );
};

SortBy.propTypes = {
  sortBy: PropTypes.object.isRequired,
};

export default SortBy;
