import React from 'react';
import defaultPersonImage from "../../../../assets/img/defaultPersonImage.png";

const CrewItem = ({name, path}) => {
  const pathPersonImage = path ?
    `https://image.tmdb.org/t/p/w138_and_h175_face${path}` :
    defaultPersonImage;

  return (
    <div className="crew__person">
      <img
        className="crew__person-image"
        src={pathPersonImage}
        alt=""
      />
      <p className="crew__person-name">{name}</p>
    </div>
  );
};

export default CrewItem;

