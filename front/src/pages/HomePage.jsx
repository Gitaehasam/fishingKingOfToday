import "../assets/styles/HomePage.scss";
import React, { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import logo from "../assets/images/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import Slider from "../components/Slider";
import PhishingIcon from "@mui/icons-material/Phishing";

function HomePage() {
  console.log(import.meta.env);
  const [idx, setIdx] = useState(0);

  const setBack = (num) => {
    console.log(num);
    setIdx(num);
  };

  return (
    <>
      <div className={`home slider${idx}`}>
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
        <Slider setBack={setBack} />
      </div>
    </>
  );
}

export default HomePage;
