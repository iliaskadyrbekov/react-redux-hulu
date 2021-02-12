import React from "react";
import ContentLoader from "react-content-loader";

const MovieTemplate = () => {
  return (
    <ContentLoader
      speed={1}
      width={185}
      height={191}
      viewBox="0 0 185 191"
      backgroundColor="#ededed"
      foregroundColor="#fcfcfc"
    >
      <rect x="0" y="0" rx="3" ry="3" width="185" height="140"/>
      <rect x="5" y="144" rx="3" ry="3" width="175" height="21"/>
      <rect x="5" y="169" rx="3" ry="3" width="175" height="22"/>
    </ContentLoader>
  );
};

export default MovieTemplate;