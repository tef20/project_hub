import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDB } from "../firebase-config";
import ActionsBar from "./ActionsBar";
import ProjectForm from "./ProjectForm";

const Gallery = ({ projects, user, showFromAll }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [filterExp, setFilterExp] = useState(/.*/);
  const [sortField, setSortField] = useState("name");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [projIdUnderEdit, setProjIdUnderEdit] = useState();

  useEffect(() => {
    setFilterExp(new RegExp(filterString, "i"));
  }, [filterString]);

  const matchUser = (project, user) => {
    return user && project.authorId === user.uid;
  };

  const matchField = (project, filterExp, ...fields) => {
    for (const field of fields) {
      if (filterExp.test(project[field])) return true;
    }
  };

  useEffect(() => {
    setSelectedProjects(() => {
      return projects.filter(
        (project) =>
          // this filter is a bit adhoc...
          (showFromAll || matchUser(project, user)) &&
          (!filterExp || matchField(project, filterExp, "author", "name"))
      );
    });
  }, [showFromAll, projects, user, filterExp]);

  useEffect(() => {
    setSelectedProjects((prevState) => {
      return [...prevState].sort((projA, projB) => {
        const projAVal =
          sortField === "date" ? projA[sortField].seconds : projA[sortField];
        const projBVal =
          sortField === "date" ? projB[sortField].seconds : projB[sortField];
        if (projAVal < projBVal) return -1;
        if (projAVal > projBVal) return 1;
        return 0;
      });
    });
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
    setProjIdUnderEdit(projId);
    togglePopup(true);
  };

  const handleDeleteItem = (e, projId) => {
    e.stopPropagation();
    deleteDoc(doc(firestoreDB, "projects", projId));
  };

  return (
    <>
      {showPopup && (
        <div className='popup-overlay' onClick={handleClosePopup}>
          <ProjectForm
            user={user}
            closePopup={() => togglePopup(false)}
            projects={projects}
            projIdUnderEdit={projIdUnderEdit}
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
        {selectedProjects.length ? (
          <ul className='gallery-items'>
            {selectedProjects.map((project) => {
              const buttonTray =
                user && user.uid === project.authorId ? (
                  <>
                    <button onClick={(e) => handleEditClick(e, project.id)}>
                      Edit
                    </button>
                    <button onClick={(e) => handleDeleteItem(e, project.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <button onClick={() => console.log("like")}>Like</button>
                );
              return (
                <li
                  key={project.id}
                  className='gallery-item'
                  onClick={() => navigate(`/project/${project.id}`)}
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
