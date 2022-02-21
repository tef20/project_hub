import { Route, Routes } from "react-router-dom";
import DisplayArea from "./DisplayArea";
import Item from "./Item";

// todo:
//  - routes to gallery
//  - other options selected from nav

const ViewWindow = () => {
  return (
    <section className='viewWindow'>
      <Routes>
        <Route path='' element={<DisplayArea />} />
        <Route path=':id' element={<Item />} />
        <Route path='about' element={<DisplayArea />} />
      </Routes>
    </section>
  );
};

export default ViewWindow;
