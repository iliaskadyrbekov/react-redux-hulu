import React from 'react';
import {useSelector} from "react-redux";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useHistory} from "react-router";

const CrewPopup = () => {
  const history = useHistory();
  const {title} = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const closeCrewPopup = () => {
    history.goBack();
    document.body.classList.remove('body__model--open');
  };

  return (
    <section className="pop-up">
      <div className="pop-up__container">
        <div className="crew-pop-up__header">
          <span onClick={closeCrewPopup}>
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
