import { useParams } from "react-router-dom";

export default function Project({ projects }) {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);
  return (
    <div className='project'>
      {project && (
        <>
          <div className='project--img-wrapper'>
            <img src='' alt='250 x 250' className='project--project-img' />
          </div>
          <div className='project--text-wrapper'>
            <h2 className='project--title'>{project.name}</h2>
            {(project.author || project.author) && (
              <h3 className='project--meta'>
                {project.author && <span>Author: {project.author}</span>}
                {project.link && (
                  <span>
                    Link: <a href={`https://${project.link}`}>{project.link}</a>
                  </span>
                )}
              </h3>
            )}
            <p className='project--description'>{project.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
