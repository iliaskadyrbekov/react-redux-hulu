import React from "react";
import {Filter} from "../components/Filters";
import {ListMovies} from "../components/Movies";
import {ScrollToTopBtn} from "../components/ScrollToTopBtn";

const Home = () => {
  return (
    <>
      <Filter/>
      <ListMovies/>
      <ScrollToTopBtn/>
    </>
  );
};

export default Home;