import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsBar from "./ActionsBar";

const Gallery = ({ projects, user }) => {
  const [filteredProjectIds, setFilteredProjectIds] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== "all") {
      console.log(user);
      setFilteredProjectIds(
        Object.keys(projects).filter(
          (projId) => projects[projId]?.authorId === user?.uid
        )
      );
    } else {
      setFilteredProjectIds(Object.keys(projects));
    }
  }, [projects, user]);

  return (
    <>
      {" "}
      <ActionsBar />
      <section className='gallery'>
        <span>Gallery items</span>
        {filteredProjectIds.length ? (
          <ul className='gallery-items'>
            {filteredProjectIds.map((projId) => {
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
        ) : (
          <div className='empty-gallery'>No projects yet.</div>
        )}
      </section>
    </>
  );
};

export default Gallery;
