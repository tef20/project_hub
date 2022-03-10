import { Link } from "react-router-dom";
// Todo:
//  - logo -- links to instructions page
//  - Dashboard -- main page
//  - Your projects -- personal projects or sign in
//  - Get in contact -- email? github links?
//  - collapse to icons?

const Navbar = () => {
  return (
    <nav>
      <div className='nav--logo'>
        <span className='material-icons-outlined'>vrpano</span>
      </div>
      <ul className='nav-items'>
        <li className='nav--item'>
          <Link to='/'>
            <span className='material-icons-outlined'>grid_view</span>Dashbord
            {/* <Link to={'/'}>Dashboard</Link> */}
          </Link>
        </li>
        <li className='nav--item'>
          <Link to='/my_projects'>
            <span className='material-icons-outlined'>smart_toy</span>My
            Projects
          </Link>
        </li>
        {/* <li className='nav--item'>
          <Link to='/'>
            <span className='material-icons-outlined'>alternate_email</span>Get
            In Touch!
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
