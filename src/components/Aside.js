// TODO:
//  - most liked project
//  - most viewed project

import { useEffect, useState } from "react";

const Aside = ({ projects }) => {
  const [sortedProjects, setSortedProjects] = useState();

  useEffect(() => {
    setSortedProjects(
      [...projects]
        .filter((project) => project.likes.length)
        .sort((projA, projB) =>
          projA.likes.length < projB.likes.length
            ? 1
            : projA.likes.length > projB.likes.length
            ? -1
            : 0
        )
        .slice(0, 5)
    );
  }, [projects]);

  return (
    <aside className='aside'>
      <section className='most-liked'>
        <span>Most liked items</span>
        <ul className='most-liked list-items'>
          {sortedProjects &&
            sortedProjects.map((project, i) => {
              return (
                <li key={project.id} className='most-liked list-item'>
                  <span>{project.name}</span>
                  <span>{project.likes.length}</span>
                </li>
              );
            })}
        </ul>
      </section>
      {/* <section className='most-viewed'>
        <span>Most viewed items</span>
        <ul className='most-viewed list-items'>
          {Array.from({ length: 3 }, (_, i) => {
            return (
              <li key={i} className='most-viewed list-item'>
                <span>{`item${i}`}</span>
              </li>
            );
          })}
        </ul>
      </section> */}
    </aside>
  );
};

export default Aside;
