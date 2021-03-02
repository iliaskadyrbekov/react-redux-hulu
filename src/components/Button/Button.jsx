import React, {useState} from 'react';
import classNames from "classnames";
import {setCountPage, setEmptyMovies, setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";
import {setCheckedGenres, setCheckedYears, setIsFiltering} from "../../redux/filters/filtersActionCreator";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Button = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [buttonPosition, setButtonPosition] = useState(0);
  const checkedFilters = useSelector(({filters}) => filters.checkedFilters);
  const {name} = props;

  const countTotalFilters = () => {
    const {checkedGenres, checkedYears} = props.copyCheckedFilters;
    return checkedGenres.length + checkedYears.length === 0;
  };

  const discardFilters = () => {
    props.setCopyChekedFilters({checkedGenres: [], checkedYears: []});
  };

  const findMoviesByFilters = () => {
    const {checkedGenres, checkedYears} = props.copyCheckedFilters
    dispatch(setIsFetchingMovies(true));
    dispatch(setEmptyMovies([]));
    dispatch(setCountPage(1));

    dispatch(setCheckedGenres(checkedGenres));
    dispatch(setCheckedYears(checkedYears));

    if (checkedGenres.length || checkedYears.length) {
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
    switch (name) {
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
        history.push('/');
        break;
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
        <span className="back-button__text">{name}</span>
      </>
    );
  };

  const checkBackBtnName = () => {
    return name === "Back to the movie" || name === "Back to the movies";
  };

  const isChangedFilters = () => {
    const {checkedGenres, checkedYears} = checkedFilters;
    const copyCheckedFilters = props.copyCheckedFilters
    const sortCheckedGenres = checkedGenres.sort((a, b) => a - b);
    const sortCopyCheckedGenres = copyCheckedFilters.checkedGenres.sort((a, b) => a - b);
    return JSON.stringify(sortCheckedGenres) === JSON.stringify(sortCopyCheckedGenres) &&
      JSON.stringify(checkedYears) === JSON.stringify(copyCheckedFilters.checkedYears);
  };

  return (
    <>
      <button className={classNames({
        "pop-up__button": true,
        "back-button": checkBackBtnName(),
        "pop-up__button--disabled": (name === "Discard filters" && countTotalFilters()) ||
          (name === "Search results" && isChangedFilters()),
      })} onClick={buttonClickHandler}>
        {checkBackBtnName() ? getBackBtnStructure() : name}
      </button>
    </>
  );
};

export default Button;


