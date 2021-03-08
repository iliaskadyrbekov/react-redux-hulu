import React from 'react';
import {useSelector} from "react-redux";
import {CrewItem} from "./CrewItem";
import {Link} from "react-router-dom";

const Crew = () => {
  const {cast, crew} = useSelector(({movieInfo}) => movieInfo.movieCast)
  const {id} = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const openCrewPopUp = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const showCrew = (persons) => {
    if (persons) {
      const uniquePersons = [...new Map(persons.map(item => [item.id, item])).values()];
      return uniquePersons
        .filter((person, index) => index < 7)
        .map(person => {
          const {id, name, profile_path} = person;
          return <CrewItem name={name} path={profile_path} key={id}/>;
        });
    }
  };

  return (
    <section className="crew">
      <h2 className="crew__title">Actors&Creators</h2>
      <div className="crew__cast">
        {cast && cast.length === 0 ? showCrew(crew) : showCrew(cast)}
        <Link to={`/movies/${id}/crew`} className="crew__full-cast-btn-wrapper">
          <div className="crew__full-cast-btn" onClick={openCrewPopUp}>Show more</div>
        </Link>
      </div>
    </section>
  );
};

export default Crew;

