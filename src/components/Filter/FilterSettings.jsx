import React, {useState} from "react";
import {YearsTab} from "./Tabs/YearsTab";
import {GenresTab} from "./Tabs/GenresTab";
import {setCheckedGenres} from "../../redux/actions/filterActionCreator";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/actions/moviesActionCreator";

const FilterSettings = () => {
  const dispatch = useDispatch();
  const checkedGenres = useSelector(({filterReducer}) => filterReducer.checkedGenres);
  const [activeTab, setActiveTab] = useState(0);

  const tabsName = ['Genres', 'Years'];
  const tabs = tabsName.map((tab, index) => {
    return (
      <div className="filter-pop-up__tabs-item" key={tab} onClick={() => changeActiveTab(index)}>
        <h3>{tab}</h3>
        {activeTab === index && <span className="filter-pop-up__tabs-item--active"/>}
      </div>
    )
  });

  const chooseTab = () => {
    switch (activeTab) {
      case 1:
        return <YearsTab/>
      default:
        return <GenresTab/>
    }
  };

  const changeActiveTab = (index) => {
    setActiveTab(index);
  };

  const discardFilters = () => {
    dispatch(setCheckedGenres([]));
    dispatch(setIsFetchingMovies(true)); //TODO
    dispatch(setEmptyMovies([])); //TODO
    dispatch(setCountPage(1)); //TODO
  };

  const findMoviesByFilters = () => {
    dispatch(setIsFetchingMovies(true)); //TODO
    dispatch(setEmptyMovies([])); //TODO
    dispatch(setCountPage(1)); //TODO
  };

  return (
    <div className="filter-pop-up">
      <div className="filter-pop-up__header">
        <div className="filter-pop-up__tabs">
          {tabs}
        </div>
        <div className="filter-pop-up__gutter">
        </div>
      </div>
      <div className="filter-pop-up__content">
        {chooseTab()}
      </div>
      <div className="filter-pop-up__footer">
        <div className="filter-pop-up__buttons-wrapper">
          <button
            className={classNames({
              "filter-pop-up__button": true,
              "filter-pop-up__button--disabled": checkedGenres.length === 0,
            })}
            onClick={discardFilters}>Discard filters
          </button>
          <button className={classNames({
            "filter-pop-up__button": true,
            "filter-pop-up__button--disabled": checkedGenres.length === 0,
          })} onClick={findMoviesByFilters}>Search results
          </button>
        </div>
        <div className="filter-pop-up__gutter">
        </div>
      </div>
    </div>
  )
};

export default FilterSettings;

