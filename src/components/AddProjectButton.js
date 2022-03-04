import React, { useState } from "react";
import NewProjPopupForm from "./NewProjPopupForm";

export default function AddProjectButton({ user }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (show) => {
    setShowPopup((prevState) => show ?? !prevState);
  };

  return (
    <>
      <button onClick={(e) => togglePopup(true)}>Add project</button>
      {showPopup && <NewProjPopupForm togglePopup={togglePopup} user={user} />}
    </>
  );
}
