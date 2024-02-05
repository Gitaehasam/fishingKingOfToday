import "../assets/styles/HomePage.scss";
import { IoBookOutline } from "react-icons/io5";
import logo from "../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import PhishingIcon from '@mui/icons-material/Phishing';
// import loadEnv from "../../loadEnv";

function HomePage() {
  console.log(import.meta.env);

  return (
    <>
      <div className="Home">
        <div className="Home_header">
          <img src={logo} />
          <Link to="/fishbook">
            <IoBookOutline />
          </Link>
          <Link to="/tutorial">
            <IoBookOutline />
          </Link>
        </div>
          <div>
            <Link to="/chatbot">
              <PhishingIcon />
            </Link>
          </div>
        <Slider />
      </div>
    </>
  );
}

export default HomePage;
