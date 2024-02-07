import "../assets/styles/HomePage.scss";
import { IoBookOutline } from "react-icons/io5";
import logo from "../assets/images/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import Slider from "../components/Slider";
import PhishingIcon from "@mui/icons-material/Phishing";

function HomePage() {
  console.log(import.meta.env);

  return (
    <>
      <div className="Home">
        <div className="Home_header">
          <img src={logo} alt="logo" />
          <Link to="/fishbook" aria-label="어종도감 이동">
            <IoBookOutline />
          </Link>
          <Link to="/tutorial" aria-label="튜토리얼 도감">
            <IoBookOutline />
          </Link>
          <Link to="/chatbot" aria-label="챗봇 이동">
            <PhishingIcon />
          </Link>
        </div>

        {/* <div>
          
        </div> */}
        <Slider />
      </div>
    </>
  );
}

export default HomePage;
