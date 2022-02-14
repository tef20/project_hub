// Todo:
//  - tiled grid

const Gallery = () => {
  return (
    <section className='gallery'>
      <span>gallery-items</span>
      <ul className="gallery-items">
        {Array.from({ length: 7 }, (_, i) => {
          return (
            <li className='gallery-item'>
              <span>{`item${i}`}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Gallery;
