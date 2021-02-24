import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const CrewByDepartment = ({title, castFormat}) => {
  const {crew} = useSelector(({movieInfo}) => movieInfo.movieCast);
  const [crewDepartments, setCrewDepartments] = useState({
    "Production": [],
    "Sound": [],
    "Art": [],
    "Directing": [],
    "Editing": [],
    "Writing": [],
  });

  useEffect(() => {
    if (!crew) return;
    sortCrewByDepartment();
  }, [crew]);

  const sortCrewByDepartment = () => {
    const copyCrewDepartmants = {...crewDepartments};
    const uniqueCrewItems = [...new Map(crew.map(item => [item.id, item])).values()];

    uniqueCrewItems.forEach((person) => {
      const {known_for_department} = person;
      if (Object.keys(copyCrewDepartmants).includes(known_for_department)) {
        copyCrewDepartmants[known_for_department].push(person);
      }
    });
    setCrewDepartments(copyCrewDepartmants);
  };

  return (
    <div className="crew-pop-up__cast">
      <h2 className="crew-pop-up__list-subtitle">{title} <span>crew</span></h2>
      <div className="crew-pop-up__list">
        {castFormat(crewDepartments[title])}
      </div>
    </div>
  );
};

export default CrewByDepartment;
