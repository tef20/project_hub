import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Project from "./Project";

const ViewWindow = () => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const loadProjectsData = async () => {
      console.log("Loading data...");
      try {
        const db = getFirestore();
        const colRef = collection(db, "projects");
        const projectDocs = await getDocs(colRef);
        const existingProjects = projectDocs.docs.map((project) => ({
          ...project.data(),
          id: project.id,
        }));
        setProjects(existingProjects);
        console.log("Load successful.");
      } catch (err) {
        console.log(err.message);
        console.log("Load failed.");
      }
    };
    loadProjectsData();
  }, []);

  return (
    <section className='viewWindow'>
      <Routes>
        <Route path='' element={<DisplayArea projects={projects} />} />
        <Route path=':id' element={<Project projects={projects} />} />
        <Route path='about' element={<DisplayArea />} />
      </Routes>
    </section>
  );
};

export default ViewWindow;
