import Aside from "./Aside";
import Gallery from "./ProjectGallery";

const DisplayArea = ({ projects, user, showFromAll }) => {
  return (
    <section className='display-area'>
      <Gallery user={user} projects={projects} showFromAll={showFromAll} />
      <Aside projects={projects} />
    </section>
  );
};

export default DisplayArea;
