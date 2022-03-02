import React, { useState } from "react";
import NewProjPopupForm from "./NewProjPopupForm";

export default function AddProjectButton({ handleAddNewProject }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (show) => {
    setShowPopup((prevState) => show ?? !prevState);
    // handleAddNewProject
  };

  return (
    <>
      <button onClick={(e) => togglePopup(true)}>Add project</button>
      {showPopup && <NewProjPopupForm togglePopup={togglePopup} />}
    </>
  );
}
