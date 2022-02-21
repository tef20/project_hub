// todo:
//  - actions bar
//  - gallery
//  - aside
//  - responsive to window size

import ActionsBar from "./ActionsBar";
import Aside from "./Aside";
import Gallery from "./ProjectGallery";

const DisplayArea = ({projects}) => {
  return (
    <section className='display-area'>
      <ActionsBar />
      <Gallery projects={projects} />
      <Aside />
    </section>
  );
};

export default DisplayArea;
