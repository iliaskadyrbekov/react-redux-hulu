import React, {useState} from "react";
import {YearsTab} from "./Tabs/YearsTab";
import {GenresTab} from "./Tabs/GenresTab";
import {setCheckedGenres, setIsFiltering, setIsOpenFilterPopup} from "../../redux/actions/filterActionCreator";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/actions/moviesActionCreator";
import CloseIcon from '@material-ui/icons/Close';

const FilterPopup = () => {
  const dispatch = useDispatch();
  const checkedFilters = useSelector(({filterReducer}) => filterReducer.checkedFilters);
  const [activeTab, setActiveTab] = useState(0);
  const [copyCheckedGenres, setCopyChekedGenres] = useState(checkedFilters.checkedGenres);
  const [copyCheckedYears, setCopyChekedYears] = useState(checkedFilters.checkedYears);

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
        return <GenresTab
          copyCheckedGenres={copyCheckedGenres}
          setCheckboxStatus={setCheckboxStatus}
        />
    }
  };

  const changeActiveTab = (index) => {
    setActiveTab(index);
  };

  const discardFilters = () => {
    setCopyChekedGenres([]);
  };

  const setCheckboxStatus = (id, tabName) => {
    switch (tabName) {
      case 'genres':
        if (!copyCheckedGenres.includes(id)) {
          setCopyChekedGenres([...copyCheckedGenres, id]);
        } else {
          const restCheckedGenres = copyCheckedGenres.filter(itemId => itemId !== id)
          setCopyChekedGenres(restCheckedGenres);
        }
        break;
      default:
        alert('Do not check item!');
    }
  };

  const findMoviesByFilters = () => {
    dispatch(setIsFetchingMovies(true));
    dispatch(setEmptyMovies([]));
    dispatch(setCountPage(1));
    dispatch(setIsOpenFilterPopup(false));
    dispatch(setCheckedGenres(copyCheckedGenres));
    if (checkedFilters.checkedGenres.length) {
      dispatch(setIsFiltering(true));
    } else {
      dispatch(setIsFiltering(false));
    }
    removeFilterPopupClass();
  };

  const removeFilterPopupClass = () => {
    document.body.classList.remove('body__model--open');
  };

  const closeFilterPopUp = () => {
    dispatch(setIsOpenFilterPopup(false));
    removeFilterPopupClass();
  };

  const countCheckedGenres = copyCheckedGenres.length !== 1 ?
    copyCheckedGenres.length + ' genres' :
    copyCheckedGenres.length + ' genre';

  return (
    <div className="filter-pop-up">
      <div className="filter-pop-up__container">
        <div className="filter-pop-up__header">
          <h2 className="filter-pop-up__title">Filters</h2>
          <CloseIcon
            className="filter-pop-up__close-icon"
            onClick={closeFilterPopUp}
            style={{fontSize: 30}}
          />
        </div>
        <div className="filter-pop-up__content">
          <div className="filter-pop-up__tabs">
            {tabs}
          </div>
          <div className="filter-pop-up__gutter">
          </div>
          <p className="filter-pop-up__count-checked">
            Search will be carried out by {countCheckedGenres}
          </p>
          {chooseTab()}
        </div>
        <div className="filter-pop-up__footer">
          <div className="filter-pop-up__buttons-wrapper">
            <button
              className={classNames({
                "filter-pop-up__button": true,
                "filter-pop-up__button--disabled": copyCheckedGenres.length === 0,
              })}
              onClick={discardFilters}>Discard filters
            </button>
            <button
              className={classNames("filter-pop-up__button")}
              onClick={findMoviesByFilters}>Search results
            </button>
          </div>
          <div className="filter-pop-up__gutter">
          </div>
        </div>
      </div>
    </div>
  )
};

export default FilterPopup;

