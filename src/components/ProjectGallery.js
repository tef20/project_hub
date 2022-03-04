import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsBar from "./ActionsBar";
import ProjectForm from "./ProjectForm";

const Gallery = ({ projects, user, showFromAll }) => {
  // todo: fix confusion over project ids -- projects is an array of objects, each obect should have a uniq id
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [filterExp, setFilterExp] = useState(/.*/);
  const [sortField, setSortField] = useState("name");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [projIdUnderEdit, setProjIdUnderEdit] = useState();

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
          // this filter is a bit adhoc...
          (showFromAll || matchUser(projects, projId, user)) &&
          (!filterExp ||
            matchField(projects, projId, filterExp, "author", "name"))
      );
    });
  }, [showFromAll, projects, user, filterExp]);

  useEffect(() => {
    // todo: allow sort by date added (after add / edit functionality added)
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

  const togglePopup = (show) => {
    setShowPopup((prevState) => show ?? !prevState);
  };

  const handleClosePopup = (e) => {
    if (e.target === document.querySelector(".popup-overlay")) {
      togglePopup(false);
      setProjIdUnderEdit(null);
    }
  };

  const handleEditClick = (e, projId) => {
    e.stopPropagation();
    console.log("setting", projId);
    setProjIdUnderEdit((prev) => projId);
    togglePopup(true);
  };

  return (
    <>
      {showPopup && (
        <div className='popup-overlay' onClick={handleClosePopup}>
          <ProjectForm
            user={user}
            closePopup={() => togglePopup(false)}
            projects={projects}
            project={projIdUnderEdit}
          />
        </div>
      )}
      <ActionsBar
        filterString={filterString}
        setFilterString={setFilterString}
        sortField={sortField}
        setSortField={setSortField}
        user={user}
        firePopup={() => togglePopup(true)}
      />
      <section className='gallery'>
        <span>Gallery items</span>
        {selectedProjectIds.length ? (
          <ul className='gallery-items'>
            {selectedProjectIds.map((projId) => {
              const project = projects[projId];
              const buttonTray =
                user && user.uid === project.authorId ? (
                  <>
                    <button onClick={(e) => handleEditClick(e, projId)}>
                      Edit
                    </button>
                    <button onClick={() => console.log("delete")}>
                      Delete
                    </button>
                  </>
                ) : (
                  <button onClick={() => console.log("like")}>Like</button>
                );
              return (
                <li
                  key={projId}
                  className='gallery-item'
                  onClick={() => navigate(`/${projId}`)}
                >
                  <h3 className='gallery-item--proj-name'>{project.name}</h3>
                  <p className='gallery-item--proj-auth'>
                    {`by ${project.author}`}
                  </p>
                  <div className='gallery-item--img-wrapper'>
                    <img
                      src=''
                      alt='smart_toy'
                      className='gallery-item--img material-icons-outlined'
                    />
                  </div>
                  {buttonTray}
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
