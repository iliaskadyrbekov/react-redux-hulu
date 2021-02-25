import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useHistory} from "react-router";
import {setIsOpenCrewPopup} from "../../../redux/popups/popupsActionCreator";
import {CrewItem} from "../../MovieInfo/Crew/CrewItem";
import defaultMovieImage from "../../../assets/img/defaultMovieImage.png";
import {Button} from "../../Button";
import {CrewByDepartment} from "./index";
import {ScrollToTopBtn} from "../../ScrollToTopBtn";
import {Loader} from "../../Loader";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const CrewPopup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    movieInfo: {title, backdrop_path, poster_path, runtime, production_countries, release_date, genres},
    movieCast: {cast}
  } = useSelector(({movieInfo}) => movieInfo)
  const [isShowAllCastButton, setIsShowAllCastButton] = useState(false);
  const [isShowAllActors, setIsShowAllActors] = useState(false);
  const [mainActors, setMainActors] = useState([]);
  const [isFetchingCrew, setIsFetchingCrew] = useState(true);

  const MAX_SHOWING_PERSONS = 9;
  const imageName = backdrop_path || poster_path;
  const imagePath = imageName ? `https://image.tmdb.org/t/p/w500/${imageName}` : defaultMovieImage;

  const closeCrewPopup = () => {
    dispatch(setIsOpenCrewPopup(false));
    history.goBack();
  };

  useEffect(() => {
    if (!cast) {
      return;
    } else {
      setIsFetchingCrew(false);
    }
    if (cast.length > MAX_SHOWING_PERSONS) {
      setIsShowAllCastButton(true);
    }
    setMainActors(cast.slice(0, MAX_SHOWING_PERSONS));
  }, [cast]);

  const castFormat = (actors) => {
    return actors && actors.map((person) => {
      const {id, name, profile_path} = person;
      return <CrewItem key={id} name={name} path={profile_path}/>;
    });
  };

  const showCrewByDepartments = () => {
    const titles = ["Directing", "Production", "Sound", "Writing", "Editing", "Art", "Visual Effects"];
    return titles.map((title) => {
      return <CrewByDepartment title={title} castFormat={castFormat} key={title}/>;
    });
  };

  const cardMainText = () => {
    return `${production_countries[0].name}, ${release_date.slice(0, 4)}, ${genres[0].name}`;
  };

  return (
    <section className="pop-up">
      <div className="pop-up__container">
        <div className="crew-pop-up__header">
          <button className="crew-pop-up__back-btn" onClick={closeCrewPopup}>
            <ArrowBackIosIcon className="crew-pop-up__back-btn-icon"/>
            <span className="crew-pop-up__back-btn-text">Back to the movie</span>
          </button>
        </div>
        {isFetchingCrew && <Loader/>}
        {!isFetchingCrew &&
        <div className="crew-pop-up__container-inner">
          <div className="crew-pop-up__content">
            <h1 className="crew-pop-up__title">Creators and actors of the film {title}</h1>
            {cast && cast.length ? <div className="crew-pop-up__cast">
              <h2 className="crew-pop-up__list-subtitle">Actors</h2>
              <div className="crew-pop-up__list">
                {isShowAllActors ? castFormat(cast) : castFormat(mainActors)}
              </div>
              {isShowAllCastButton &&
              <div className="pop-up__button-wrapper">
                <Button name={isShowAllActors ? "Hide actors" : "Show actors"}
                        setIsShowAllActors={setIsShowAllActors}
                        isShowAllActors={isShowAllActors}/>
              </div>
              }
            </div> : ""}
            {showCrewByDepartments()}
          </div>
          <div className="crew-pop-up__movie-card">
            <div className="movie-pop-up__wrapper-image">
              <img className="movie-pop-up__image" src={imagePath} alt=""/>
            </div>
            <div className="movie-pop-up__card-info">
              <div className="movie-pop-up__runtime">
                <AccessTimeIcon/>
                <p className="movie-pop-up__runtime-text">{runtime} minuntes</p>
              </div>
              <div className="movie-pop-up__main-text">
                {cardMainText()}
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      <ScrollToTopBtn/>
    </section>
  );
};

export default CrewPopup;
