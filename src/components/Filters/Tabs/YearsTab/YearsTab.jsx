import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const YearsTab = React.memo(function YearsTab({setCheckboxStatus, copyCheckedYears, years}) {
  const listYears = years.map(year => {
    return (
      <div className="filter-pop-up__checkbox-item" key={year}>
        <div className="filter-pop-up__checkbox-wrapper"
             onClick={() => setCheckboxStatus(year, 'years')}>
          <Checkbox
            checked={copyCheckedYears.includes(year)}
            className="filter-pop-up__checkbox"
          />
          <span>{year}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="filter-pop-up__items">
      {listYears}
    </div>
  );
});

YearsTab.propTypes = {
  years: PropTypes.array.isRequired,
  copyCheckedYears: PropTypes.array.isRequired,
  setCheckboxStatus: PropTypes.func.isRequired,
};

export default YearsTab;

