import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Project from "./Project";
import { firestoreDB } from "../firebase-config";

const ViewWindow = () => {
  const [projects, setProjects] = useState({});
  const [user, setUser] = useState("Alice");
  const [userProjects, setUserProjects] = useState({});

  useEffect(() => {
    let mounted = true;
    const loadProjectsData = async () => {
      console.log("Loading projects...");
      try {
        const colRef = collection(firestoreDB, "projects");
        const projectsQuery = query(colRef, orderBy("author"));
        onSnapshot(projectsQuery, (snapshot) => {
          const storedProjects = snapshot.docs.map((project) => ({
            ...project.data(),
            id: project.id,
          }));
          if (mounted) {
            setProjects(storedProjects);
            console.log("Load successful.");
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

  useEffect(() => {
    let mounted = true;

    const loadProjectsData = async () => {
      console.log(`Loading projects for ${user}...`);
      try {
        const colRef = collection(firestoreDB, "projects");
        const userProjectsQuery = query(
          colRef,
          where("author", "==", user)
          // orderBy("name")
        );
        onSnapshot(userProjectsQuery, (snapshot) => {
          const storedProjects = snapshot.docs.map((project) => ({
            ...project.data(),
            id: project.id,
          }));
          if (mounted) {
            setUserProjects(storedProjects);
            console.log("Load successful.");
          }
        });
      } catch (err) {
        if (mounted) {
          console.log(err.message);
          console.log("Load failed.");
        }
      }
    };

    if (![null, undefined].includes(user)) {
      loadProjectsData();
    }

    return () => {
      mounted = false;
      console.log("Loading cancelled.");
    };
  }, [user]);

  return (
    <section className='viewWindow'>
      <Routes>
        <Route path='' element={<DisplayArea projects={projects} />} />
        <Route path=':id' element={<Project projects={projects} />} />
        <Route
          path='my_projects'
          element={<DisplayArea projects={userProjects} />}
        />
      </Routes>
    </section>
  );
};

export default ViewWindow;
