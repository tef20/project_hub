import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsBar from "./ActionsBar";

const Gallery = ({ projects, user }) => {
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [filterExp, setFilterExp] = useState(/.*/);
  const [sortField, setSortField] = useState("name");
  const navigate = useNavigate();

  useEffect(() => {
    setFilterExp(new RegExp(filterString, "i"));
  }, [filterString]);

  const matchUser = (projects, projId, user) => {
    return user && projects[projId]?.authorId === user?.uid;
  };

  const matchField = (projects, projId, filterExp, ...fields) => {
    for (const field of fields) {
      if (filterExp.test(projects[projId][field])) return true;
    }
  };

  useEffect(() => {
    setSelectedProjectIds(() => {
      const projIds = Object.keys(projects);
      return projIds.filter(
        (projId) =>
          (user === "all" || matchUser(projects, projId, user)) &&
          (!filterExp ||
            matchField(projects, projId, filterExp, "author", "name"))
      );
    });
  }, [projects, user, filterExp]);

  useEffect(() => {
    if (sortField !== "date") {
      return setSelectedProjectIds((prevIds) => {
        return [...prevIds].sort((projIdA, projIdB) => {
          if (projects[projIdA][sortField] < projects[projIdB][sortField])
            return -1;
          if (projects[projIdA][sortField] > projects[projIdB][sortField])
            return 1;
          return 0;
        });
      });
    }
  }, [projects, sortField]);

  return (
    <>
      {/* <SearchBar filterString={filterString} setFilterString={setFilterString} /> */}
      <ActionsBar
        filterString={filterString}
        setFilterString={setFilterString}
        sortField={sortField}
        setSortField={setSortField}
      />
      <section className='gallery'>
        <span>Gallery items</span>
        {selectedProjectIds.length ? (
          <ul className='gallery-items'>
            {selectedProjectIds.map((projId) => {
              return (
                <li
                  key={projId}
                  className='gallery-item'
                  onClick={() => navigate(`/${projId}`)}
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
