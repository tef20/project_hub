import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { firestoreDB } from "../firebase-config";

export default function ProjectForm({
  closePopup,
  user,
  projects,
  projIdUnderEdit,
}) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    console.log({ projIdUnderEdit, projects });
    if (projIdUnderEdit) setFormValues(projects[projIdUnderEdit]);
  }, [projIdUnderEdit, projects]);

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    if (formFields.length) {
      if (projIdUnderEdit) {
        const docRef = doc(firestoreDB, "projects", projIdUnderEdit);
        await updateDoc(docRef, formFields);
      }
      const projectsRef = collection(firestoreDB, "projects");
      await addDoc(projectsRef, {
        name: formValues.name,
        author: user.displayName,
        link: formValues.link,
        description: formValues.description,
        favourited: 0,
        viewed: 0,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
    }
    closePopup && closePopup();
  };

  return (
    <div className='form-wrapper'>
      <form className={"new-project-form"} onSubmit={handleSubmitForm}>
        <h2 className='form-header'>Add project</h2>
        <label htmlFor='form--name'>Project Name:</label>
        <input
          id='form--proj-name'
          type='text'
          name='name'
          value={formValues.name ?? ""}
          onChange={handleFormChange}
        />
        <label htmlFor='form--proj-link'>Link:</label>
        <input
          id='form--proj-link'
          type='text'
          name='link'
          value={formValues.link ?? ""}
          onChange={handleFormChange}
        />
        <label htmlFor='form--proj-description'>Description:</label>
        <textarea
          id='form--proj-description'
          type='textarea'
          name='description'
          value={formValues.description ?? ""}
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
  );
}
