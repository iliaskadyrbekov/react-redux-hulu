import React, {useState} from "react";
import {FilterSettings} from "./index";
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Filter = () => {
  const [isShowFilterSettings, setIsShowFilterSettings] = useState(false);
  const [isOpenSortPopup, setIsOpenSortPopup] = useState(false);

  const changeFilterSettingsMode = () => {
    setIsShowFilterSettings(!isShowFilterSettings);
  };

  const changeSortPopupMode = () => {
    setIsOpenSortPopup(!isOpenSortPopup);
  };

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
        <div className="filter__sort" onClick={changeSortPopupMode}>
          <span className="filter__sort-icon-wrapper">
            <SortIcon style={{ fontSize: 26 }}/>
          </span>
          <span className="filter__sort-text">
            By IMDB rating
          </span>
          <span className="filter__arrow-icon-wrapper">
            <ExpandMoreIcon style={{ fontSize: 29 }}/>
          </span>
        </div>
      </div>
      {isShowFilterSettings && <FilterSettings/>}
    </section>
  )
};

export default Filter;


