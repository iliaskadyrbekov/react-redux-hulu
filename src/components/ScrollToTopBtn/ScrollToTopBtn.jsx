import React, {useEffect, useState} from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const ScrollToTopBtn = () => {
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);

  const toggleVisibility = () => {
    if (document.documentElement.scrollTop > 500) {
      setIsVisibleBtn(true);
    } else {
      setIsVisibleBtn(false);
    }
  };

  const scrollOnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  return (
    // Add transion
    <>
      {isVisibleBtn && <div className="scroll-to-top-btn__wrapper" onClick={scrollOnTop}>
        <ArrowUpwardIcon className="scroll-to-top-btn"/>
      </div>}
    </>
  );
};

export default ScrollToTopBtn;
