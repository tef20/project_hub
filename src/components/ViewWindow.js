import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Project from "./Project";
import projectsData from "../projects-data";

// todo:
//  - routes to gallery
//  - other options selected from nav

const ViewWindow = () => {
  const [projects, setProject] = useState({});

  useEffect(() => {
    const loadTestData = async () => {
      console.log("Loading test data...");
      try {
        const testData = await import("../projects-data");
        const projects = testData.default;
        console.log("Success.");
        setProject(projects);
      } catch {
        console.log("Failed.");
      }
    };
    if ("test") loadTestData();
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
