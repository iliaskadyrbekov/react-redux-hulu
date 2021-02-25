import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CrewItem} from "./CrewItem";
import {Link} from "react-router-dom";
import {setIsOpenCrewPopup} from "../../../redux/popups/popupsActionCreator";

const Crew = () => {
  const dispatch = useDispatch();
  const {cast} = useSelector(({movieInfo}) => movieInfo.movieCast)
  const {id} = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const openCrewPopUp = () => {
    dispatch(setIsOpenCrewPopup(true));
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <section className="crew">
      <h2 className="crew__title">Actors&Creators</h2>
      <div className="crew__cast">
        {cast && cast
          .filter((people, index) => index < 7)
          .map(person => <CrewItem name={person.name} path={person.profile_path} key={person.id}/>)}
        <Link to={`/movies/${id}/crew`} className="crew__full-cast-btn-wrapper">
          <button
            className="crew__full-cast-btn"
            onClick={openCrewPopUp}
          >Show more
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Crew;

