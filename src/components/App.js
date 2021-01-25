import React from "react";
import {Header} from "./Header";
import {MovieList} from "./Movies";

function App() {
  return (
    <>
      <Header/>
      <div className="container">
        <MovieList/>
      </div>
    </>
  );
}

export default App;

// TODO
// 1) Add variables to project
// 2) Add comment to project
