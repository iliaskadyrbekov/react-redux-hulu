import React from 'react';
import {useSelector} from "react-redux";
import {CrewItem} from "./CrewItem";
import {Link} from "react-router-dom";

const Crew = () => {
  const {cast} = useSelector(({movieInfo}) => movieInfo.movieCast)
  const {id} = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const openCrewPopUp = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const showCast = () => {
    return cast && cast
      .filter((people, index) => index < 7)
      .map(person => {
        const {id, name, profile_path} = person;
        return <CrewItem name={name} path={profile_path} key={id}/>;
      });
  };

  return (
    <section className="crew">
      <h2 className="crew__title">Actors&Creators</h2>
      <div className="crew__cast">
        {showCast()}
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

