import React from "react";
import SkillInfo from "../SkillInfo";
import "./SkillPopUp.css";

const SkillPopUp = (props) => {
  const { isActive, skill_id } = props.trigger;
  const setTrigger = props.setTrigger;
  return (
    isActive && (
      <div className="skillInfoPopUp">
        <div className="skillInfoPopUp_inner">
          <button
            onClick={() => setTrigger({ ...props.trigger, isActive: false })}
          ></button>
          <SkillInfo skill_id={skill_id} />
        </div>
      </div>
    )
  );
};

export default SkillPopUp;
