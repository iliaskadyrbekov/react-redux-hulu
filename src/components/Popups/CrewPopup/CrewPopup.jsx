import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {CrewItem} from "../../MovieInfo/Crew/CrewItem";
import {Button} from "../../Button";
import {CrewByDepartments} from "./index";
import {ScrollToTopBtn} from "../../ScrollToTopBtn";
import {Loader} from "../../Loader";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {getCountriesList, getGenresList, getImagePath, getYear} from "../../../utils/formatMovieData";

const CrewPopup = () => {
  const MAX_SHOWING_PERSONS = 9;
  const {
    movieInfo: {
      title, backdrop_path, poster_path, runtime,
      production_countries, release_date, genres
    },
    movieCast: {cast}
  } = useSelector(({movieInfo}) => movieInfo);

  const [isShowAllCastButton, setIsShowAllCastButton] = useState(false);
  const [isShowAllActors, setIsShowAllActors] = useState(false);
  const [mainActors, setMainActors] = useState([]);
  const [isFetchingCrew, setIsFetchingCrew] = useState(true);

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

  useEffect(() => {
    if (title) {
      document.title = `Crew of ${title}`;
    }
  }, [title]);

  const castFormat = (actors) => {
    return actors && actors.map((person, index) => {
      const {name, profile_path} = person;
      return <CrewItem key={index} name={name} path={profile_path}/>;
    });
  };

  const showCrewByDepartments = () => {
    const titles = ["Directing", "Production", "Sound", "Writing", "Editing", "Art", "Visual Effects"];
    return titles.map((title) => {
      return <CrewByDepartments title={title} castFormat={castFormat} key={title}/>;
    });
  };

  const cardMainText = () => {
    return `${getCountriesList(production_countries)}, ${getYear(release_date)}, ${getGenresList(genres)}`;
  };

  return (
    <section className="pop-up">
      <div className="pop-up__container container">
        <div className="crew-pop-up__header">
          <Button name="Back to the movie"/>
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
              <div className="pop-up__button-wrapper pop-up__button-wrapper--crew">
                <Button name={isShowAllActors ? "Hide actors" : "Show actors"}
                        setIsShowAllActors={setIsShowAllActors}/>
              </div>
              }
            </div> : ""}
            {showCrewByDepartments()}
          </div>
          <div className="crew-pop-up__movie-card">
            <div className="movie-pop-up__wrapper-image">
              <img
                className="movie-pop-up__image"
                src={getImagePath(backdrop_path, poster_path)}
                alt=""
              />
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


