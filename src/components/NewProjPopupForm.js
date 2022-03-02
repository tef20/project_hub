import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, firestoreDB } from "../firebase-config";

export default function NewProjPopupForm({ togglePopup }) {
  const [user, setUser] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const unsubAthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    console.log("Updating user");
    return unsubAthState;
  }, []);

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formValues);
    if (user && Object.keys(formValues).length) {
      const projectsRef = collection(firestoreDB, "projects");
      await addDoc(projectsRef, {
        name: formValues.name,
        link: formValues.link,
        author: user.displayName,
        favourited: 0,
        viewed: 0,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
    }
    togglePopup(false);
  };

  // const submitToFirebase

  const handleClosePopup = (e) => {
    if (e.target === document.querySelector(".popup-overlay")) {
      togglePopup(false);
    }
  };

  return (
    <div className='popup-overlay' onClick={handleClosePopup}>
      <div className='form-wrapper'>
        <form className={"new-project-form"} onSubmit={handleSubmitForm}>
          <h2 className='form-header'>Add project</h2>
          <label htmlFor='tempinputid'>Project Name:</label>
          <input
            id='tempinputid'
            type='text'
            name='name'
            value={formValues.name ?? ""}
            onChange={handleFormChange}
          />
          <label htmlFor='tempinputid'>Link:</label>
          <input
            id='tempinputid'
            type='text'
            name='link'
            value={formValues.link ?? ""}
            onChange={handleFormChange}
          />
          {/* <label htmlFor='tempinputid'>Picture</label>
          <input
            id='tempinputid'
            type='file'
            name="thumbnail"
            onChange={handleFormChange}
          /> */}
          <button className='form-sub-button'>button</button>
        </form>
      </div>
    </div>
  );
}
