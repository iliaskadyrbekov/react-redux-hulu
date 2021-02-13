import React, {useState} from "react";
import {YearsTab} from "./Tabs/YearsTab";
import {GenresTab} from "./Tabs/GenresTab";
import {
  setCheckedGenres,
  setCheckedYears,
  setIsFiltering,
  setIsOpenFilterPopup
} from "../../redux/filters/filtersActionCreator";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";
import CloseIcon from '@material-ui/icons/Close';

const FilterPopup = () => {
  const dispatch = useDispatch();
  const checkedFilters = useSelector(({filtersReducer}) => filtersReducer.checkedFilters);
  const [activeTab, setActiveTab] = useState(0);
  const [copyCheckedFilters, setCopyChekedFilters] = useState(checkedFilters);

  const tabsName = ['Genres', 'Years'];
  const tabs = tabsName.map((tab, index) => {
    return (
      <div className="filter-pop-up__tabs-item" key={tab} onClick={() => changeActiveTab(index)}>
        <h3 className={classNames({
          "filter-pop-up__tabs-item-name": true,
          "filter-pop-up__tabs-item-name--active": activeTab === index,
        })}>{tab}</h3>
        {activeTab === index && <span className="filter-pop-up__tabs-item--active"/>}
      </div>
    )
  });

  const chooseTab = () => {
    switch (activeTab) {
      case 1:
        return <YearsTab
          setCheckboxStatus={setCheckboxStatus}
          copyCheckedYears={copyCheckedFilters.checkedYears}
        />
      default:
        return <GenresTab
          copyCheckedGenres={copyCheckedFilters.checkedGenres}
          setCheckboxStatus={setCheckboxStatus}
        />
    }
  };

  const changeActiveTab = (index) => {
    setActiveTab(index);
  };

  const discardFilters = () => {
    setCopyChekedFilters({checkedGenres: [], checkedYears: []});
  };

  const setCheckboxStatus = (id, tabName) => {
    const {checkedGenres, checkedYears} = copyCheckedFilters;
    switch (tabName) {
      case 'genres':
        if (!checkedGenres.includes(id)) {
          setCopyChekedFilters({...copyCheckedFilters, checkedGenres: [...checkedGenres, id]});
        } else {
          const restCheckedGenres = checkedGenres.filter(itemId => itemId !== id)
          setCopyChekedFilters({...copyCheckedFilters, checkedGenres: restCheckedGenres});
        }
        break;
      case 'years':
        if (!checkedYears.includes(id)) {
          setCopyChekedFilters({...copyCheckedFilters, checkedYears: [id]});
        } else {
          setCopyChekedFilters({...copyCheckedFilters, checkedYears: []});
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

    dispatch(setCheckedGenres(copyCheckedFilters.checkedGenres));
    dispatch(setCheckedYears(copyCheckedFilters.checkedYears));
    if (checkedFilters.checkedGenres.length || checkedFilters.checkedYears.length) {
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

  const countCheckedGenres = () => {
    const countGenres = copyCheckedFilters.checkedGenres.length;
    return countGenres !== 1 ? countGenres + ' genres' : countGenres + ' genre';
  };

  const countCheckedYears = () => {
    const {checkedYears} = copyCheckedFilters;
    const formatStr = ', by ' + checkedYears;
    if (!checkedYears.length) return '';
    if (typeof checkedYears[0] === "string") return formatStr + ' years';
    return formatStr + ' year';
  };

  const countTotalFilters = () => {
    const {checkedGenres, checkedYears} = copyCheckedFilters;
    return checkedGenres.length + checkedYears.length === 0
  };

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
            Search will be carried out by {countCheckedGenres()} {countCheckedYears()}
          </p>
          {chooseTab()}
        </div>
        <div className="filter-pop-up__footer">
          <div className="filter-pop-up__buttons-wrapper">
            <button
              className={classNames({
                "filter-pop-up__button": true,
                "filter-pop-up__button--disabled": countTotalFilters(),
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

