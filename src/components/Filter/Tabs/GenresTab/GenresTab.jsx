import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import {addCheckedGenre, setCheckedGenres} from "../../../../redux/actions/filterActionCreator";

const GenresTab = () => {
  const dispatch = useDispatch();
  const checkedGenres = useSelector(({filterReducer}) => filterReducer.checkedGenres);
  const genres = useSelector(({moviesReducer}) => moviesReducer.genres);

  const setCheckboxStatus = (id) => {
    if (!checkedGenres.includes(id)) {
      dispatch(addCheckedGenre(id));
    } else {
      const restCheckedGenres = checkedGenres.filter(itemId => itemId !== id)
      dispatch(setCheckedGenres(restCheckedGenres));
    }
  };

  const listGenres = genres.map(genre => {
    const {id, name} = genre;
    return (
      <div className="filter-pop-up__genres-item" key={id} onClick={() => setCheckboxStatus(id)}>
        <Checkbox
          checked={checkedGenres.includes(id)}
          className="filter-pop-up__genres-item-checkbox"
        />
        <span>{name}</span>
      </div>
    );
  });

  return (
    <div className="filter-pop-up__genres">
      {listGenres}
    </div>
  );
};

export default GenresTab;

