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
              <span>{projects[projId].name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Gallery;
