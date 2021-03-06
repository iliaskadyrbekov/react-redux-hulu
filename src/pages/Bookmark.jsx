import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {Movie} from "../components/Movies";
import {Button} from "../components/Button";

const Bookmark = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [isClickedOnClearBtn, setIsClickedOnClearBtn] = useState(false);

  useEffect(() => {
    setBookmarkedMovies(JSON.parse(localStorage.getItem('bookmarkedMovies')));
  }, []);

  useEffect(() => {
    if (isClickedOnClearBtn) {
      if (bookmarkedMovies.length) {
        const permit = window.confirm("Are you sure you want to unbookmark all your movies?");
        if (permit) {
          localStorage.setItem('bookmarkedMovies', JSON.stringify([]));
          setBookmarkedMovies([]);
        }
      } else {
        alert(`You haven't bookmarked movies!`);
      }
      setIsClickedOnClearBtn(false);
    }
  }, [isClickedOnClearBtn])

  const formatBookmarkedMovies = bookmarkedMovies.map((movie) => {
    return <Movie movie={movie} key={movie.id}/>;
  });

  const unbookmarkAllMovies = () => {
    setIsClickedOnClearBtn(true);
  };

  return (
    <section className="bookmark">
      <div className="container">
        <div className="bookmark__back-btn">
          <Button name="Back to the movies"/>
        </div>
        <div className="bookmark__header">
          <h1 className="bookmark__title">Bookmarked movies</h1>
          <div className="bookmark__clear-icon-wrapper" onClick={unbookmarkAllMovies}>
            <DeleteIcon className="bookmark__clear-icon"/>
          </div>
        </div>
        <div className="movies">
          <div className="movies__list">
            {formatBookmarkedMovies}
          </div>
        </div>
        {!bookmarkedMovies.length && <p className="bookmark__message">Not found bookmarked movies</p>}
      </div>
    </section>
  );
};

export default Bookmark;

