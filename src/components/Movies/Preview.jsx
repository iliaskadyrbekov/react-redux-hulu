import React from "react";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Preview = ({lang, genresID, genres, overview, setIsBookmarked, isBookmarked}) => {
  const movieGenres = genres.filter((genre) => genresID.includes(genre.id)).map((genre) => genre.name).join(', ');
  const movieGenresFormat = movieGenres.charAt(0).toUpperCase() + movieGenres.toLowerCase().slice(1);

  const onCnangeBookmarkStatus = () => {
    setIsBookmarked(!isBookmarked);
  };

  const bookmarkBtn = isBookmarked ?
    <BookmarkIcon onClick={onCnangeBookmarkStatus}/> :
    <BookmarkBorderIcon onClick={onCnangeBookmarkStatus}/>

  return (
    <div className="preview">
      <div className="preview__header">
        <span className="preview__lang">{lang}</span>
        <div className="preview__bookmark-btn">
          {bookmarkBtn}
        </div>
      </div>
      <div className="preview__overview">
        <p className="preview__genres">
          {movieGenresFormat}
        </p>
        <p className="preview__description">
          {overview}
        </p>
      </div>
    </div>
  );
};

export default Preview;

