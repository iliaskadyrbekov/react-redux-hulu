import React, {useState} from 'react';
import classNames from "classnames";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";
import {setCheckedGenres, setCheckedYears} from "../../redux/popups/popupsActionCreator";
import {setIsFiltering} from "../../redux/filters/filtersActionCreator";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Button = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const checkedFilters = useSelector(({popups}) => popups.checkedFilters);
  const [buttonPosition, setButtonPosition] = useState(0);

  const countTotalFilters = () => {
    const {checkedGenres, checkedYears} = props.copyCheckedFilters;
    return checkedGenres.length + checkedYears.length === 0;
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
    backToPrevPage();
    document.body.classList.remove('body__model--open');
  };

  const showAllCast = () => {
    setButtonPosition(window.scrollY);
    props.setIsShowAllActors(true);
  };

  const hideCast = () => {
    window.scrollTo({
      top: buttonPosition,
    });
    props.setIsShowAllActors(false);
  };

  const backToPrevPage = () => {
    history.goBack();
  };

  const buttonClickHandler = () => {
    switch (props.name) {
      case "Discard filters":
        discardFilters();
        break;
      case "Search results":
        findMoviesByFilters();
        break;
      case "Show actors":
        showAllCast();
        break;
      case "Hide actors":
        hideCast();
        break;
      case "Back to the movies":
      case "Back to the movie":
        backToPrevPage();
        break;
      default:
        alert("Try to choose again");
    }
  };

  const getBackBtnStructure = () => {
    return (
      <>
        <ArrowBackIosIcon className="back-button__icon"/>
        <span className="back-button__text">{props.name}</span>
      </>
    );
  };

  const checkBackBtnName = () => {
    return props.name === "Back to the movie" || props.name === "Back to the movies";
  };

  return (
    <>
      <button className={classNames({
        "pop-up__button": true,
        "back-button": checkBackBtnName(),
        "pop-up__button--disabled": props.name === "Discard filters" && countTotalFilters(),
      })} onClick={buttonClickHandler}>
        {checkBackBtnName() ? getBackBtnStructure() : props.name}
      </button>
    </>
  );
};

export default Button;


