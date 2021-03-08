import React, {useEffect, useState} from "react";
import {YearsTab} from "../Filters/Tabs/YearsTab";
import {GenresTab} from "../Filters/Tabs/GenresTab";
import {useSelector} from "react-redux";
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import {useHistory} from "react-router";
import {Button} from "../Button";

const years = [
  2021, 2020, 2019, 2018, 2017, 2016,
  2015, 2014, 2013, 2012, 2011, 2010,
  '2000-2010', '1990-2000', '1980-1990',
  '1970-1980', '1960-1970', '1950-1960', 'before 1950',
];

const FilterPopup = () => {
  const history = useHistory();
  const checkedFilters = useSelector(({filters}) => filters.checkedFilters);
  const [activeTab, setActiveTab] = useState(0);
  const [copyCheckedFilters, setCopyChekedFilters] = useState(checkedFilters);

  useEffect(() => {
    document.body.classList.add('body__model--open');
    return () => {
      document.body.classList.remove('body__model--open');
    };
  }, []);

  useEffect(() => {
    document.title = 'Filters';
  }, []);

  const tabsName = ['Genres', 'Years'];
  const tabs = tabsName.map((tab, index) => {
    return (
      <button className="filter-pop-up__tabs-item" key={tab} onClick={() => changeActiveTab(index)}>
        <h3 className={classNames({
          "filter-pop-up__tabs-item-name": true,
          "filter-pop-up__tabs-item-name--active": activeTab === index,
        })}>{tab}</h3>
        {activeTab === index && <span className="filter-pop-up__tabs-item--active"/>}
      </button>
    )
  });

  const chooseTab = () => {
    switch (activeTab) {
      case 1:
        return <YearsTab
          setCheckboxStatus={setCheckboxStatus}
          copyCheckedYears={copyCheckedFilters.checkedYears}
          years={years}
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

  const onCloseFilterPopUp = () => {
    history.goBack();
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

  const popUpSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="pop-up filter-pop-up">
      <div className="pop-up__container container filter-pop-up__container">
        <div className="filter-pop-up__header">
          <h2 className="filter-pop-up__title">Filters</h2>
          <button className="filter-pop-up__close-btn">
            <CloseIcon
              className="filter-pop-up__close-icon"
              onClick={onCloseFilterPopUp}
              style={{fontSize: 30}}
            />
          </button>
        </div>
        <form className="filter-pop-up__form" onSubmit={popUpSubmitHandler}>
          <div className="filter-pop-up__content">
            <div className="filter-pop-up__tabs">
              {tabs}
            </div>
            <div className="pop-up__gutter">
            </div>
            <p className="filter-pop-up__count-checked">
              Search will be carried out by {countCheckedGenres()} {countCheckedYears()}
            </p>
            {chooseTab()}
          </div>
          <div className="filter-pop-up__footer">
            <div className="pop-up__button-wrapper pop-up__button-wrapper--filter">
              <Button name="Discard filters"
                      copyCheckedFilters={copyCheckedFilters}
                      setCopyChekedFilters={setCopyChekedFilters}
              />
              <Button name="Search results"
                      copyCheckedFilters={copyCheckedFilters}
                      setCopyChekedFilters={setCopyChekedFilters}
              />
            </div>
            <div className="pop-up__gutter">
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default FilterPopup;

