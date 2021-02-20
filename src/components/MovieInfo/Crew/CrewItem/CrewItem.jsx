import React from 'react';

const CrewItem = ({name, profile_path}) => {
  return (
    <div className="crew__person">
      <img
        className="crew__person-image"
        src={profile_path && `https://image.tmdb.org/t/p/w138_and_h175_face${profile_path}`}
        alt=""
      />
      <span className="crew__person-name">{name}</span>
    </div>
  );
};

export default CrewItem;

