import React from 'react';
import {useSelector} from "react-redux";
import {CrewItem} from "./CrewItem";
import {Link} from "react-router-dom";

const Crew = () => {
  const {cast, crew} = useSelector(({movieInfo}) => movieInfo.movieCast)
  const {id} = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const openCrewPopup = () => {
    window.scrollTo(0, 0);
    document.body.classList.add('body__model--open');
  };

  return (
    <section className="crew">
      <h2 className="crew__title">Actors&Creators</h2>
      <div className="crew__cast">
        {cast && cast
          .filter((people, index) => index < 7)
          .map(people => <CrewItem {...people} key={people.id}/>)}
        <Link to={`/movies/${id}/crew`} className="crew__full-cast-btn-wrapper">
          <button
            className="crew__person crew__full-cast-btn"
            onClick={openCrewPopup}
          >Show more
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Crew;

