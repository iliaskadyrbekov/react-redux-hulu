import React from 'react';
import {useSelector} from "react-redux";
import {CrewItem} from "./CrewItem";

const Crew = () => {
  const {cast, crew} = useSelector(({movieInfoReducer}) => movieInfoReducer.movieCast)

  return (
    <section className="crew">
      <h2 className="crew__title">Actors&Creators</h2>
      <div className="crew__cast">
        {cast && cast.filter((people, index) => index < 7).map(people => <CrewItem {...people} key={people.id}/>)}
        <div className="crew__full-cast-btn-wrapper">
          <button className="crew__person crew__full-cast-btn">Show more</button>
        </div>
      </div>
    </section>
  );
};

export default Crew;

