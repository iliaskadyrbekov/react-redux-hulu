import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useHistory} from "react-router";
import {setIsOpenCrewPopup} from "../../redux/popups/popupsActionCreator";

const CrewPopup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {title} = useSelector(({movieInfo}) => movieInfo.movieInfo);
  const {cast, crew} = useSelector(({movieInfo}) => movieInfo.movieCast)

  const closeCrewPopup = () => {
    dispatch(setIsOpenCrewPopup(false));
    history.goBack();
  };

  return (
    <section className="pop-up">
      <div className="pop-up__container">
        <div className="crew-pop-up__header">
          <span className="crew-pop-up__header" onClick={closeCrewPopup} >
             <ArrowBackIosIcon/>
             <span>Back</span>
          </span>
        </div>
        <div className="crew-pop-up__container-inner">
          <div className="crew-pop-up__content">
            <h1 className="crew-pop-up__title">Creators and actors of the film {title}</h1>
          </div>
          <div className="crew-pop-up__movie-card">
            {/*<Movie/>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrewPopup;
