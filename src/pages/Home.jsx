import React from "react";
import {Filter} from "../components/Filters";
import {ListMovies} from "../components/Movies";
import {ScrollToTopBtn} from "../components/ScrollToTopBtn";

const Home = () => {
  return (
    <div className="container home-container">
      <Filter/>
      <ListMovies/>
      <ScrollToTopBtn/>
    </div>
  );
};

export default Home;