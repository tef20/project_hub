// todo: add author id to projects
//
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Project from "./Project";
import { firestoreDB } from "../firebase-config";

const ViewWindow = ({ user }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    const loadProjectsData = async () => {
      try {
        const colRef = collection(firestoreDB, "projects");
        // const userProjectsQuery = query(
        //   colRef,
        //   where("author", "==", user)
        //   // orderBy("name")
        // );
        const projectsQuery = query(colRef, orderBy("author"));
        onSnapshot(projectsQuery, (snapshot) => {
          const storedProjects = snapshot.docs.map((project) => {
            return {
              ...project.data(),
              id: project.id,
            };
          });
          if (mounted) {
            setProjects(storedProjects);
          }
        });
      } catch (err) {
        if (mounted) {
          console.log(err.message);
          console.log("Load failed.");
        }
      }
    };
    loadProjectsData();

    return () => {
      mounted = false;
      console.log("Loading cancelled.");
    };
  }, []);

  return (
    <section className='viewWindow'>
      <Routes>
        <Route
          path=''
          element={
            <DisplayArea projects={projects} showFromAll={true} user={user} />
          }
        />
        <Route
          path='project/:id'
          element={<Project projects={projects} user={user} />}
        />
        <Route
          path='my_projects'
          element={
            <DisplayArea projects={projects} showFromAll={false} user={user} />
          }
        />
      </Routes>
    </section>
  );
};

export default ViewWindow;
