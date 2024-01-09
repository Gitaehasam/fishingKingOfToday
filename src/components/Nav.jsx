import { Link } from "react-router-dom";
import "../assets/css/Nav.css";

const Nav = () => {
  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i>-----</i>
        </label>
        <label className="logo">DesignX</label>
        <ul>
          <li>
            <Link className="active">Home</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Services</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
          <li>
            <Link>Feedback</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
