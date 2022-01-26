import React, { useState, useEffect } from "react";
import DnDWrapper from "../../API";
import "./SkillInfo.css";
const DnD = new DnDWrapper();
const SkillInfoPopUp = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [spell, setSpellInfo] = useState({});
  const [school, setSchoolInfo] = useState({});

  const { skill_id } = props;
  useEffect(() => {
    DnD.getSpellInfo(skill_id, setIsError).then(
      ([overviewData, schoolInfo]) => {
        setSpellInfo(overviewData);
        setSchoolInfo(schoolInfo);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const { name, desc, level, range, higher_level, material, ritual, duration, concentration, components } = spell;
  const schoolName = school.name;
  const schoolDesc = school.desc;
  return (
    <div className="skill-info">
      <h3>{name}</h3>
      <p>{desc}</p>
      <hr className="horizontal-separator" />
      <div className="lists">
        <div>
          <h4>School: {schoolName}</h4>
          <p>{schoolDesc}</p>
        </div>

        <hr className="info-separator" />

        <div className="right-section"> 
          <p>Level: {level}</p>
          <p>Range: {range}</p>
          <p>Material: {material}</p>
          <p>Ritual: {ritual ? "Yes" : "No"}</p>
          <p>Duration: {duration}</p>
          <p>Concentration: {concentration ? "Yes" : "No"}</p>
          <p>Components: {components.map((component) => component + " ")}</p> 

          <p className="optional">{higher_level}</p>
        </div>           
      </div>
    </div>
  );
};

export default SkillInfoPopUp;