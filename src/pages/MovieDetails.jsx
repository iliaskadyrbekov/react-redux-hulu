import React from "react";
import {useParams} from "react-router";

const MovieDetails = () => {
  const {id} = useParams();

  return (
    <div>
      {id}
    </div>
  );
};

export default MovieDetails;

