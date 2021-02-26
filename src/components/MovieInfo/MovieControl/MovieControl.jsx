import React, {useEffect, useState} from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import classNames from 'classnames';

const MovieControl = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyButtonName, setCopyButtonName] = useState('Copy movie link');

  useEffect(() => {
    let timeout;
    if (isCopied) {
      setCopyButtonName('Copied!');
      setTimeout(() => {
        timeout = setCopyButtonName('Copy movie link');
        setIsCopied(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  const writeInClipboard = () => {
    const input = document.createElement('input');
    const currentURL = window.location.href;

    document.body.appendChild(input);
    input.value = currentURL;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  const copyMovieUrl = () => {
    setIsCopied(true);
    writeInClipboard();
  };

  const copyIcon = isCopied ?
    <FileCopyIcon style={{fontSize: 29}}/> :
    <FileCopyOutlinedIcon style={{fontSize: 29}}/>;

  return (
    <div className="movie-control">
      <div className="movie-control__button">
        <BookmarkBorderIcon style={{fontSize: 32}}/>
        <span className="movie-control__button-text">Watch later</span>
      </div>

      <div className={classNames({
        "movie-control__button": true,
        "movie-control__button--disabled": isCopied,
      })} onClick={copyMovieUrl}>
        {copyIcon}
        <span className="movie-control__button-text">{copyButtonName}</span>
      </div>
    </div>
  );
};

export default MovieControl;
