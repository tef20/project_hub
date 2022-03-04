// todo: handle refresh on project page -- curently crashes
import { useParams } from "react-router-dom";

export default function Project({ projects }) {
  const { id } = useParams();
  return (
    <div className='project'>
      <div className='project--img-wrapper'>
        <img src='' alt='250 x 250' className='project--project-img' />
      </div>
      <div className='project--text-wrapper'>
        <h2 className='project--title'>{projects[id].name}</h2>
        {(projects[id].author || projects[id].author) && (
          <h3 className='project--meta'>
            {projects[id].author && <span>Author: {projects[id].author}</span>}
            {projects[id].link && (
              <span>
                Link:{" "}
                <a href={`https://${projects[id].link}`}>{projects[id].link}</a>
              </span>
            )}
          </h3>
        )}
        <p className='project--description'>{projects[id].description}</p>
      </div>
    </div>
  );
}
