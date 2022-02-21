// Todo:
//  - tiled grid

import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  return (
    <section className='gallery'>
      <span>Gallery items</span>
      <ul className='gallery-items'>
        {Array.from({ length: 7 }, (_, i) => {
          return (
            <li
              key={i}
              className='gallery-item'
              onClick={() => navigate(`${i}`)}
            >
              <span>{`item${i}`}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Gallery;
