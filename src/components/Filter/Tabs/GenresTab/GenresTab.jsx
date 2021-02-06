import React, {useState} from "react";
import {useSelector} from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';

const GenresTab = () => {
  const [isChecked, setIsChecked] = useState(false);
  const genres = useSelector(({moviesReducer}) => moviesReducer.genres);

  const changeCheckedStatus = () => {
    setIsChecked(!isChecked);
  };

  const listGenres = genres.map(genre => {
    const {id, name} = genre;
    return (
      <div className="filter-pop-up__list-item" key={id}>
        <Checkbox
          checked={isChecked}
          onChange={changeCheckedStatus}
          className=""
        />
        <span>{name}</span>
      </div>
    );
  });

  return (
    <div className="filter-pop-up__list">
      {listGenres}
    </div>
  );
};

export default GenresTab;

