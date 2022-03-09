import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
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
          sortField === "createdAt"
            ? projA[sortField].seconds
            : sortField === "likes"
            ? -projA[sortField]
            : projA[sortField].toLowerCase();
        const projBVal =
          sortField === "createdAt"
            ? projB[sortField].seconds
            : sortField === "likes"
            ? -projB[sortField]
            : projB[sortField].toLowerCase();

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
    const projRef = doc(firestoreDB, "projects", projId);
    deleteDoc(projRef);
  };

  const handleLikeClick = async (e, projId) => {
    e.stopPropagation();
    if (!user) {
      alert("Sign in to like projects!");
      return;
    }
    const projRef = doc(firestoreDB, "projects", projId);
    const curProject = projects.find((project) => project.id === projId);

    await updateDoc(projRef, {
      likes: curProject.likes.includes(projId)
        ? arrayRemove(projId)
        : arrayUnion(projId),
    });
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
                    <span>{project.likes.length}</span>
                    <button
                      onClick={(e) => handleLikeClick(e, project.id)}
                      className={
                        project.likes.includes(project.id)
                          ? "material-icons"
                          : "material-icons-outlined"
                      }
                    >
                      thumb_up
                    </button>
                    <button
                      onClick={(e) => handleEditClick(e, project.id)}
                      className='material-icons-outlined'
                    >
                      edit
                    </button>
                    <button
                      onClick={(e) => handleDeleteItem(e, project.id)}
                      className='material-icons-outlined'
                    >
                      delete
                    </button>
                  </>
                ) : (
                  <>
                    <span>{project.likes.length}</span>
                    <button
                      onClick={(e) => handleLikeClick(e, project.id)}
                      className='material-icons-outlined'
                    >
                      thumb_up
                    </button>
                  </>
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
