import Aside from "./Aside";
import Gallery from "./ProjectGallery";

const DisplayArea = ({projects, user}) => {
  return (
    <section className='display-area'>
      <Gallery user={user} projects={projects} />
      <Aside />
    </section>
  );
};

export default DisplayArea;
