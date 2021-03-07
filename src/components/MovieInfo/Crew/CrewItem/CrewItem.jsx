import React from 'react';
import defaultPersonImage from "../../../../assets/img/defaultPersonImage.png";
import PropTypes from "prop-types";

const CrewItem = ({name, path}) => {
  const pathPersonImage = path ?
    `https://image.tmdb.org/t/p/w138_and_h175_face${path}` :
    defaultPersonImage;

  return (
    <div className="crew-item">
      <div className="crew-item__image-wrapper">
        <img className="crew-item__image" src={pathPersonImage} alt=""/>
      </div>
      <p className="crew-item__name">{name}</p>
    </div>
  );
};

CrewItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default CrewItem;

