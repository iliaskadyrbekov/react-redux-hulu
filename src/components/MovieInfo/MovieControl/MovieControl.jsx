import React, {useEffect, useState} from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import classNames from 'classnames';
import {useSelector} from "react-redux";
import {useParams} from "react-router";

const MovieControl = () => {
  const {id} = useParams();
  const movieInfo = useSelector(({movieInfo}) => movieInfo.movieInfo);
  const [isCopied, setIsCopied] = useState(false);
  const [copyButtonName, setCopyButtonName] = useState('Copy movie link');
  const [bookmarkedMovies, setBookmarkedMovies] = useState(JSON.parse(localStorage.getItem('bookmarkedMovies')));
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    let timeout;
    if (isCopied) {
      setCopyButtonName('Copied!');
      timeout = setTimeout(() => {
        setCopyButtonName('Copy movie link');
        setIsCopied(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  useEffect(() => {
    let movies;
    if (!isExistMovieInLocalStorage(bookmarkedMovies)) {
      movies = bookmarkedMovies ? [...bookmarkedMovies, movieInfo] : [movieInfo];
    } else {
      const indexMovie = bookmarkedMovies
        .map((movie, index) => movie.id === +id && index)
        .filter((item) => item !== false)[0];
      movies = bookmarkedMovies.filter((item, index) => index !== indexMovie);
    }
    localStorage.setItem('bookmarkedMovies', JSON.stringify(movies));
    setBookmarkedMovies(movies);
  }, [isBookmarked]);

  const writeInClipboard = () => {
    const input = document.createElement('input');
    const currentURL = window.location.href;

    document.body.appendChild(input);
    input.value = currentURL;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  const onCopyMovieUrl = () => {
    setIsCopied(true);
    writeInClipboard();
  };

  const isExistMovieInLocalStorage = (bookmarkedMovies) => {
    if (!bookmarkedMovies) return false;
    const bookmarkedIds = bookmarkedMovies.map((movie) => movie.id);
    return bookmarkedIds.includes(+id);
  };

  const toggleBookmarkStatus = () => {
    setIsBookmarked(!isBookmarked);
  };

  const copyIcon = isCopied ?
    <FileCopyIcon style={{fontSize: 29}}/> :
    <FileCopyOutlinedIcon style={{fontSize: 29}}/>;

  const bookmarkIcon = isBookmarked ?
    <BookmarkIcon style={{fontSize: 32}}/> :
    <BookmarkBorderIcon style={{fontSize: 32}}/>;

  return (
    <div className="movie-control">
      <div className="movie-control__button" onClick={toggleBookmarkStatus}>
        {bookmarkIcon}
        <span className="movie-control__button-text">Watch later</span>
      </div>
      <div className={classNames({
        "movie-control__button": true,
        "movie-control__button--disabled": isCopied,
      })} onClick={onCopyMovieUrl}>
        {copyIcon}
        <span className="movie-control__button-text">{copyButtonName}</span>
      </div>
    </div>
  );
};

export default MovieControl;
