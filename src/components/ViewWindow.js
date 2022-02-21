import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Project from "./Project";

// todo:
//  - routes to gallery
//  - other options selected from nav

const ViewWindow = () => {
  const projects = {
    0: { name: "CV Builder", author: "Chris", link: "github.com" },
    1: { name: "Naughts and Crosses", author: "Chris", link: "github.com" },
    2: { name: "Calculator", author: "Chris", link: "github.com" },
    3: { name: "Library", author: "Chris", link: "github.com" },
    4: { name: "Todo List", author: "Chris", link: "github.com" },
    5: { name: "Projects Hub", author: "Chris", link: "github.com" },
    6: { name: "CS50ai", author: "Chris", link: "github.com"},
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
