import React from "react";
import {Header} from "./Header";
import {Filter} from "./Filters";
import {ListMovies} from "./Movies";

function App() {
  return (
    <>
      <Header/>
      <div className="container">
        <Filter/>
        <ListMovies/>
      </div>
    </>
  );
}

export default App;

