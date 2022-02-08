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
      <div className='nav--logo'>Logo</div>
      <ul className='nav-items'>
        <li className='nav--item'>Dashboard
          {/* <Link to={'/'}>Dashboard</Link> */}
        </li>
        <li className='nav--item'>My Projects</li>
        <li className='nav--item'>Get In Touch!</li>
      </ul>
      {/* logo link intro */}
      {/* link gallery */}
      {/* link personal */}
      {/* link contact */}
    </nav>
  );
};

export default Navbar;
