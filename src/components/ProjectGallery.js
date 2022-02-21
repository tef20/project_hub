// Todo:
//  - tiled grid

import { useNavigate } from "react-router-dom";

const Gallery = ({ projects }) => {
  const navigate = useNavigate();
  return (
    <section className='gallery'>
      <span>Gallery items</span>
      <ul className='gallery-items'>
        {Object.keys(projects).map((projId) => {
          return (
            <li
              key={projId}
              className='gallery-item'
              onClick={() => navigate(`${projId}`)}
            >
              <h3 className='gallery-item--proj-name'>
                {projects[projId].name}
              </h3>
              <p className='gallery-item--proj-auth'>
                {`by ${projects[projId].author}`}
              </p>
              <div className='gallery-item--img-wrapper'>
                <img
                  src=''
                  alt='smart_toy'
                  className='gallery-item--img material-icons-outlined'
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Gallery;
