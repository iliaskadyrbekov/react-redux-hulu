import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

const YearsTab = React.memo(function YearsTab({setCheckboxStatus, copyCheckedYears}) {
  const years = [
    2021, 2020, 2019, 2018, 2017, 2016,
    2015, 2014, 2013, 2012, 2011, 2010,
    '2000-2010', '1990-2000', '1980-1990',
    '1970-1980', '1960-1970', '1950-1960', 'before 1950',
  ];

  const listYears = years.map(year => {
    return (
      <div className="filter-pop-up__items-item" key={year} onClick={() => setCheckboxStatus(year, 'years')}>
        <Checkbox
          checked={copyCheckedYears.includes(year)}
          className="filter-pop-up__items-item-checkbox"
        />
        <span>{year}</span>
      </div>
    );
  });

  return (
    <div className="filter-pop-up__items">
      {listYears}
    </div>
  );
});
export default YearsTab;

