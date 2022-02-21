import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Project from "./Project";

// todo:
//  - routes to gallery
//  - other options selected from nav

const ViewWindow = () => {
  const projects = {
    0: { name: "proj0" },
    1: { name: "proj1" },
    2: { name: "proj2" },
    3: { name: "proj3" },
    4: { name: "proj4" },
    5: { name: "proj5" },
    6: { name: "proj6" },
  };

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
