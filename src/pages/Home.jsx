import React from "react";
import {Filter} from "../components/Filters";
import {ListMovies} from "../components/Movies";
import {ScrollToTopBtn} from "../components/ScrollToTopBtn";
import {FilterPopup} from "../components/Popups";
import {useSelector} from "react-redux";

const Home = () => {
  const isOpenFilterPopUp = useSelector(({popups}) => popups.isOpenFilterPopUp);

  return (
    <div className="container home-container">
      <Filter/>
      <ListMovies/>
      <ScrollToTopBtn/>
      {isOpenFilterPopUp && <FilterPopup/>}
    </div>
  );
};

export default Home;

