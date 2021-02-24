import React from 'react';
import classNames from "classnames";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";
import {setCheckedGenres, setCheckedYears, setIsOpenFilterPopup} from "../../redux/popups/popupsActionCreator";
import {setIsFiltering} from "../../redux/filters/filtersActionCreator";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

const Button = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const checkedFilters = useSelector(({popups}) => popups.checkedFilters);

  const countTotalFilters = () => {
    const {checkedGenres, checkedYears} = props.copyCheckedFilters;
    return checkedGenres.length + checkedYears.length === 0
  };

  const discardFilters = () => {
    props.setCopyChekedFilters({checkedGenres: [], checkedYears: []});
  };

  const findMoviesByFilters = () => {
    dispatch(setIsFetchingMovies(true));
    dispatch(setEmptyMovies([]));
    dispatch(setCountPage(1));

    dispatch(setCheckedGenres(props.copyCheckedFilters.checkedGenres));
    dispatch(setCheckedYears(props.copyCheckedFilters.checkedYears));
    if (checkedFilters.checkedGenres.length || checkedFilters.checkedYears.length) {
      dispatch(setIsFiltering(true));
    } else {
      dispatch(setIsFiltering(false));
    }
    history.push("/");
    dispatch(setIsOpenFilterPopup(false));
    document.body.classList.remove('body__model--open');
  };

  const showAllCast = () => {
    props.setIsShowAllActors(!props.isShowAllActors);
  };

  const buttonClickHandler = () => {
    switch (props.name) {
      case "Discard filters":
        discardFilters();
        break;
      case "Search results":
        findMoviesByFilters();
        break;
      case "Hide actors":
      case "Show actors":
        showAllCast();
        break;
      default:
        alert("Try to choose again");
    }
  };

  return (
    <>
      <button className={classNames({
        "pop-up__button": true,
        "pop-up__button--disabled": props.name === "Discard filters" && countTotalFilters(),
      })} onClick={buttonClickHandler}>{props.name}</button>
    </>
  );
};

export default Button;
