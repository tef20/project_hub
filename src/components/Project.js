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
            {projects[id].link && <span>Link: {projects[id].link}</span>}
          </h3>
        )}
        <p className='project--description'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
          tempora debitis cum! Tempore mollitia alias tempora, reprehenderit vel
          eos. Sapiente laboriosam neque necessitatibus unde officiis ad. Aut
          minus officiis maiores! k
        </p>
      </div>
    </div>
  );
}
