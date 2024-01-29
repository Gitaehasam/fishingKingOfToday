import "../assets/styles/HomePage.scss";
import { IoBookOutline } from "react-icons/io5";
import logo from "../assets/images/Logo.svg";

const HomePage = () => {
  return (
    <>
      <div className="Home">
        <div className="Home_header">
          <img src={logo} />
          <IoBookOutline />
        </div>
      </div>
    </>
  );
};

export default HomePage;
