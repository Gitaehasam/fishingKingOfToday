import "../assets/styles/HomePage.scss";
import { IoBookOutline } from "react-icons/io5";
import logo from "../assets/images/Logo.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="Home">
        <div className="Home_header">
          <img src={logo} />
          <Link to="/fishbook">
          <IoBookOutline />
          </Link>
        </div>
        
      </div>
    </>
  );
};

export default HomePage;
