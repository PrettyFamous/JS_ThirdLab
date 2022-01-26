import React, { useState, useEffect } from "react";
import Loading from "../Screens/Loading";
import Error from "../Screens/Error";
import PopUp from "../SkillPopUp";
import DnDWrapper from "../../API";   
import "./Skills.css";
const DnD = new DnDWrapper();

const Skills = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [popUpTrigger, setPopUpTrigger] = useState({
    active: false,
    skillObject: {},
  });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    DnD.getSkills(setIsError).then((data) => {
      setSkills(data.results);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  const skillClickHandler = (skill_id) => {
    setPopUpTrigger({ isActive: true, skill_id: skill_id });
  };

  return (
    <>
      <section className="cards-list">
        {skills.map((skillObject) => {
          return (
            <button
              key={skillObject.index}
              className="card"
              onClick={() => skillClickHandler(skillObject.index)}
            >
              <h3>{skillObject.name}</h3>
            </button>
          );
        })}
      </section>
      {popUpTrigger.isActive && (
        <PopUp trigger={popUpTrigger} setTrigger={setPopUpTrigger} />
      )}
    </>
  );
};

export default Skills;
