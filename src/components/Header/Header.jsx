import React, {useState} from "react";
import {Search} from "./index";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import logo from './../../assets/img/logo.svg';
import {Link} from "react-router-dom";
import {setCountSearchPage, setQueryValue, setTotalMovies} from "../../redux/search/searchActionCreator";
import {useDispatch} from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);

  const moveToHome = () => {
    dispatch(setQueryValue(''));
    dispatch(setCountSearchPage(2));
    dispatch(setTotalMovies(10000));
  };

  const bookmarkIcon = isHovering
    ? <BookmarksIcon style={{fontSize: 30}}/>
    : <BookmarksOutlinedIcon style={{fontSize: 30}}/>;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to="/">
            <img
              className="header__logo"
              onClick={moveToHome}
              src={logo} alt=""/>
          </Link>
          <Search/>
          <Link to="/bookmarks">
            <div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="header__bookmark-wrapper">
              {bookmarkIcon}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

