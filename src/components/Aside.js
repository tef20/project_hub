// TODO:
//  - most viewed project
//  - most liked project

const Aside = () => {
  return (
    <aside className='aside'>
      <section className='most-viewed'>
        <span>Most viewed items</span>
        <ul className='most-viewed list-items'>
          {Array.from({ length: 3 }, (_, i) => {
            return (
              <li className='most-viewed list-item'>
                <span>{`item${i}`}</span>
              </li>
            );
          })}
        </ul>
      </section>
      <section className='most-liked'>
        <span>Most liked items</span>
        <ul className='most-liked list-items'>
          {Array.from({ length: 3 }, (_, i) => {
            return (
              <li className='most-liked list-item'>
                <span>{`item${i}`}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
};

export default Aside;
