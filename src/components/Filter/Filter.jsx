import React, {useEffect, useRef, useState} from "react";
import {FilterSettings} from "./index";
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentSortBy} from "../../redux/actions/filter";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/actions/movies";

const Filter = () => {
  const dispatch = useDispatch();
  const [isShowFilterSettings, setIsShowFilterSettings] = useState(false);
  const [isOpenSortPopup, setIsOpenSortPopup] = useState(false);
  const sortRef = useRef();

  const currentSortBy = useSelector(({filterReducer}) => Object.values(filterReducer.currentSortBy)[0]);

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
    setIsShowFilterSettings(!isShowFilterSettings);
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
            <span className="filter__sort-text">
              By {currentSortBy}
            </span>
            <span className={classNames({
              'filter__arrow-icon-wrapper': true,
              'filter__arrow-icon-wrapper--active': isOpenSortPopup,
            })}>
              <ExpandMoreIcon style={{fontSize: 30}}/>
            </span>
          </div>
          {isOpenSortPopup && <div className="filter__sort-dropdown">
            <ul className="filter__sort-list">
              {listSortBy}
            </ul>
          </div>}
        </div>
      </div>
      {isShowFilterSettings && <FilterSettings/>}
    </section>
  )
};

export default Filter;


